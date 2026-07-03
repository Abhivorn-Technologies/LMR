import React from "react";
import { services } from "@/lib/content/services";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Shield } from "lucide-react";
import { CarInsuranceContent } from "@/components/services/content/CarInsuranceContent";
import { BikeInsuranceContent } from "@/components/services/content/BikeInsuranceContent";

import { BusinessInsuranceContent } from "@/components/services/content/BusinessInsuranceContent";

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
  const params: { serviceId: string; subServiceId: string }[] = [];
  
  services.forEach((service) => {
    if (service.subServices) {
      service.subServices.forEach((sub) => {
        params.push({
          serviceId: service.id,
          subServiceId: sub.id,
        });
      });
    }
  });

  return params;
}

export default async function SubServiceDetail({ params }: { params: Promise<{ serviceId: string, subServiceId: string }> }) {
  const resolvedParams = await params;
  const service = services.find((s) => s.id === resolvedParams.serviceId);
  if (!service) return notFound();

  const subService = service.subServices?.find((s) => s.id === resolvedParams.subServiceId);
  if (!subService) return notFound();

  return (
    <div className="bg-slate-50 flex flex-col h-full min-h-screen">
      {/* Premium Hero */}
      <section className="pt-40 pb-32 bg-[#04151a] relative overflow-hidden flex-shrink-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#115E59]/20 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#00B4D8]/10 blur-[100px] rounded-full pointer-events-none -translate-x-1/3 translate-y-1/3" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Link href={`/services/${service.id}`} className="inline-flex items-center text-[#00B4D8] hover:text-white transition-colors mb-8 text-sm font-semibold uppercase tracking-wider">
            &larr; Back to {service.title}
          </Link>
          
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                {subService.title}
              </h1>
              <div className="mb-12 max-w-2xl">
                <p className="text-2xl text-white font-light leading-relaxed mb-10">
                  {subService.description}
                </p>
                
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 text-[#00B4D8] mt-1">
                    <Shield className="w-8 h-8" />
                  </div>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    <span className="text-white font-semibold tracking-wide">Expert {subService.title} Solutions by LMB.</span><br/>
                    As your dedicated independent broker, we provide comprehensive {subService.title.toLowerCase()} services tailored to your exact needs. While we are not a direct insurer, we work entirely on your behalf—leveraging our deep industry expertise to source, compare, and meticulously structure your coverage through top-tier providers to secure the absolute best protection.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full relative">
              {/* Stunning 3D Photorealistic Render */}
              <div className="relative w-full aspect-[4/3] max-h-[500px] rounded-[3rem] overflow-hidden group shadow-2xl shadow-[#115E59]/30">
                <Image
                  src={getSubServiceImage(subService.id)}
                  alt={subService.title}
                  fill
                  className="object-cover transform transition-transform duration-700 group-hover:scale-105 ease-out"
                />
                <div className="absolute inset-0 bg-[#04151a]/10 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Area */}
      <section className="py-24 bg-white relative z-20 -mt-12 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-6">
          {subService.id === "car-insurance" ? (
            <CarInsuranceContent />
          ) : subService.id === "two-wheeler-insurance" ? (
            <BikeInsuranceContent />
          ) : subService.id === "business-insurance" ? (
            <BusinessInsuranceContent />
          ) : (
            <div className="prose prose-lg prose-slate max-w-none">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Detailed Overview</h2>
              <p className="text-slate-600 leading-relaxed">
                We are currently formatting the extensive documentation for {subService.title}.
                This section will feature beautiful typography, interactive comparison tables, and dynamic content blocks.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
