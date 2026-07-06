"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Home, Heart, Shield, FileText, Target, Users, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Full name is required").max(50, "Name is too long"),
  company: z.string().max(100, "Company name is too long").optional(),
  phone: z.string().min(10, "Valid phone number required").max(15, "Phone number too long"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Hero() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("loading");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "efbbb5cd-70f5-4980-b5d5-5c1ad4ca09a9",
          subject: `Home Page Inquiry from ${data.name}`,
          from_name: "LMB Website Portal",
          "Visitor Name": data.name,
          "Phone Number": `+91 ${data.phone}`,
          "Company Name": data.company || "Not provided",
          "Inquiry Type": "General Insurance Advisory",
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 5000);
      }
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const tabs = [
    { name: "General Insurance", icon: Home, href: "/services/general-insurance" },
    { name: "Life Insurance", icon: Heart, href: "/services/life-insurance" },
    { name: "Reinsurance", icon: Shield, href: "/services/reinsurance" },
    { name: "Claim Services", icon: FileText, href: "/services/claims" },
    { name: "Risk Management", icon: Target, href: "/services/risk-management" },
    { name: "Consulting", icon: Users, href: "/services/consulting" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-24 pb-32 md:pt-28 lg:pt-36 lg:pb-40">
      {/* Background Subtle glow */}
      <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-bl from-[#ffb800]/5 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-8">
          
          {/* Left Column */}
          <div className="w-full lg:w-[55%] flex flex-col items-start">
            <FadeIn>
              <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold text-[#0f172a] leading-[1.15] tracking-tight mb-5">
                Insurance advisory <br /> built on <span className="relative inline-block">trust<span className="text-[#ffb800]">.</span><div className="absolute bottom-2 left-0 w-full h-[6px] bg-[#ffb800] -z-10 rounded-sm" /></span>
              </h1>
              <p className="text-base md:text-lg text-[#64748b] font-medium leading-relaxed max-w-[550px] mb-8">
                Insurance broking built on <strong className="text-[#10b981]">expertise, integrity, and client focus</strong> — IRDAI CoR No. 116, since 2002.
              </p>
            </FadeIn>

            {/* Service Tabs */}
            <FadeIn delay={0.2} className="w-full">
              <div className="flex flex-wrap gap-3 mb-10 max-w-[650px]">
                {tabs.map((tab, idx) => (
                  <Link href={tab.href} key={tab.name}>
                    <div className={`flex flex-col items-center justify-center p-3 rounded-2xl border bg-white shadow-sm w-[105px] sm:w-[115px] h-[100px] transition-all hover:-translate-y-1 ${idx === 0 ? 'border-[#ffb800] shadow-md relative' : 'border-slate-200 hover:border-slate-300'}`}>
                      <tab.icon className={`w-6 h-6 mb-2.5 ${idx === 0 ? 'text-[#0ea5e9]' : 'text-[#38bdf8]'}`} strokeWidth={1.5} />
                      <span className={`text-[10px] sm:text-[11px] font-bold text-center leading-tight ${idx === 0 ? 'text-[#0f172a]' : 'text-[#334155]'}`}>
                        {tab.name}
                      </span>
                      {idx === 0 && (
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-[#ffb800] rotate-45" />
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </FadeIn>

            {/* Checkmarks */}
            <FadeIn delay={0.3}>
              <ul className="space-y-3.5">
                {[
                  "Composite broker — one advisory relationship for every line",
                  "Endorsements & new quotes handled with speed and efficiency",
                  "Domestic & international insurer and reinsurer market access"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start text-[13px] sm:text-sm font-bold text-[#0f172a]">
                    <div className="mt-0.5 mr-3 flex shrink-0 h-[18px] w-[18px] rounded-full bg-[#10b981] items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          {/* Right Column: Contact Form */}
          <FadeIn delay={0.4} className="w-full lg:w-[40%] max-w-[420px] mx-auto lg:mx-0">
            <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-slate-100 p-8 w-full">
              <h3 className="text-[22px] font-extrabold text-[#0f172a] mb-1">Get General Insurance Advisory</h3>
              <p className="text-[13px] text-[#64748b] mb-6">Share your details — our broking expert will call you back.</p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="name" className="block text-[11px] font-bold tracking-wider text-[#64748b] uppercase mb-2">Your Name</label>
                  <input 
                    id="name" 
                    placeholder="Full name"
                    maxLength={50}
                    {...register("name")}
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-[13px] text-[#334155] placeholder:text-[#94a3b8] focus:outline-none focus:ring-1 transition-all ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0ea5e9] focus:ring-[#0ea5e9]'}`} 
                  />
                  {errors.name && <p className="text-[10px] font-medium text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={10}/> {errors.name.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-[11px] font-bold tracking-wider text-[#64748b] uppercase mb-2">Organisation</label>
                  <input 
                    id="company" 
                    placeholder="Company / Department" 
                    maxLength={100}
                    {...register("company")}
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-[13px] text-[#334155] placeholder:text-[#94a3b8] focus:outline-none focus:ring-1 transition-all ${errors.company ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0ea5e9] focus:ring-[#0ea5e9]'}`} 
                  />
                  {errors.company && <p className="text-[10px] font-medium text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={10}/> {errors.company.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-[11px] font-bold tracking-wider text-[#64748b] uppercase mb-2">Mobile Number</label>
                  <div className="flex gap-3">
                    <div className="flex items-center justify-center w-16 rounded-xl border border-slate-200 bg-[#f8fafc] text-[#475569] text-[13px] font-bold shrink-0">
                      +91
                    </div>
                    <input 
                      id="phone" 
                      placeholder="10-digit mobile number" 
                      maxLength={15}
                      {...register("phone")}
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-[13px] text-[#334155] placeholder:text-[#94a3b8] focus:outline-none focus:ring-1 transition-all ${errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0ea5e9] focus:ring-[#0ea5e9]'}`} 
                    />
                  </div>
                  {errors.phone && <p className="text-[10px] font-medium text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={10}/> {errors.phone.message}</p>}
                </div>

                <div className="pt-2">
                  <button disabled={submitStatus === "loading"} type="submit" className="w-full bg-[#ffb800] hover:bg-[#e6a600] text-[#0f172a] font-extrabold py-3.5 rounded-xl transition-all shadow-[0_8px_20px_rgba(255,184,0,0.25)] flex justify-center items-center h-[52px] disabled:opacity-70 disabled:cursor-not-allowed">
                    {submitStatus === "loading" ? <Loader2 className="w-5 h-5 animate-spin" /> : "Request a Call Back"}
                  </button>
                </div>
                
                <AnimatePresence>
                  {submitStatus === "success" && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-[13px] text-[#10b981] font-bold text-center m-0">
                      Thanks! We'll call you back shortly.
                    </motion.p>
                  )}
                  {submitStatus === "error" && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-[13px] text-red-500 font-medium text-center m-0">
                      Something went wrong. Please try again.
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>

              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-[13px] font-bold text-[#0284c7]">
                <Link href="/services" className="hover:text-[#0369a1] flex items-center gap-1">All Services <span className="text-[10px]">▶</span></Link>
                <Link href="/contact" className="hover:text-[#0369a1] flex items-center gap-1">Contact Us <span className="text-[10px]">▶</span></Link>
              </div>
              <p className="mt-5 text-[10px] leading-relaxed text-[#94a3b8]">
                By submitting, you authorise LMB Insurance Brokers Pvt. Ltd. to contact you regarding your enquiry. Insurance is the subject matter of solicitation.
              </p>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
