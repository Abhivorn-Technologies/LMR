"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as z from "zod";

interface ProductHeroProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badges: string[];
}

const formSchema = z.object({
  // Proper Indian Vehicle Registration Validation
  identifier: z.string()
    .min(2, "Required field")
    .max(15, "Too long")
    .regex(/^[a-zA-Z]{2}[0-9]{1,2}[a-zA-Z]{0,3}[0-9]{4}$/, "Enter a valid Registration Number (e.g. MH01AB1234)"),
  mobile: z.string().regex(/^[0-9]{10}$/, "Enter valid mobile number"),
  terms: z.boolean().refine(val => val === true, "You must agree to the terms"),
});

type FormData = z.infer<typeof formSchema>;

export const ProductHero: React.FC<ProductHeroProps> = ({
  title,
  subtitle,
  description,
  image,
  badges,
}) => {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { terms: false }
  });

  // Lock body scroll when modal is open to prevent background scrolling
  useEffect(() => {
    if (isTermsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { 
      document.body.style.overflow = '';
    }
  }, [isTermsOpen]);

  const isVehicle = title.toLowerCase().includes('car') || title.toLowerCase().includes('two wheeler') || title.toLowerCase().includes('motor');
  
  const onSubmit = async (data: FormData) => {
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
          subject: `Quick Quote Request: ${title}`,
          from_name: "LMB Website Portal",
          "Insurance Product": title,
          "Registration Number": data.identifier,
          "Mobile Number": data.mobile,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        router.push(`/view-prices?reg=${data.identifier}&mobile=${data.mobile}`);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const getCategoryDetails = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('car') || t.includes('motor')) return { icon: Icons.Car, color: '#F39C12', bg: 'bg-orange-50' };
    if (t.includes('bike') || t.includes('two wheeler') || t.includes('scooter')) return { icon: Icons.Bike, color: '#F39C12', bg: 'bg-orange-50' };
    if (t.includes('health') || t.includes('mediclaim') || t.includes('medical') || t.includes('disease')) return { icon: Icons.HeartPulse, color: '#F39C12', bg: 'bg-orange-50' };
    if (t.includes('travel') || t.includes('international') || t.includes('trip') || t.includes('schengen')) return { icon: Icons.Plane, color: '#F39C12', bg: 'bg-orange-50' };
    if (t.includes('home') || t.includes('property') || t.includes('griha')) return { icon: Icons.Home, color: '#F39C12', bg: 'bg-orange-50' };
    if (t.includes('business') || t.includes('commercial') || t.includes('workmen') || t.includes('contractor') || t.includes('jcb') || t.includes('truck') || t.includes('marine') || t.includes('cyber')) return { icon: Icons.Briefcase, color: '#F39C12', bg: 'bg-orange-50' };
    if (t.includes('life') || t.includes('term') || t.includes('retirement') || t.includes('pension') || t.includes('savings')) return { icon: Icons.HeartHandshake, color: '#F39C12', bg: 'bg-orange-50' };
    
    return { icon: Icons.ShieldCheck, color: '#F39C12', bg: 'bg-orange-50' };
  };

  const { icon: CategoryIcon, color, bg } = getCategoryDetails(title);

  return (
    <>
      <section className="relative w-full pt-28 pb-12 lg:pt-32 lg:pb-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        {/* Subtle, highly professional background accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[100px] opacity-60 -z-10"></div>
        
        <div className="max-w-7xl mx-auto w-full px-6 relative z-20">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* LEFT: Text Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-7 flex flex-col gap-6"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2.5 mb-1 justify-center lg:justify-start">
                  {badges.map((badge, idx) => (
                    <div key={idx} className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                      <Icons.ShieldCheck size={14} className="text-emerald-600" />
                      <span className="text-[11px] font-bold tracking-widest text-slate-700 uppercase">{badge}</span>
                    </div>
                  ))}
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-extrabold text-[#0F172A] leading-[1.08] tracking-tight text-center lg:text-left">
                  {title.replace('Insurance', '').trim()} <span className="text-blue-600">Insurance</span>
                </h1>
                
                <h2 className="text-slate-500 font-sans text-xl md:text-2xl font-semibold tracking-tight text-center lg:text-left">
                  {subtitle}
                </h2>

                <p className="text-[17px] text-slate-600 leading-relaxed max-w-xl font-medium mt-2 text-center lg:text-left mx-auto lg:mx-0 px-2 lg:px-0">
                  {description}
                </p>
              </div>
              
              {/* Trust features - Ultra clean */}
              <div className="flex flex-wrap gap-x-6 lg:gap-x-8 gap-y-4 mt-4 lg:mt-6 pt-6 border-t border-slate-100 justify-center lg:justify-start">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <Icons.Zap size={16} className="text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">Fast Claims</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <Icons.Wrench size={16} className="text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">Cashless Network</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <Icons.PhoneCall size={16} className="text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">24x7 Support</span>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Ultra-Clean Form Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-5 relative w-full mt-8 lg:mt-0"
            >
              <div className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col mx-auto max-w-md border border-slate-200">
                
                {/* Clean Header */}
                <div className="w-full px-8 pt-8 pb-4 bg-white flex items-center gap-4 relative">
                   <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-200 shadow-sm shrink-0">
                     <CategoryIcon className="w-6 h-6 text-[#0F172A]" strokeWidth={2} />
                   </div>
                   <div>
                     <h3 className="text-[20px] font-extrabold text-[#0F172A] tracking-tight">Request a Quote</h3>
                     <p className="text-slate-500 text-[13px] font-medium mt-0.5">Secure your vehicle instantly</p>
                   </div>
                </div>

                {/* Form Content */}
                <div className="px-8 pb-8 bg-white relative">
                  <AnimatePresence mode="wait">
                    {status === "success" ? (
                      <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center text-center py-6"
                      >
                        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-5 text-emerald-600 border border-emerald-100">
                          <Icons.CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h4 className="text-[22px] font-extrabold text-[#0F172A] mb-2">Request Successful</h4>
                        <p className="text-slate-600 mb-8 text-[15px] leading-relaxed font-medium">
                          Thank you for your interest. An LMB representative will contact you shortly with the best rates.
                        </p>
                        <Button 
                          onClick={() => setStatus("idle")}
                          variant="outline" 
                          className="w-full py-4 rounded-xl border-slate-300 text-slate-700 hover:bg-slate-50 font-bold uppercase tracking-wider text-sm"
                        >
                          Start New Quote
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.form 
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col"
                        noValidate
                      >
                        {status === "error" && (
                          <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-700 text-[13px] font-bold mb-5 border border-red-100">
                            <Icons.AlertCircle size={16} /> An error occurred. Please try again.
                          </div>
                        )}

                        {/* Standard Input: Registration Number */}
                        <div className="mb-5 mt-2">
                          <label className="block text-[12px] font-bold text-slate-500 mb-1.5 uppercase tracking-widest">
                            Registration Number
                          </label>
                          <input 
                            type="text" 
                            placeholder="e.g. KA04DK8337"
                            maxLength={15}
                            {...register("identifier")}
                            className={`w-full bg-slate-50 border ${errors.identifier ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3.5 text-[#0F172A] focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-bold uppercase placeholder:normal-case placeholder:font-medium placeholder:text-slate-400 text-[15px]`}
                          />
                          {errors.identifier && (
                            <span className="text-[12px] font-bold text-red-500 mt-1.5 block flex items-center gap-1"><Icons.Info size={14}/> {errors.identifier.message}</span>
                          )}
                        </div>
                        
                        {/* Standard Input: Mobile */}
                        <div className="mb-6">
                          <label className="block text-[12px] font-bold text-slate-500 mb-1.5 uppercase tracking-widest">
                            Mobile Number
                          </label>
                          <div className={`flex items-center border ${errors.mobile ? 'border-red-400' : 'border-slate-200'} rounded-xl bg-slate-50 overflow-hidden focus-within:border-blue-600 focus-within:bg-white transition-all`}>
                            <div className="px-4 py-3.5 text-slate-500 font-bold border-r border-slate-200 shrink-0 text-[15px]">
                              +91
                            </div>
                            <input 
                              type="tel" 
                              placeholder="Enter Mobile Number" 
                              maxLength={10}
                              {...register("mobile")}
                              className="w-full bg-transparent px-4 py-3.5 text-[#0F172A] focus:outline-none font-bold placeholder:font-medium placeholder:text-slate-400 text-[15px]"
                            />
                          </div>
                          {errors.mobile && (
                            <span className="text-[12px] font-bold text-red-500 mt-1.5 block flex items-center gap-1"><Icons.Info size={14}/> {errors.mobile.message}</span>
                          )}
                        </div>
                        
                        {/* Submit Button */}
                        <Button 
                          type="submit" 
                          disabled={status === "loading"}
                          className="w-full py-4 text-[14px] uppercase tracking-widest font-extrabold rounded-xl bg-[#ffb800] hover:bg-[#F39C12] text-slate-900 border-none transition-colors flex items-center justify-center mt-2 shadow-sm"
                        >
                          {status === "loading" ? (
                            <><Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                          ) : (
                            "View Prices"
                          )}
                        </Button>

                        {/* Terms Checkbox */}
                        <div className="mt-6 pt-5 border-t border-slate-100 flex items-start gap-3">
                          <input 
                            type="checkbox" 
                            id="terms" 
                            {...register("terms")}
                            className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                          />
                          <label htmlFor="terms" className="text-[12px] text-slate-500 leading-relaxed font-medium">
                            I agree to the <button type="button" onClick={() => setIsTermsOpen(true)} className="font-bold text-slate-700 hover:text-blue-600 underline focus:outline-none transition-colors">Terms & Conditions</button> and authorize LMB to contact me.
                          </label>
                        </div>
                        {errors.terms && (
                          <p className="text-[12px] font-bold text-red-500 mt-1.5 pl-7 flex items-center gap-1"><Icons.Info size={14}/> {errors.terms.message}</p>
                        )}
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Terms & Conditions Modal Overlay */}
      <AnimatePresence>
        {isTermsOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center px-4 pt-[100px] pb-10"
            data-lenis-prevent="true"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTermsOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-[750px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] md:max-h-[80vh]"
            >
              <style>{`
                .custom-terms-scroll::-webkit-scrollbar {
                  width: 6px;
                }
                .custom-terms-scroll::-webkit-scrollbar-track {
                  background: #f1f1f1; 
                  border-radius: 10px;
                }
                .custom-terms-scroll::-webkit-scrollbar-thumb {
                  background: #c1c1c1; 
                  border-radius: 10px;
                }
                .custom-terms-scroll::-webkit-scrollbar-thumb:hover {
                  background: #a8a8a8; 
                }
              `}</style>

              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-3 bg-white z-10 shrink-0">
                <h3 className="text-[17px] font-bold text-[#1f2937]">Terms & Conditions</h3>
                <button 
                  onClick={() => setIsTermsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                >
                  <Icons.X size={20} strokeWidth={2} />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="px-6 py-2 overflow-y-auto flex-1 bg-white custom-terms-scroll overscroll-contain">
                <ul className="space-y-5 text-[13.5px] text-gray-500 leading-[1.6]">
                  
                  <li className="flex gap-3 items-start">
                    <div className="mt-1 flex-shrink-0 w-[15px] h-[15px] bg-[#d1d5db] rounded-[3px] flex items-center justify-center text-white">
                      <Icons.Check size={11} strokeWidth={3} />
                    </div>
                    <p>
                      For motor insurance: I/We agree and understand that by submitting data on this portal, the Company will fetch additional information regarding the vehicle through centralized Vahan/Parivahan/government/any other database. I/We hereby confirm our unconditional consent in this regard. I/We declare not to misuse/abuse/use the content of this portal for any commercial purpose or any derivative work. I/We hereby declare that details retrieved from the portal shall not be used for any illegal or malafide purpose.
                    </p>
                  </li>

                  <li className="flex gap-3 items-start">
                    <div className="mt-1 flex-shrink-0 w-[15px] h-[15px] bg-[#d1d5db] rounded-[3px] flex items-center justify-center text-white">
                      <Icons.Check size={11} strokeWidth={3} />
                    </div>
                    <p>
                      I/We, hereby declare that the statements and particulars given in this Proposal form are complete, true and accurate and I/We agree that the Insurance company will not be liable under the insurance contract if it is found that any of my/our statements or particulars or declarations in this proposal form or other documents are incorrect /misleading /Fraudulent in any respect on any matter to the grant of a cover or submission of claim in future.
                    </p>
                  </li>

                  <li className="flex gap-3 items-start">
                    <div className="mt-1 flex-shrink-0 w-[15px] h-[15px] bg-[#d1d5db] rounded-[3px] flex items-center justify-center text-white">
                      <Icons.Check size={11} strokeWidth={3} />
                    </div>
                    <p>
                      I declare that the premium paid under this transaction to LMB Insurance Brokers is being paid by me i.e. the proposer/policyholder through a bank account or a Credit/Debit Card or a Prepaid Payment Instrument or a UPI wallet (Wallet), held by me in my name as a primary holder (referred to as "source account"). I confirm that it is not a third party payment made by any other person on my behalf. I understand that in the event of a policy cancellation, the refund of premium as per policy terms and conditions will be credited back to the source account.
                    </p>
                  </li>

                  <li className="flex gap-3 items-start">
                    <div className="mt-1 flex-shrink-0 w-[15px] h-[15px] bg-[#d1d5db] rounded-[3px] flex items-center justify-center text-white">
                      <Icons.Check size={11} strokeWidth={3} />
                    </div>
                    <p>
                      I/We further declare that I/we will notify in writing any change in the details so furnished hereinabove occurring after the proposal has been submitted but before communication of the risk acceptance by the Company.
                    </p>
                  </li>

                  <li className="flex gap-3 items-start">
                    <div className="mt-1 flex-shrink-0 w-[15px] h-[15px] bg-[#d1d5db] rounded-[3px] flex items-center justify-center text-white">
                      <Icons.Check size={11} strokeWidth={3} />
                    </div>
                    <p>
                      I/We authorize the Company to share information pertaining to my proposal including medical records for the sole purpose of proposal underwriting and/or claims settlement and with any Governmental and/or Regulatory authority.
                    </p>
                  </li>

                  <li className="flex gap-3 items-start">
                    <div className="mt-1 flex-shrink-0 w-[15px] h-[15px] bg-[#d1d5db] rounded-[3px] flex items-center justify-center text-white">
                      <Icons.Check size={11} strokeWidth={3} />
                    </div>
                    <p>
                      By submitting my contact number and/or email ID, I authorize LMB Insurance Brokers to call, send email/SMS/WhatsApp and offer information and services about its product(s) and/or assist me for completing any incomplete journey/transaction. I further acknowledge and agree that such authorization will be over and above any registration of my contact number on TRAI's NDNC registry.
                    </p>
                  </li>

                  <li className="flex gap-3 items-start">
                    <div className="mt-1 flex-shrink-0 w-[15px] h-[15px] bg-[#d1d5db] rounded-[3px] flex items-center justify-center text-white">
                      <Icons.Check size={11} strokeWidth={3} />
                    </div>
                    <p>
                      I/We hereby authorize LMB Insurance Brokers to share my/our contact details with any individual agent/Point of Sales Person/intermediary associated with LMB solely for the purpose of delivering insurance-related services, including policy support, follow-ups through WhatsApp, phone, or other communication channels, and providing in-person assistance, if necessary. I/We acknowledge that such data will be handled securely in accordance with applicable privacy laws, used exclusively for the stated purposes, and that I/we may revoke this consent at any time by contacting LMB.
                    </p>
                  </li>

                  <li className="flex gap-3 items-start">
                    <div className="mt-1 flex-shrink-0 w-[15px] h-[15px] bg-[#FFB600] rounded-[3px] flex items-center justify-center text-white">
                      <Icons.Check size={11} strokeWidth={3} />
                    </div>
                    <p>
                      <strong className="font-bold text-[#1f2937]">Curious about Life Insurance Policy?</strong> Our Promoter Group company has exciting offers for you. By opting in here, you consent LMB Insurance Brokers to share your details such as Name, Gender, Date of birth, Email id, contact number, CIBIL score/profile, pin code and vehicle registration number with our Life Insurance partners for them to contact you via phone call, SMS, WhatsApp, or email regarding their products/services/curated coverage options.
                    </p>
                  </li>

                </ul>
              </div>

              {/* Footer */}
              <div className="px-6 py-5 bg-white shrink-0 flex justify-end">
                <Button 
                  onClick={() => {
                    setValue("terms", true, { shouldValidate: true });
                    setIsTermsOpen(false);
                  }}
                  className="bg-[#FFB600] hover:bg-[#F39C12] text-[#1f2937] font-bold px-10 py-2 rounded-[6px] border-none transition-all"
                >
                  I Agree
                </Button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
