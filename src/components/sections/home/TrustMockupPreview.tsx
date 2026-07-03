import Image from "next/image";

export function TrustMockupPreview() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
       <div className="mx-auto max-w-7xl px-6">
         <div className="rounded-[3rem] bg-slate-50 border border-slate-100 overflow-hidden flex flex-col lg:flex-row items-stretch shadow-sm">
           
           <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
             <div className="inline-flex self-start items-center gap-2 px-5 py-2 rounded-full border border-[#115E59]/20 bg-[#115E59]/5 mb-8">
               <span className="text-[#115E59] font-bold text-xs tracking-[0.2em] uppercase">Trusted Legacy</span>
             </div>
             
             <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter leading-[1.1]">
               Over Two Decades of <br/>
               <span className="text-[#115E59]">Excellence.</span>
             </h2>
             
             <p className="text-lg text-slate-500 leading-relaxed mb-10 max-w-lg">
               Registered with IRDAI since 2003, LMB Insurance Brokers has built a legacy of trust, transparency, and unparalleled advisory. Our commitment to securing your future is sealed with absolute integrity.
             </p>
             
             <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm inline-block self-start">
               <p className="font-bold text-slate-900 text-xl mb-1 tracking-tight">CoR No: 116</p>
               <p className="text-slate-500 font-medium">First License: 18-02-2003</p>
             </div>
           </div>
           
           <div className="lg:w-1/2 w-full relative aspect-square lg:aspect-auto min-h-[400px] lg:min-h-[600px] overflow-hidden">
             <Image 
               src="/assets/image3.jpeg" 
               alt="LMB Insurance Brokers License and Legacy Mockup"
               fill
               className="object-cover transform hover:scale-105 transition-transform duration-1000 ease-out"
             />
             {/* Subtle gradient overlay to blend edges if needed */}
             <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] pointer-events-none rounded-r-[3rem]" />
           </div>
           
         </div>
       </div>
    </section>
  );
}
