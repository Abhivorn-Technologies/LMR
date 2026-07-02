"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone number required"),
  company: z.string().optional(),
  inquiry: z.string().min(1, "Please select an inquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
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
    <div className="relative">
      <div className="relative overflow-hidden rounded-[2rem] border-0 bg-white p-8 md:p-10 shadow-2xl">
        {/* Subtle cyan accent background */}
        <div className="absolute top-0 right-0 h-full w-full bg-gradient-to-bl from-[#00E5FF]/5 to-transparent pointer-events-none" />
        
        <h3 className="mb-8 font-display text-2xl font-bold text-[#04151a]">
          Send a Message
        </h3>

        {status === "success" && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-teal-500/30 bg-teal-50 p-4 text-sm text-teal-700 font-medium">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            Your inquiry has been received. We will respond during business hours.
          </div>
        )}

        {status === "error" && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-50 p-4 text-sm text-red-700 font-medium">
            <AlertCircle className="h-5 w-5 shrink-0" />
            Something went wrong. Please try again or call us directly.
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10" noValidate>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#0a2b33]">
                Full Name <span className="text-[#00B4D8]">*</span>
              </label>
              <input 
                id="name" 
                placeholder="Your name" 
                {...register("name")} 
                className="flex h-12 w-full rounded-xl border border-[#0a2b33]/10 bg-[#f8fafc] px-4 text-sm text-[#04151a] placeholder:text-slate-400 focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-colors"
              />
              {errors.name && (
                <p className="text-xs font-medium text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#0a2b33]">
                Email Address <span className="text-[#00B4D8]">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@company.com"
                {...register("email")}
                className="flex h-12 w-full rounded-xl border border-[#0a2b33]/10 bg-[#f8fafc] px-4 text-sm text-[#04151a] placeholder:text-slate-400 focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-colors"
              />
              {errors.email && (
                <p className="text-xs font-medium text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="phone" className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#0a2b33]">
                Phone <span className="text-[#00B4D8]">*</span>
              </label>
              <input 
                id="phone" 
                placeholder="+91 ..." 
                {...register("phone")} 
                className="flex h-12 w-full rounded-xl border border-[#0a2b33]/10 bg-[#f8fafc] px-4 text-sm text-[#04151a] placeholder:text-slate-400 focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-colors"
              />
              {errors.phone && (
                <p className="text-xs font-medium text-red-500">{errors.phone.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="company" className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#0a2b33]">
                Organization
              </label>
              <input 
                id="company" 
                placeholder="Company name" 
                {...register("company")} 
                className="flex h-12 w-full rounded-xl border border-[#0a2b33]/10 bg-[#f8fafc] px-4 text-sm text-[#04151a] placeholder:text-slate-400 focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="inquiry" className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#0a2b33]">
              Subject <span className="text-[#00B4D8]">*</span>
            </label>
            <select 
              id="inquiry" 
              defaultValue="" 
              {...register("inquiry")}
              className="flex h-12 w-full rounded-xl border border-[#0a2b33]/10 bg-[#f8fafc] px-4 text-sm text-[#04151a] focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-colors"
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
              <p className="text-xs font-medium text-red-500">{errors.inquiry.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#0a2b33]">
              Message (Optional)
            </label>
            <textarea
              id="message"
              placeholder="Tell us about your requirements..."
              {...register("message")}
              className="flex min-h-[140px] w-full rounded-xl border border-[#0a2b33]/10 bg-[#f8fafc] px-4 py-3 text-sm text-[#04151a] placeholder:text-slate-400 focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-colors resize-y"
            />
            {errors.message && (
              <p className="text-xs font-medium text-red-500">{errors.message.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            size="lg" 
            disabled={status === "loading"} 
            className="w-full bg-[#00B4D8] text-white hover:bg-[#0096B4] shadow-[0_4px_14px_0_rgba(0,180,216,0.39)] transition-all hover:shadow-[0_6px_20px_rgba(0,180,216,0.23)] hover:-translate-y-0.5 rounded-xl text-base font-semibold py-6"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
