import React from "react";
import { services } from "@/lib/content/services";
import { notFound } from "next/navigation";
import Link from "next/link";

// Generate static routes at build time
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

  const Icon = service.icon;

  return (
    <div className="bg-slate-50 flex flex-col h-full min-h-[80vh]">

      {/* Premium Hero Section */}
      <section className="pt-40 pb-24 bg-[#04151a] relative overflow-hidden flex-grow flex flex-col justify-center">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#115E59]/20 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center w-full">
          {/* Centered Glowing Icon */}
          <div className="w-28 h-28 mx-auto rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 mb-8 shadow-2xl backdrop-blur-md">
            <Icon className="w-16 h-16 drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            {service.title}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-16 leading-relaxed">
            {service.description}
          </p>
          
          {/* Key Features Placeholder Grid */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-10 max-w-4xl mx-auto text-left shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Service Capabilities</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-start text-slate-300">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#115E59]/40 flex items-center justify-center mr-4 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#00B4D8]" />
                  </span>
                  <span className="text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-16">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-[#115E59] text-white font-semibold hover:bg-[#00B4D8] hover:scale-105 transition-all duration-300 shadow-lg shadow-[#115E59]/20"
            >
              Consult with our {service.title} Experts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
