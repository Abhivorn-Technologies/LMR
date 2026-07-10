"use client";

import React, { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { ChevronRight, CheckCircle2, ShieldCheck, Star, HelpCircle, ChevronDown } from "lucide-react";

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

export function CarInsuranceContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col font-sans selection:bg-[#F97316] selection:text-white bg-white text-[#1f2937] overflow-hidden">
      
      {/* 1. What is Car Insurance? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={slideInLeft}
            className="flex justify-center relative order-first lg:order-none"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-orange-50 rounded-[2rem] md:rounded-[3rem] transform -rotate-3 scale-105 -z-10"></div>
            <img src="https://d2h44aw7l5xdvz.cloudfront.net/assets/car%20front-01-1.svg" alt="What is Car Insurance" className="w-full max-w-[480px] drop-shadow-2xl hover:scale-105 transition-transform duration-500" />
          </motion.div>
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={slideInRight}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-bold text-sm mb-2">
              <ShieldCheck size={18} /> Verified Protection
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#0F172A] leading-[1.15] tracking-tight">
              What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Car Insurance?</span>
            </h2>
            <p className="text-[16px] md:text-lg text-slate-600 leading-relaxed font-medium">
              Car insurance is a vehicle insurance policy that protects your car against financial losses caused by accidents, theft, fire, natural disasters, and third-party liabilities. In India, having at least third-party car insurance is legally mandatory.
            </p>
            <p className="text-[16px] md:text-lg text-slate-600 leading-relaxed">
              A car insurance policy can help cover the cost of repairing or replacing your car in case of damage. It also protects you against legal and financial liabilities if your car causes injury, death, or property damage to a third party.
            </p>
            <div className="pt-4 flex items-center gap-4">
              <div className="flex -space-x-4 shrink-0">
                <img className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=1" alt="" />
                <img className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=2" alt="" />
                <img className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=3" alt="" />
              </div>
              <div className="text-xs md:text-sm font-bold text-slate-700">
                Trusted by 10,000+ <br className="hidden sm:block"/><span className="text-slate-500 font-normal">Happy Customers</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Key Features */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-[40px] font-extrabold text-[#0F172A] mb-4 md:mb-5 tracking-tight">Key Features of LMB Car Insurance</h2>
            <div className="w-16 md:w-20 h-1.5 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full mx-auto mb-4 md:mb-6"></div>
            <p className="text-[16px] md:text-[19px] text-slate-600 max-w-3xl mx-auto leading-relaxed px-2">
              Car insurance policies in India are designed to provide complete financial and legal protection.
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                icon: "https://d2h44aw7l5xdvz.cloudfront.net/assets/img/hatchback-damaged-driving.svg", 
                title: "Protection for Your Own Car", 
                desc: "Comprehensive car insurance covers damages to your own vehicle arising from accidents, theft, natural calamities, and fire.",
                anim: slideInLeft
              },
              { 
                icon: "https://d2h44aw7l5xdvz.cloudfront.net/assets/img/banged-cars.svg", 
                title: "Coverage for Third-party Losses", 
                desc: "Protects you against financial and legal liabilities if your car causes damage to another person's property, vehicle, or results in injury/death.",
                anim: fadeInUp
              },
              { 
                icon: "https://d2h44aw7l5xdvz.cloudfront.net/assets/icons/happy-giftbox.svg", 
                title: "Add-On Covers for Extra Safety", 
                desc: "Policyholders can enhance coverage by opting for add-ons such as zero depreciation cover, engine protection, or roadside assistance.",
                anim: slideInRight
              },
              { 
                icon: "https://d2h44aw7l5xdvz.cloudfront.net/assets/icons/discount.svg", 
                title: "Earn No Claim Bonus (NCB)", 
                desc: "Safe drivers are rewarded with premium discounts of up to 50% for each claim-free year.",
                anim: slideInLeft
              },
              { 
                icon: "https://d2h44aw7l5xdvz.cloudfront.net/assets/icons/1_cashless%20garage.svg", 
                title: "Cashless Repairs at Network", 
                desc: "Most insurers offer access to a vast network of cashless garages where you don't have to pay out of pocket for covered repairs.",
                anim: fadeInUp
              },
              { 
                icon: "https://d2h44aw7l5xdvz.cloudfront.net/assets/img/man-with-hand-injured.svg", 
                title: "Personal Accident Cover", 
                desc: "Mandatory coverage that offers financial compensation in the event of accidental death or permanent disability of the owner-driver.",
                anim: slideInRight
              }
            ].map((feature, i) => (
                <motion.div key={i} variants={feature.anim} className="bg-white border border-slate-200 rounded-[1.5rem] p-8 shadow-sm hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] hover:-translate-y-2 transition-all duration-300 group">
                  <div className="h-24 flex items-center justify-start mb-6">
                     <img src={feature.icon} alt={feature.title} className="h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3 leading-tight">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Different Types of Car Insurance Policies */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-10 md:space-y-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} className="text-center border-b border-slate-100 pb-8 md:pb-12">
          <h2 className="text-2xl md:text-3xl lg:text-[40px] font-extrabold text-[#0F172A] tracking-tight mb-4 md:mb-5">Different Types of Car Insurance Policies</h2>
          <div className="w-16 md:w-20 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto"></div>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="space-y-8 md:space-y-12">
          
          <motion.div variants={slideInLeft} className="bg-white p-8 md:p-12 rounded-[2rem] border border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden group hover:border-blue-300 transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500"></div>
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="shrink-0">
                    <img src="https://d2h44aw7l5xdvz.cloudfront.net/assets/img/car-full-circle-chart.svg" alt="Comprehensive" className="w-32 h-32 object-contain drop-shadow-xl" />
                </div>
                <div className="space-y-4">
                    <h3 className="text-[26px] font-bold text-[#0F172A]">Comprehensive Car Insurance</h3>
                    <p className="text-[17px] text-slate-600 leading-relaxed font-medium">
                        The most extensive form of coverage available. It protects your vehicle against accidental damage, theft, fire, natural events, and human-caused incidents, while also covering third-party liabilities.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-bold text-sm">
                        <Star size={16} /> Best Suited For: New cars, frequent drivers, city/highway users.
                    </div>
                </div>
            </div>
          </motion.div>

          <motion.div variants={slideInRight} className="bg-white p-8 md:p-12 rounded-[2rem] border border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden group hover:border-orange-300 transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500"></div>
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="shrink-0">
                    <img src="https://d2h44aw7l5xdvz.cloudfront.net/assets/img/car-quarter-circle-chart.svg" alt="Third Party" className="w-32 h-32 object-contain drop-shadow-xl" />
                </div>
                <div className="space-y-4">
                    <h3 className="text-[26px] font-bold text-[#0F172A]">Third-Party & Standalone OD</h3>
                    <p className="text-[17px] text-slate-600 leading-relaxed font-medium">
                        Third-party is legally mandatory and provides financial protection if your car causes damage to someone else. Standalone Own-Damage focuses solely on covering damage to your own vehicle.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-lg font-bold text-sm">
                        <CheckCircle2 size={16} /> Best suited for: Old cars, rarely used vehicles, legal compliance.
                    </div>
                </div>
            </div>
          </motion.div>
          
        </motion.div>
      </section>

      {/* 4. Which Policy is Right for Me? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-slate-100">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-[40px] font-extrabold text-[#0F172A] mb-4 md:mb-5 tracking-tight">Which Car Insurance Policy is Right for Me?</h2>
          <div className="w-16 md:w-20 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mb-4 md:mb-6"></div>
          <p className="text-[16px] md:text-[19px] text-slate-600 max-w-3xl mx-auto leading-relaxed px-2">
            Whether you own a new car or an older vehicle, these three questions can help you choose the right type of car insurance coverage.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={slideInLeft}
            className="flex justify-center"
          >
            <div className="relative w-full">
              <div className="absolute inset-0 bg-blue-600 rounded-full transform scale-90 blur-3xl opacity-20 -z-10"></div>
              <img src="https://d2h44aw7l5xdvz.cloudfront.net/assets/car%20front-01-1.svg" alt="Which policy is right" className="w-full max-w-[500px] mx-auto drop-shadow-2xl filter hue-rotate-15" />
            </div>
          </motion.div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
            className="space-y-6"
          >
            {[
              {
                q: "1. Is your car new or old?",
                points: [
                  "New (0–5 years): Go for Comprehensive Insurance",
                  "Older (5+ years): Consider Third-party or OD combo"
                ]
              },
              {
                q: "2. Do you want full protection or just legal compliance?",
                points: [
                  "Full protection: Comprehensive Insurance",
                  "Only legal minimum: Third-party Insurance"
                ]
              },
              {
                q: "3. How often do you drive?",
                points: [
                  "Daily use / commutes: Comprehensive Insurance",
                  "Occasional use: Standalone OD or Third-party"
                ]
              }
            ].map((item, i) => (
                <motion.div key={i} variants={slideInRight} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-4">{item.q}</h3>
                  <ul className="space-y-3">
                    {item.points.map((pt, j) => (
                      <li key={j} className="flex items-center gap-3 text-slate-700 font-medium text-[16px]">
                        <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                          <ChevronRight className="text-blue-600 w-4 h-4" />
                        </div>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. What's Covered */}
      <section className="bg-[#0F172A] py-16 md:py-24 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-blue-600 rounded-full blur-[80px] md:blur-[120px] opacity-20 transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-orange-500 rounded-full blur-[80px] md:blur-[120px] opacity-10 transform -translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-[40px] font-extrabold text-white mb-4 md:mb-5 tracking-tight">What's Covered in LMB Car Insurance?</h2>
            <div className="w-16 md:w-20 h-1.5 bg-orange-500 rounded-full mx-auto mb-4 md:mb-6"></div>
            <p className="text-[16px] md:text-[19px] text-slate-300 max-w-4xl mx-auto leading-relaxed px-2">
              LMB Car Insurance provides protection under Comprehensive, Own Damage, Third-party Liability, and Personal Accident Cover.
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                img: "https://d2h44aw7l5xdvz.cloudfront.net/assets/img/hatchback-damaged-driving.svg",
                title: "Accidental Damage",
                desc: "We cover damages resulting from road accidents and collisions, whether it's a small dent or major structural damage."
              },
              {
                img: "https://d2h44aw7l5xdvz.cloudfront.net/assets/img/banged-cars.svg",
                title: "Third-party Property Damage",
                desc: "If your vehicle causes injury, damage, or loss to another person or property, we cover your legal and financial liabilities."
              },
              {
                img: "https://d2h44aw7l5xdvz.cloudfront.net/assets/img/getaway-car.svg",
                title: "Protection Against Theft",
                desc: "If your car is stolen and cannot be recovered, we compensate you for the loss based on your policy terms."
              },
              {
                img: "https://d2h44aw7l5xdvz.cloudfront.net/direct-portal/homepage/care-got-fire.svg",
                title: "Damage Due to Fire",
                desc: "We provide coverage for damages caused by fire, self-ignition, explosion, or lightning."
              },
              {
                img: "https://d2h44aw7l5xdvz.cloudfront.net/direct-portal/homepage/natural_disaster.svg",
                title: "Natural Disasters",
                desc: "Your car is protected against damages caused by natural calamities such as floods, earthquakes, cyclones, and landslides."
              },
              {
                img: "https://d2h44aw7l5xdvz.cloudfront.net/assets/img/man-with-hand-injured.svg",
                title: "Personal Accident Cover",
                desc: "This provides a mandatory sum insured for the owner-driver in case of accidental death or permanent total disability."
              }
            ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[1.5rem] p-8 flex flex-col text-left hover:bg-white/15 transition-all duration-300 shadow-xl group">
                  <div className="h-20 flex items-center justify-start mb-6">
                     <img src={item.img} alt={item.title} className="h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 leading-tight">{item.title}</h3>
                  <p className="text-slate-300 leading-relaxed font-medium">{item.desc}</p>
                </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. Frequently Asked Questions */}
      <section className="bg-slate-50 py-16 md:py-24 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-[40px] font-extrabold text-[#0F172A] mb-4 md:mb-5 tracking-tight">Frequently Asked Questions</h2>
            <div className="w-16 md:w-20 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto"></div>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="space-y-3 md:space-y-4">
            {[
              { q: "Is third-party insurance mandatory in India?", a: "Yes, under the Motor Vehicles Act of 1988, it is legally mandatory to have at least a third-party car insurance policy to drive on Indian roads." },
              { q: "What happens if I don't renew my policy on time?", a: "If your policy expires, you lose your No Claim Bonus (NCB) after 90 days. Moreover, your car may require an inspection before a new policy is issued, and driving without insurance is a punishable offense." },
              { q: "Can I transfer my No Claim Bonus (NCB) to a new car?", a: "Yes, the NCB is tied to the policyholder, not the car. If you sell your old car and buy a new one, you can easily transfer your accumulated NCB to the new insurance policy." },
              { q: "What is a Zero Depreciation add-on?", a: "Normally, insurers deduct depreciation on replaced car parts during a claim. A Zero Depreciation cover ensures you get the full claim amount without any deductions for the depreciated value of parts." }
            ].map((faq, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp} 
                className="bg-white rounded-[1rem] shadow-sm border border-slate-200 border-l-[4px] border-l-orange-500 hover:shadow-md transition-all overflow-hidden"
              >
                <button 
                  onClick={() => toggleFaq(i)}
                  className="w-full text-left py-4 px-5 md:py-5 md:px-6 flex justify-between items-center focus:outline-none"
                >
                  <h3 className="text-[15px] md:text-[17px] font-semibold text-[#0F172A] pr-4">
                    {faq.q}
                  </h3>
                  <motion.div 
                    animate={{ rotate: openFaqIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 text-slate-400"
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openFaqIndex === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-5 pt-0 text-slate-600 font-medium leading-relaxed text-[14px] md:text-[15px]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
    </div>
  );
}
