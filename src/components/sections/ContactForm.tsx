"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Custom validation to block common free email providers
const freeEmailProviders = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com"
];

const contactSchema = z.object({
  name: z.string().min(2, "Full name is required").max(50, "Name is too long"),
  email: z.string()
    .email("A valid email address is required")
    .max(100, "Email is too long")
    .refine((val) => {
      const domain = val.split('@')[1]?.toLowerCase();
      return !freeEmailProviders.includes(domain);
    }, {
      message: "Please provide a valid corporate email (Gmail/Yahoo domains are not accepted)",
    }),
  phone: z.string().min(10, "A valid phone number is required").max(15, "Phone number is too long"),
  company: z.string().max(100, "Company name is too long").optional(),
  inquiry: z.string().min(1, "Please select an inquiry subject"),
  message: z.string().min(10, "Your message must be at least 10 characters long").max(1000, "Message cannot exceed 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const inquiryOptions = [
  "General Insurance",
  "Reinsurance",
  "Life Insurance",
  "Risk Management",
  "Consulting",
  "Other",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1500));
    console.log("Contact form submission:", data);
    setStatus("success");
    reset();
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <div className="relative h-full">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-8 md:p-12 shadow-xl flex flex-col h-full">
        {/* Subtle accent background */}
        <div className="absolute top-0 right-0 h-64 w-64 bg-gradient-to-bl from-[#115E59]/5 to-transparent rounded-bl-full pointer-events-none" />
        
        <h3 className="mb-8 text-3xl font-bold text-slate-900 tracking-tight">
          Send a Message
        </h3>

        {status === "success" && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-teal-500/30 bg-teal-50 p-4 text-sm text-teal-700 font-medium shadow-sm">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            Your inquiry has been received. Our advisory team will respond shortly.
          </div>
        )}

        {status === "error" && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-50 p-4 text-sm text-red-700 font-medium shadow-sm">
            <AlertCircle className="h-5 w-5 shrink-0" />
            Something went wrong. Please try again or call us directly.
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10 flex-1 flex flex-col" noValidate>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-700">
                Full Name <span className="text-[#115E59]">*</span>
              </label>
              <input 
                id="name" 
                placeholder="Your name" 
                maxLength={50}
                {...register("name")} 
                className={`flex h-12 w-full rounded-xl border bg-slate-50 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#115E59]/30 transition-colors ${errors.name ? 'border-red-300 bg-red-50/50' : 'border-slate-200 focus:border-[#115E59]'}`}
              />
              {errors.name && (
                <p className="text-xs font-medium text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-700">
                Corporate Email <span className="text-[#115E59]">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@company.com"
                maxLength={100}
                {...register("email")}
                className={`flex h-12 w-full rounded-xl border bg-slate-50 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#115E59]/30 transition-colors ${errors.email ? 'border-red-300 bg-red-50/50' : 'border-slate-200 focus:border-[#115E59]'}`}
              />
              {errors.email && (
                <p className="text-xs font-medium text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="phone" className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-700">
                Phone <span className="text-[#115E59]">*</span>
              </label>
              <input 
                id="phone" 
                placeholder="+91 ..." 
                maxLength={15}
                {...register("phone")} 
                className={`flex h-12 w-full rounded-xl border bg-slate-50 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#115E59]/30 transition-colors ${errors.phone ? 'border-red-300 bg-red-50/50' : 'border-slate-200 focus:border-[#115E59]'}`}
              />
              {errors.phone && (
                <p className="text-xs font-medium text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.phone.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="company" className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-700">
                Organization
              </label>
              <input 
                id="company" 
                placeholder="Company name" 
                maxLength={100}
                {...register("company")} 
                className="flex h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#115E59] focus:outline-none focus:ring-2 focus:ring-[#115E59]/30 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="inquiry" className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-700">
              Subject <span className="text-[#115E59]">*</span>
            </label>
            <select 
              id="inquiry" 
              defaultValue="" 
              {...register("inquiry")}
              className={`flex h-12 w-full rounded-xl border bg-slate-50 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#115E59]/30 transition-colors ${errors.inquiry ? 'border-red-300 bg-red-50/50' : 'border-slate-200 focus:border-[#115E59]'}`}
            >
              <option value="" disabled>
                How can we help you today?
              </option>
              {inquiryOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.inquiry && (
              <p className="text-xs font-medium text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.inquiry.message}</p>
            )}
          </div>

          <div className="space-y-2 flex-1 flex flex-col">
            <label htmlFor="message" className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-700">
              Message <span className="text-[#115E59]">*</span>
            </label>
            <textarea
              id="message"
              placeholder="Tell us about your requirements..."
              maxLength={1000}
              {...register("message")}
              className={`flex flex-1 min-h-[120px] w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#115E59]/30 transition-colors resize-y ${errors.message ? 'border-red-300 bg-red-50/50' : 'border-slate-200 focus:border-[#115E59]'}`}
            />
            {errors.message && (
              <p className="text-xs font-medium text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.message.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            size="lg" 
            disabled={status === "loading"} 
            className="w-full bg-[#115E59] text-white hover:bg-[#0a3a3f] shadow-lg shadow-[#115E59]/20 transition-all hover:shadow-xl hover:shadow-[#115E59]/30 hover:-translate-y-0.5 rounded-xl text-base font-semibold py-6 mt-4"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sending Inquiry...
              </>
            ) : (
              "Submit Inquiry"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
