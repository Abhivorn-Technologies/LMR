"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldAlert, Car, Zap, FileText, Activity, TrendingUp, ShieldCheck, Users, Navigation } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export function CarInsuranceContent() {
  const [activePolicy, setActivePolicy] = useState("");

  return (
    <div className="flex flex-col gap-16 font-sans selection:bg-[#115E59] selection:text-white pb-20 overflow-hidden">
      
      {/* Introduction */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="max-w-4xl mx-auto text-center pt-10 px-6 lg:px-0"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#04151a] mb-6">
          Buy/Renew Car Insurance Policy <span className="text-[#115E59]">Online in India 2026</span>
        </h2>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed">
          Car insurance serves as your financial safety net, helping to cover costs if your car is damaged, stolen, or involved in an accident. It’s designed to protect you from unexpected expenses and ensure you are legally protected.
        </p>
      </motion.div>

      {/* Premium Bento Box Intro */}
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00B4D8]/5 rounded-full blur-[80px] pointer-events-none -z-10" />
        
        {/* Left Column - What is Car Insurance */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-7 p-6 md:p-10 lg:p-12 rounded-[2rem] lg:rounded-[3rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden flex flex-col justify-between group">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#115E59]/5 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 group-hover:bg-[#115E59]/10 transition-colors duration-700" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-5 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#115E59] to-[#04151a] flex items-center justify-center text-white shadow-lg shadow-[#115E59]/30 flex-shrink-0">
                <Car size={28} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#04151a]">What is Car Insurance?</h2>
            </div>
            <div className="space-y-6">
              <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                Car insurance is a type of vehicle insurance that protects you from unexpected expenses due to accidents, theft, natural disasters, or third-party damages.
              </p>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                It covers repair costs, replacements, and legal liabilities, helping reduce the financial burden on vehicle owners. In India, it’s legally mandatory to have at least a third-party car insurance policy to ensure that any injury or damage caused to another person or their property while driving is covered.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-[#00B4D8]/5 border border-[#00B4D8]/20 rounded-2xl relative z-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="w-10 h-10 rounded-full bg-[#00B4D8]/20 flex items-center justify-center text-[#00B4D8] flex-shrink-0">
              <ShieldAlert size={20} />
            </div>
            <p className="text-[#008ba8] font-medium leading-relaxed text-base">
              <strong className="text-[#00708a]">Three main types:</strong> Third-Party covers damage to others, Own Damage (OD) covers your vehicle, and Comprehensive includes both.
            </p>
          </div>
        </motion.div>

        {/* Right Column - Why is it Mandatory */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="lg:col-span-5 p-6 md:p-10 lg:p-12 rounded-[2rem] lg:rounded-[3rem] bg-[#04151a] text-white relative overflow-hidden flex flex-col justify-center">
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#00B4D8]/10 blur-[80px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/3" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-[#00B4D8]">
                <Activity size={24} />
              </div>
              Why is it Mandatory?
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8 text-base md:text-lg">
              Guidelines are made for the overall safety of people like you and me. Valid insurance takes care of exhausting hurdles.
            </p>
            
            <div className="space-y-4">
              {[
                { title: "Road Accidents", desc: "Ensures no one bears the financial brunt." },
                { title: "Protects Third Party", desc: "Compensates for car or personal damages." },
                { title: "Legal Processes", desc: "Takes care of time-consuming legal hurdles." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-300 group">
                  <div className="flex-shrink-0 text-[#00B4D8] bg-[#00B4D8]/10 w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-[#00B4D8] group-hover:text-white transition-all duration-300">
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
          <h2 className="text-3xl md:text-4xl font-bold text-[#04151a] mb-4">Different Types of Car Insurance Policies</h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            In India, insurers offer three main types of car insurance policies. Choosing the right one depends on your car’s age, usage, and the level of protection you need.
          </p>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          {[
            { 
              id: "comprehensive", 
              label: "Comprehensive Car Insurance",
              icon: ShieldCheck,
              content: (
                <div className="space-y-4">
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                    Comprehensive car insurance combines third-party liability cover with protection for damage or loss to your own car under a single plan. It protects you against financial losses arising from road accidents, theft of the car, fire, natural disasters such as floods and cyclones, and certain man-made incidents.
                  </p>
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                    Unlike basic third-party insurance, which only fulfils legal requirements, comprehensive insurance also safeguards your own vehicle. The coverage can be further enhanced with add-ons such as zero depreciation, engine protection, or roadside assistance to reduce out-of-pocket costs.
                  </p>
                  <div className="mt-6 p-6 bg-[#115E59]/5 rounded-2xl border border-[#115E59]/10">
                    <h4 className="font-bold text-[#115E59] text-lg mb-3">Why Choose It?</h4>
                    <ul className="space-y-2 text-slate-700 font-medium text-base">
                      <li className="flex items-center gap-3"><CheckCircle2 className="text-[#115E59] w-5 h-5"/> Wider coverage for both you and third parties.</li>
                      <li className="flex items-center gap-3"><CheckCircle2 className="text-[#115E59] w-5 h-5"/> Flexibility to add useful covers like zero depreciation.</li>
                      <li className="flex items-center gap-3"><CheckCircle2 className="text-[#115E59] w-5 h-5"/> Greater financial security in case of major accidents or theft.</li>
                    </ul>
                  </div>
                </div>
              )
            },
            { 
              id: "thirdparty", 
              label: "Third Party Car Insurance",
              icon: Users,
              content: (
                <div className="space-y-4">
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                    Third party car insurance, also known as third party liability insurance, is a mandatory motor insurance policy in India that covers your legal and financial liability if your car causes injury, death, or property damage to a third party.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                      <h4 className="font-bold text-emerald-700 text-lg mb-3 flex items-center gap-2"><CheckCircle2 size={20}/> It covers:</h4>
                      <ul className="space-y-2 text-slate-600 font-medium text-base">
                        <li>• Injury or death of a third-party person</li>
                        <li>• Damage to a third-party vehicle or property</li>
                      </ul>
                    </div>
                    <div className="p-6 bg-rose-50 rounded-2xl border border-rose-100">
                      <h4 className="font-bold text-rose-700 text-lg mb-3 flex items-center gap-2"><ShieldAlert size={20}/> It does NOT cover:</h4>
                      <ul className="space-y-2 text-slate-600 font-medium text-base">
                        <li>• Damage to your own car</li>
                        <li>• Theft, fire, or natural calamities affecting your car</li>
                      </ul>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl mt-4 text-slate-500 text-sm font-medium">
                    *As per the Motor Vehicles Act, driving a car without valid third-party insurance is illegal in India and can attract fines.
                  </div>
                </div>
              )
            },
            { 
              id: "owndamage", 
              label: "Standalone Own Damage (OD)",
              icon: Car,
              content: (
                <div className="space-y-4">
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                    Standalone Own Damage (OD) car insurance is the part of a motor insurance policy that covers the cost of repairing, replacing, or compensating for damage to your own vehicle, subject to policy terms, depreciation, deductibles, and exclusions.
                  </p>
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                    It does not cover third-party liabilities, including injury, death, or property damage caused to others. Those liabilities are covered under a separate Third-Party (TP) insurance policy, which is mandatory under Indian law.
                  </p>
                  <div className="mt-6 p-6 bg-[#00B4D8]/5 rounded-2xl border border-[#00B4D8]/10">
                    <p className="text-[#008ba8] text-base font-semibold">
                      This policy gives you the flexibility to protect your car without having to commit to a long-term comprehensive policy from the insurer.
                    </p>
                  </div>
                </div>
              )
            },
            { 
              id: "electric", 
              label: "LMB Insurance for Electric Vehicles",
              icon: Zap,
              content: (
                <div className="space-y-4">
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                    LMB Car Insurance for Electric Vehicles (EVs) offers comprehensive protection tailored for modern electric cars. It not only covers accidents, theft, and third-party liabilities like regular car insurance, but also safeguards high-value components.
                  </p>
                  <div className="grid gap-3 mt-6">
                    {[
                      "Coverage for the expensive EV battery systems.",
                      "Protection for specialized charging equipment.",
                      "EV Shield Cover addon for advanced electrical systems."
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="w-8 h-8 rounded-full bg-[#115E59]/10 flex items-center justify-center text-[#115E59] flex-shrink-0">
                          <Zap size={16} />
                        </div>
                        <span className="text-slate-700 font-medium text-base">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed mt-4">
                    With options for add-on covers and access to LMB’s extensive cashless garage network, it ensures EV owners enjoy worry-free driving while staying fully compliant.
                  </p>
                </div>
              )
            },
            { 
              id: "payas", 
              label: "Pay as you Drive Insurance",
              icon: Navigation,
              content: (
                <div className="space-y-4">
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                    A flexible, modern policy where your premium is based on the kilometers you drive. Perfect for individuals who don't drive frequently but still want full comprehensive protection.
                  </p>
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                    Contact our expert brokers today to structure a custom kilometer band for your vehicle and save significantly on your premiums.
                  </p>
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
                className={`group overflow-hidden rounded-[1.5rem] lg:rounded-[2rem] border transition-all duration-500 ${isActive ? 'bg-white border-[#115E59]/30 shadow-xl shadow-[#115E59]/10' : 'bg-slate-50 border-slate-200 hover:border-[#115E59]/30 hover:bg-white'}`}
              >
                <button 
                  onClick={() => setActivePolicy(isActive ? "" : policy.id)}
                  className="w-full flex items-center justify-between p-6 lg:p-8 text-left focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-500 flex-shrink-0 ${isActive ? 'bg-[#115E59] text-white shadow-md shadow-[#115E59]/20' : 'bg-slate-200/50 text-slate-400 group-hover:bg-[#115E59]/10 group-hover:text-[#115E59]'}`}>
                      <policy.icon size={24} />
                    </div>
                    <h3 className={`text-xl lg:text-2xl font-bold transition-colors duration-300 ${isActive ? 'text-[#115E59]' : 'text-[#04151a]'}`}>
                      {policy.label}
                    </h3>
                  </div>
                  <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-all duration-500 flex-shrink-0 ${isActive ? 'bg-[#115E59]/10 text-[#115E59] rotate-45' : 'bg-slate-200 text-slate-400 group-hover:bg-slate-300'}`}>
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
          <h2 className="text-3xl md:text-4xl font-bold text-[#04151a] mb-4">Key Features of Car Insurance in India</h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            Policies are designed to provide complete financial and legal protection to vehicle owners.
          </p>
        </div>
        
        <motion.div variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-x-12 lg:gap-y-16 max-w-7xl mx-auto">
          {[
            { icon: FileText, title: "Mandatory Legal Requirement", desc: "Every car owner must have at least a third-party car insurance policy. This ensures you are legally compliant." },
            { icon: Activity, title: "Own Damage Coverage", desc: "Covers damages to your own vehicle arising from accidents, theft, natural calamities (floods, cyclones), and fire." },
            { icon: ShieldAlert, title: "Third-Party Liability Cover", desc: "Protects you against financial and legal liabilities if your car causes damage or injury to another person." },
            { icon: Zap, title: "Add-On Covers", desc: "Enhance coverage with zero depreciation, engine protection, consumables cover, or roadside assistance." },
            { icon: TrendingUp, title: "No Claim Bonus (NCB)", desc: "Safe drivers are rewarded with premium discounts of up to 50% for each consecutive claim-free year." },
            { icon: Car, title: "Cashless Repairs", desc: "Access thousands of partner garages where you can avail cashless repairs without upfront payments." }
          ].map((feature, i) => (
            <motion.div key={i} variants={fadeInUp} className="group flex flex-col items-center text-center px-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 group-hover:bg-[#115E59] group-hover:text-white group-hover:-translate-y-2 transition-all duration-500 mb-5 group-hover:shadow-lg group-hover:shadow-[#115E59]/20">
                <feature.icon size={28} />
              </div>
              <h4 className="font-bold text-[#04151a] text-lg lg:text-xl mb-3">{feature.title}</h4>
              <p className="text-slate-600 text-base leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Types of Cars Covered */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
        className="relative overflow-hidden pt-10"
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#115E59]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00B4D8]/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 mb-10 lg:mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#04151a]">Different Types of Cars We Cover</h2>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            LMB offers coverage for a wide range of vehicles, perfectly tailored to suit various ownership types and specialized usage patterns.
          </p>
        </div>

        <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 max-w-6xl mx-auto">
          {[
            { title: "Brand New Cars", icon: Car, desc: "Typically insured with comprehensive policies covering accidents, theft, fire, and natural disasters." },
            { title: "Electric Cars", icon: Zap, desc: "Specialised plans for EVs which include coverage for batteries, charging equipment, and roadside assistance." },
            { title: "Second-Hand Cars", icon: Activity, desc: "Used cars are just as insurable. Affordable policies help protect against unexpected repairs." },
            { title: "Commercial Cars", icon: TrendingUp, desc: "For taxis, delivery vans, or company cars. Covers third-party liabilities and driver protection." },
            { title: "CNG Cars", icon: FileText, desc: "Coverage includes damage to the CNG kit and related components if declared during policy purchase." },
            { title: "Old Cars", icon: ShieldAlert, desc: "Often insured with basic third-party liability coverage to ensure legal compliance and basic protection." }
          ].map((car, i) => (
            <motion.div key={i} variants={fadeInUp} className="group flex flex-col items-center text-center p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2rem] bg-white border-2 border-slate-100 transition-all duration-500 shadow-sm shadow-slate-200/40 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#115E59]/20 hover:border-[#115E59] cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#115E59] mb-5 group-hover:scale-110 group-hover:bg-[#115E59] group-hover:text-white transition-all duration-500 group-hover:shadow-md group-hover:shadow-[#115E59]/30">
                <car.icon size={28} />
              </div>
              <h4 className="text-[#04151a] group-hover:text-[#115E59] font-bold text-lg lg:text-xl mb-3 transition-colors duration-500">{car.title}</h4>
              <p className="text-slate-600 text-sm lg:text-base leading-relaxed transition-colors duration-500">{car.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
