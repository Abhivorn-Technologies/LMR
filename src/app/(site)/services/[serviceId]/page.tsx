import React from "react";
import { services } from "@/lib/content/services";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Shield } from "lucide-react";

// Helper to get the right 3D render for the sub-service
const getSubServiceImage = (id: string) => {
  switch (id) {
    case "car-insurance": return "/assets/services/car_insurance_1783077273184.png";
    case "two-wheeler-insurance": return "/assets/services/bike_insurance_1783077283942.png";
    case "commercial-vehicle-insurance": return "/assets/services/commercial_insurance_1783077294096.png";
    case "health-insurance": return "/assets/services/health_insurance_1783077303296.png";
    case "home-insurance": return "/assets/services/home_insurance_1783077315029.png";
    case "travel-insurance": return "/assets/services/travel_insurance_1783077328088.png";
    case "business-insurance": return "/assets/services/business_insurance_1783077338024.png";
    default: return "/assets/services/car_insurance_1783077273184.png";
  }
};

const DEDICATED_ROUTES = [
  "general-insurance", 
  "life-insurance", 
  "risk-management", 
  "claims", 
  "claim-services", 
  "consulting", 
  "reinsurance"
];

export async function generateStaticParams() {
  return services
    .filter((s) => !DEDICATED_ROUTES.includes(s.id))
    .map((s) => ({
      serviceId: s.id,
    }));
}

export default async function ServiceDetail({ params }: { params: Promise<{ serviceId: string }> }) {
  const resolvedParams = await params;
  
  if (DEDICATED_ROUTES.includes(resolvedParams.serviceId)) {
    notFound();
  }

  const service = services.find((s) => s.id === resolvedParams.serviceId);

  if (!service) {
    notFound();
  }

  const titleWords = service.title.split(" ");
  const firstPart = titleWords.slice(0, Math.ceil(titleWords.length / 2)).join(" ");
  const secondPart = titleWords.slice(Math.ceil(titleWords.length / 2)).join(" ");

  return (
    <div className="bg-white flex flex-col min-h-screen font-sans selection:bg-[#115E59] selection:text-white">
      <section className="pt-32 pb-24 relative flex flex-col items-center overflow-hidden">
        
        {/* Crisp Background Elements */}
        <div className="absolute inset-0 pointer-events-none -z-10 bg-slate-50">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
          <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-orange-50/50 rounded-full blur-[100px]" style={{ animation: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center relative z-10">
          
          <div className="w-full flex justify-start mb-12">
            <Link href="/services" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold uppercase tracking-[0.1em] text-[13px] transition-all duration-300 bg-white px-6 py-2.5 rounded-full border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-sm hover:border-blue-200 hover:-translate-y-0.5">
              <span>&larr;</span> Back to All Services
            </Link>
          </div>

          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-blue-200 bg-blue-50 mb-10 shadow-sm">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-blue-700 text-xs tracking-[0.25em] uppercase">
              Premium Solutions
            </span>
          </div>

          <div className="relative mb-8">
            <h1 className="text-[3.25rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-[6rem] font-black tracking-tighter md:leading-[1.1] pb-2">
              <span className="text-[#0F172A]">{firstPart}</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">{secondPart}</span>
            </h1>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 md:w-32 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg shadow-blue-500/20" />
          </div>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-[22px] text-slate-600 max-w-3xl mx-auto mt-14 mb-16 md:mb-20 leading-relaxed font-medium px-2 md:px-0">
            {service.description}
          </p>

          {service.subServices && service.subServices.length > 0 ? (
            <div className="w-full mt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
                {service.subServices.map((sub, index) => {
                  const isLastItemAlone = index === (service.subServices?.length || 0) - 1 && (service.subServices?.length || 0) % 3 === 1;
                  
                  return (
                    <Link 
                      href={sub.href} 
                      key={sub.id} 
                      className={`group flex flex-col text-left ${isLastItemAlone ? 'lg:col-start-2' : ''}`}
                    >
                      <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-slate-100 mb-6 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-slate-200 group-hover:border-blue-200">
                        <Image 
                          src={getSubServiceImage(sub.id)}
                          alt={sub.title}
                          fill
                          className="object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      </div>
                      
                      <div className="flex flex-row items-center justify-between px-2 mt-2">
                        <h4 className="font-bold text-[#0F172A] text-[22px] group-hover:text-blue-600 transition-colors duration-300">
                          {sub.title}
                        </h4>
                        <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:text-blue-600 transition-all duration-300">
                          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="w-full max-w-4xl mx-auto text-left">
              <div className="bg-white rounded-[2.5rem] border border-slate-200 p-12 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                <h3 className="text-3xl font-bold text-[#0F172A] mb-8 border-b border-slate-100 pb-6">
                  Service Capabilities
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-slate-600 font-medium">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-4 border border-blue-100">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                      </span>
                      <span className="text-[17px] pt-0.5">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          <div className="mt-24">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center h-16 px-12 rounded-full bg-[#0F172A] text-white font-bold text-lg hover:bg-blue-600 hover:shadow-[0_10px_30px_rgba(37,99,235,0.2)] hover:-translate-y-1 transition-all duration-300"
            >
              Consult with an Expert
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
