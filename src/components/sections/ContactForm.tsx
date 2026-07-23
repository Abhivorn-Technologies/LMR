"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

const contactSchema = z.object({
  name: z.string()
    .min(2, "Full name is required")
    .max(50, "Name is too long")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Only letters, spaces, hyphens, and apostrophes allowed"),
  email: z.string()
    .email("A valid email address is required")
    .max(100, "Email is too long"),
  phone: z.string()
    .regex(/^[6-9][0-9]{9}$/, "Must be a valid 10-digit number starting with 6, 7, 8, or 9"),
  company: z.string()
    .max(100, "Company name is too long")
    .regex(/^[a-zA-ZÀ-ÿ\s&\-_]*$/, "Only letters, spaces, &, -, _ allowed")
    .optional(),
  inquiry: z.string().min(1, "Please select an inquiry subject"),
  message: z.string().max(1000, "Message cannot exceed 1000 characters").optional(),
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
  const [isSelectOpen, setIsSelectOpen] = useState(false);

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
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "efbbb5cd-70f5-4980-b5d5-5c1ad4ca09a9",
          subject: `Website Inquiry: ${data.inquiry}`,
          from_name: "LMB Website Portal",
          "Visitor Name": data.name,
          "Email Address": data.email,
          "Phone Number": data.phone,
          "Company Name": data.company || "Not provided",
          "Inquiry Type": data.inquiry,
          "Detailed Message": data.message || "No additional message provided.",
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setStatus("success");
        reset();
      } else {
        console.error("Web3Forms Error:", result);
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <div className="relative h-full">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-8 md:p-12 shadow-xl flex flex-col h-full">
        {/* Subtle accent background */}
        <div className="absolute top-0 right-0 h-64 w-64 bg-gradient-to-bl from-[#115E59]/5 to-transparent rounded-bl-full pointer-events-none" />
        
        <h3 className="mb-8 text-3xl font-bold text-slate-900 tracking-tight text-center">
          Send a Message
        </h3>

        {status === "success" ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 z-10 relative">
            <div className="w-full max-w-md bg-white rounded-3xl border border-slate-100 shadow-[0_20px_50px_rgba(17,94,89,0.1)] p-8 text-center relative overflow-hidden transform hover:-translate-y-1 transition-transform duration-500">
              {/* Decorative top border */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#115E59] to-[#00B4D8]" />
              
              <div className="mx-auto h-20 w-20 bg-teal-50/50 rounded-full flex items-center justify-center mb-6 relative">
                <div className="absolute inset-0 bg-[#115E59]/10 rounded-full animate-ping opacity-75" />
                <CheckCircle2 className="h-10 w-10 text-[#115E59] relative z-10" />
              </div>
              
              <h4 className="text-2xl font-bold text-slate-900 mb-3">Draft Created!</h4>
              
              <p className="text-slate-600 mb-8 text-sm leading-relaxed px-4">
                Your inquiry has been passed to your email app. <strong>Don&apos;t forget to press Send</strong> in your email client to complete the process.
              </p>
              
              <Button 
                onClick={() => setStatus("idle")}
                className="w-full bg-slate-50 text-slate-900 hover:bg-slate-100 border border-slate-200 rounded-xl py-6 font-semibold shadow-sm transition-colors"
              >
                Start a new inquiry
              </Button>
            </div>
          </div>
        ) : (
          <>
            {status === "error" && (
              <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-50 p-4 text-sm text-red-700 font-medium shadow-sm z-10 relative">
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
                    onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, ''); }}
                    className={`flex h-12 w-full rounded-xl border bg-slate-50 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#115E59]/30 transition-colors ${errors.name ? 'border-red-300 bg-red-50/50' : 'border-slate-200 focus:border-[#115E59]'}`}
                  />
                  {errors.name && (
                    <p className="text-xs font-medium text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-700">
                    Email Address <span className="text-[#115E59]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@email.com"
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
                    type="tel"
                    placeholder="10-digit mobile number" 
                    maxLength={10}
                    {...register("phone")} 
                    onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '').replace(/^[0-5]+/, ''); }}
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
                    onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-ZÀ-ÿ\s&\-_]/g, ''); }}
                    className="flex h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#115E59] focus:outline-none focus:ring-2 focus:ring-[#115E59]/30 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="inquiry" className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-700">
                  Subject <span className="text-[#115E59]">*</span>
                </label>
                <div className="relative">
                  <select 
                    id="inquiry" 
                    defaultValue="" 
                    onClick={() => setIsSelectOpen((prev) => !prev)}
                    onBlur={() => setIsSelectOpen(false)}
                    {...register("inquiry", {
                      onChange: (e) => {
                        setIsSelectOpen(false);
                        e.target.blur();
                      }
                    })}
                    className={`appearance-none flex h-12 w-full rounded-xl border bg-slate-50 px-4 pr-10 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#115E59]/30 transition-colors cursor-pointer ${errors.inquiry ? 'border-red-300 bg-red-50/50' : 'border-slate-200 focus:border-[#115E59]'}`}
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
                  <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none transition-transform duration-200 ${isSelectOpen ? "rotate-180" : ""}`} />
                </div>
                {errors.inquiry && (
                  <p className="text-xs font-medium text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.inquiry.message}</p>
                )}
              </div>

              <div className="space-y-2 flex-1 flex flex-col">
                <label htmlFor="message" className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-700">
                  Message
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
          </>
        )}
      </div>
    </div>
  );
}
