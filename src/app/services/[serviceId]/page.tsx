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

export async function generateStaticParams() {
  return services.map((s) => ({
    serviceId: s.id,
  }));
}

export default async function ServiceDetail({ params }: { params: Promise<{ serviceId: string }> }) {
  const resolvedParams = await params;
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
        
        {/* Magical Background Elements */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:24px_24px]" />
          {/* Glowing Orbs - increased opacity slightly */}
          <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] bg-[#115E59]/15 rounded-full blur-[120px] mix-blend-multiply animate-pulse" />
          <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-[#00B4D8]/15 rounded-full blur-[100px] mix-blend-multiply" style={{ animation: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center relative z-10">
          
          <div className="w-full flex justify-start mb-12">
            <Link href="/services" className="inline-flex items-center gap-2 text-slate-600 hover:text-[#115E59] font-bold uppercase tracking-[0.1em] text-sm transition-all duration-300 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5">
              <span>&larr;</span> Back to All Services
            </Link>
          </div>

          {/* Restored and upgraded Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#00B4D8]/30 bg-gradient-to-r from-[#115E59]/5 to-[#00B4D8]/5 mb-10 shadow-sm">
            <Shield className="w-5 h-5 text-[#00B4D8]" />
            <span className="font-bold text-[#115E59] text-xs tracking-[0.25em] uppercase">
              Premium Solutions
            </span>
          </div>

          {/* Premium Gradient Title with Accent Line */}
          <div className="relative mb-8">
            <h1 className="text-[3.25rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-[6rem] font-black tracking-tighter md:leading-[1.1] drop-shadow-sm pb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-slate-800 to-slate-600">{firstPart}</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#115E59] to-[#00B4D8]">{secondPart}</span>
            </h1>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 md:w-32 h-1.5 bg-gradient-to-r from-[#115E59] to-[#00B4D8] rounded-full shadow-lg shadow-[#00B4D8]/20" />
          </div>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto mt-14 mb-16 md:mb-20 leading-relaxed font-light px-2 md:px-0">
            {service.description}
          </p>

          {/* Ultra-Clean Premium Gallery Grid */}
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
                      {/* Floating, clean image container */}
                      <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-slate-50 mb-6 transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-[0_30px_60px_-15px_rgba(17,94,89,0.25)]">
                        <Image 
                          src={getSubServiceImage(sub.id)}
                          alt={sub.title}
                          fill
                          className="object-cover transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                        />
                        {/* A very subtle inner shadow to frame the white image against white backgrounds */}
                        <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] pointer-events-none" />
                      </div>
                      
                      {/* Premium Typography below */}
                      <div className="flex flex-row items-center justify-between px-2">
                        <h4 className="font-bold text-slate-900 text-2xl group-hover:text-[#115E59] transition-colors duration-300">
                          {sub.title}
                        </h4>
                        <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-[#115E59] group-hover:border-[#115E59] group-hover:text-white transition-all duration-500">
                          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
              <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 p-12 shadow-sm">
                <h3 className="text-3xl font-bold text-[#115E59] mb-8 border-b border-slate-100 pb-6">
                  Service Capabilities
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-slate-700">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center mr-4 border border-slate-200">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#115E59]" />
                      </span>
                      <span className="text-lg font-medium pt-0.5">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          <div className="mt-24">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center h-16 px-12 rounded-full bg-[#115E59] text-white font-bold text-lg hover:bg-slate-900 hover:scale-105 transition-all duration-300 shadow-xl shadow-[#115E59]/20"
            >
              Consult with an Expert
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
