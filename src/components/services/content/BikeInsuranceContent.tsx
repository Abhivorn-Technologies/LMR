"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { CheckCircle2, ShieldAlert, Zap, FileText, Activity, TrendingUp, ShieldCheck, Users } from "lucide-react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export function BikeInsuranceContent() {
  const [activePolicy, setActivePolicy] = useState("");

  return (
    <div className="flex flex-col gap-16 font-sans selection:bg-[#2563EB] selection:text-white pb-20 overflow-hidden">
      
      {/* Introduction */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="max-w-4xl mx-auto text-center pt-10 px-6 lg:px-0"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
          Buy/Renew Two Wheeler Insurance Policy <span className="text-[#2563EB]">Online in India 2026</span>
        </h2>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed">
          LMB's two-wheeler insurance offers financial protection for your two-wheeler against accidents, theft, natural disasters, and third-party damages. It ensures you're not burdened with unexpected repair or replacement costs, giving you peace of mind every time you ride.
        </p>
      </motion.div>

      {/* Premium Bento Box Intro */}
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F97316]/5 rounded-full blur-[80px] pointer-events-none -z-10" />
        
        {/* Left Column */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-7 p-6 md:p-10 lg:p-12 rounded-[2rem] lg:rounded-[3rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden flex flex-col justify-between group">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#2563EB]/5 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 group-hover:bg-[#2563EB]/10 transition-colors duration-700" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-5 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#0F172A] flex items-center justify-center text-white shadow-lg shadow-[#2563EB]/30 flex-shrink-0">
                <Activity size={28} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">What is Two-Wheeler Insurance?</h2>
            </div>
            <div className="space-y-6">
              <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                Two-wheeler insurance is a type of motor insurance policy that offers financial protection for you and your two-wheeler against accidents, theft, fire, and natural disasters. It also covers third-party liabilities, including damage to other vehicles, property, or individuals.
              </p>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                Whether you ride a motorcycle or a scooter, having insurance ensures you're covered from unexpected costs and legal risks.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-[#F97316]/5 border border-[#F97316]/20 rounded-2xl relative z-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="w-10 h-10 rounded-full bg-[#F97316]/20 flex items-center justify-center text-[#F97316] flex-shrink-0">
              <ShieldAlert size={20} />
            </div>
            <p className="text-[#EA580C] font-medium leading-relaxed text-base">
              <strong className="text-[#C2410C]">Smart Choice:</strong> While third-party (TP) insurance is mandatory by law, it’s wise to opt for comprehensive coverage for better protection.
            </p>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="lg:col-span-5 p-6 md:p-10 lg:p-12 rounded-[2rem] lg:rounded-[3rem] bg-[#0F172A] text-white relative overflow-hidden flex flex-col justify-center">
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#F97316]/10 blur-[80px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/3" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-[#F97316]">
                <FileText size={24} />
              </div>
              Why is it Mandatory?
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8 text-base md:text-lg">
              Two-wheeler insurance is a legal requirement under the Motor Vehicles Act, primarily aimed at ensuring financial protection.
            </p>
            
            <div className="space-y-4">
              {[
                { title: "Financial Protection", desc: "Ensures victims receive timely compensation without prolonged disputes." },
                { title: "Accountability", desc: "Safeguards riders and third parties in the event of road accidents." },
                { title: "Legal Compliance", desc: "Encourages responsible behaviour on the road." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-300 group">
                  <div className="flex-shrink-0 text-[#F97316] bg-[#F97316]/10 w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-[#F97316] group-hover:text-white transition-all duration-300">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base mb-1">{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Dynamic Expanding Accordion for Policy Types */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
      >
        <div className="text-center mb-10 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">Types of Two-Wheeler Insurance Policies</h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            Choose the right coverage for your two-wheeler to ensure you are legally compliant and financially protected.
          </p>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          {[
            { 
              id: "comprehensive", 
              label: "Comprehensive Bike Insurance",
              icon: ShieldCheck,
              content: (
                <div className="space-y-4">
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                    A comprehensive bike insurance policy provides complete protection by covering both third-party liabilities and damage to your own two-wheeler resulting from accidents, theft, fire, or natural disasters.
                  </p>
                  <div className="mt-6 p-6 bg-[#2563EB]/5 rounded-2xl border border-[#2563EB]/10">
                    <h4 className="font-bold text-[#2563EB] text-lg mb-3">Benefits of Comprehensive Insurance:</h4>
                    <ul className="space-y-2 text-slate-700 font-medium text-base">
                      <li className="flex items-center gap-3"><CheckCircle2 className="text-[#2563EB] w-5 h-5"/> Complete protection against natural and man-made calamities.</li>
                      <li className="flex items-center gap-3"><CheckCircle2 className="text-[#2563EB] w-5 h-5"/> Coverage for theft of your scooter or bike.</li>
                      <li className="flex items-center gap-3"><CheckCircle2 className="text-[#2563EB] w-5 h-5"/> Extra protection with customized add-ons like zero depreciation.</li>
                    </ul>
                  </div>
                </div>
              )
            },
            { 
              id: "thirdparty", 
              label: "Third-Party Bike Insurance",
              icon: Users,
              content: (
                <div className="space-y-4">
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                    Third-party bike insurance is mandatory by law and only covers damages or injuries caused to other people, vehicles, or property in an accident involving your two-wheeler.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                      <h4 className="font-bold text-blue-700 text-lg mb-3 flex items-center gap-2"><CheckCircle2 size={20}/> It covers:</h4>
                      <ul className="space-y-2 text-slate-600 font-medium text-base">
                        <li>• Injury or death of a third-party person</li>
                        <li>• Damage to a third-party vehicle or property</li>
                      </ul>
                    </div>
                    <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100">
                      <h4 className="font-bold text-orange-700 text-lg mb-3 flex items-center gap-2"><ShieldAlert size={20}/> It does NOT cover:</h4>
                      <ul className="space-y-2 text-slate-600 font-medium text-base">
                        <li>• Damage to your own two-wheeler</li>
                        <li>• Theft, fire, or natural calamities affecting your bike</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            },
            { 
              id: "owndamage", 
              label: "Own Damage Bike Insurance",
              icon: Activity,
              content: (
                <div className="space-y-4">
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                    An own damage bike insurance policy covers only your two-wheeler against own damage or loss from accidents, theft, fire, and natural calamities, and it does not include third-party coverage.
                  </p>
                  <div className="mt-6 p-6 bg-[#F97316]/5 rounded-2xl border border-[#F97316]/10">
                    <p className="text-[#EA580C] text-base font-semibold">
                      Ideal for those who already have a long-term third-party cover and want to enhance protection for their own vehicle.
                    </p>
                  </div>
                </div>
              )
            },
            { 
              id: "electric", 
              label: "LMB Insurance for Electric Bikes",
              icon: Zap,
              content: (
                <div className="space-y-4">
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                    Electric bike insurance protects two-wheelers which run on electricity from potential damage and losses occurring due to accidents, natural calamities, or fire.
                  </p>
                  <div className="grid gap-3 mt-6">
                    {[
                      "Coverage for electrical panels and batteries.",
                      "Protection for charging point and cables.",
                      "EV specific roadside assistance."
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="w-8 h-8 rounded-full bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] flex-shrink-0">
                          <Zap size={16} />
                        </div>
                        <span className="text-slate-700 font-medium text-base">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            }
          ].map((policy) => {
            const isActive = activePolicy === policy.id;
            return (
              <motion.div 
                key={policy.id} 
                layout 
                initial={false}
                className={`group overflow-hidden rounded-[1.5rem] lg:rounded-[2rem] border transition-all duration-500 ${isActive ? 'bg-white border-[#2563EB]/30 shadow-xl shadow-[#2563EB]/10' : 'bg-slate-50 border-slate-200 hover:border-[#2563EB]/30 hover:bg-white'}`}
              >
                <button 
                  onClick={() => setActivePolicy(isActive ? "" : policy.id)}
                  className="w-full flex items-center justify-between p-6 lg:p-8 text-left focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-500 flex-shrink-0 ${isActive ? 'bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/20' : 'bg-slate-200/50 text-slate-400 group-hover:bg-[#2563EB]/10 group-hover:text-[#2563EB]'}`}>
                      <policy.icon size={24} />
                    </div>
                    <h3 className={`text-xl lg:text-2xl font-bold transition-colors duration-300 ${isActive ? 'text-[#2563EB]' : 'text-[#0F172A]'}`}>
                      {policy.label}
                    </h3>
                  </div>
                  <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-all duration-500 flex-shrink-0 ${isActive ? 'bg-[#2563EB]/10 text-[#2563EB] rotate-45' : 'bg-slate-200 text-slate-400 group-hover:bg-slate-300'}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-6 lg:px-8 pb-8 pt-2 border-t border-slate-100">
                        {policy.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Key Features List */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
      >
        <div className="text-center mb-10 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">Key Features of LMB Two-Wheeler Insurance</h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            Ensuring your complete protection on Indian roads.
          </p>
        </div>
        
        <motion.div variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-x-12 lg:gap-y-16 max-w-7xl mx-auto">
          {[
            { icon: FileText, title: "Mandatory Legal Requirement", desc: "Every two-wheeler owner must have at least a third-party policy. This ensures you are legally compliant." },
            { icon: Activity, title: "Own Damage Cover", desc: "Covers damages to your own vehicle arising from accidents, theft, natural calamities, and fire." },
            { icon: ShieldAlert, title: "Third-Party Liability", desc: "Unlimited Liability for Personal Damages, Up to 7.5 Lakhs for Property/Vehicle Damages." },
            { icon: Zap, title: "Customizable Add-Ons", desc: "8+ Add-ons available including zero depreciation and engine protection." },
            { icon: TrendingUp, title: "No Claim Bonus (NCB)", desc: "Safe riders are rewarded with premium discounts of up to 50% for each consecutive claim-free year." },
            { icon: ShieldCheck, title: "Cashless Repairs", desc: "Available at 10,000+ Network Garages across India for hassle-free claim settlements." }
          ].map((feature, i) => (
            <motion.div key={i} variants={fadeInUp} className="group flex flex-col items-center text-center px-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 group-hover:bg-[#2563EB] group-hover:text-white group-hover:-translate-y-2 transition-all duration-500 mb-5 group-hover:shadow-lg group-hover:shadow-[#2563EB]/20">
                <feature.icon size={28} />
              </div>
              <h4 className="font-bold text-[#0F172A] text-lg lg:text-xl mb-3">{feature.title}</h4>
              <p className="text-slate-600 text-base leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Types of Two-Wheelers Covered */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
        className="relative overflow-hidden pt-10"
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2563EB]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F97316]/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 mb-10 lg:mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0F172A]">Different Types of Two-Wheelers We Cover</h2>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            LMB offers coverage for a wide range of vehicles, perfectly tailored to suit your specific needs and ownership types on Indian roads.
          </p>
        </div>

        <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 max-w-6xl mx-auto">
          {[
            { title: "Private Two-Wheelers", icon: Activity, desc: "Standard geared and non-geared two-wheelers of all engine capacities used for personal purposes, including bikes, scooters, mopeds." },
            { title: "Commercial Two-Wheelers", icon: TrendingUp, desc: "Vehicles used by business to carry goods and passengers. Designed keeping in mind the needs of delivery partners." },
            { title: "Electric Two-Wheelers", icon: Zap, desc: "Protects EVs from potential damage and losses occurring due to accidents, natural calamities, or fire." }
          ].map((bike, i) => (
            <motion.div key={i} variants={fadeInUp} className="group flex flex-col items-center text-center p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2rem] bg-white border-2 border-slate-100 transition-all duration-500 shadow-sm shadow-slate-200/40 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#2563EB]/20 hover:border-[#2563EB] cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#2563EB] mb-5 group-hover:scale-110 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-500 group-hover:shadow-md group-hover:shadow-[#2563EB]/30">
                <bike.icon size={28} />
              </div>
              <h4 className="text-[#0F172A] group-hover:text-[#2563EB] font-bold text-lg lg:text-xl mb-3 transition-colors duration-500">{bike.title}</h4>
              <p className="text-slate-600 text-sm lg:text-base leading-relaxed transition-colors duration-500">{bike.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
