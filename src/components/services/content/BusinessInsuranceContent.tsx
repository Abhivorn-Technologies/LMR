"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { CheckCircle2, ShieldAlert, Zap, FileText, Activity, TrendingUp, ShieldCheck, Users, Briefcase } from "lucide-react";

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

export function BusinessInsuranceContent() {
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
          Comprehensive Business <span className="text-[#115E59]">Insurance Solutions</span>
        </h2>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed">
          LMB safeguards your enterprise, employees, and assets against unforeseen risks. We offer tailored policies including Workmen Compensation, Contractors All Risk, and Plant & Machinery Insurance to ensure your business operations remain secure and legally compliant.
        </p>
      </motion.div>

      {/* Premium Bento Box Intro */}
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00B4D8]/5 rounded-full blur-[80px] pointer-events-none -z-10" />
        
        {/* Left Column */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-7 p-6 md:p-10 lg:p-12 rounded-[2rem] lg:rounded-[3rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden flex flex-col justify-between group">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#115E59]/5 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 group-hover:bg-[#115E59]/10 transition-colors duration-700" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-5 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#115E59] to-[#04151a] flex items-center justify-center text-white shadow-lg shadow-[#115E59]/30 flex-shrink-0">
                <Users size={28} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#04151a]">Workmen Compensation Insurance</h2>
            </div>
            <div className="space-y-6">
              <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                Workmen’s Compensation Insurance (also known as Workers' compensation insurance or Employees Compensation Insurance) is a type of policy that provides coverage for your business’s employees who are injured or become disabled as a result of their jobs.
              </p>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                Even with preventive measures, workplace accidents can occur. Having this insurance provides your employees with compensation without leaving your business at a financial loss. It is set out under the Workmen's Compensation Insurance Act, 1923.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-[#00B4D8]/5 border border-[#00B4D8]/20 rounded-2xl relative z-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="w-10 h-10 rounded-full bg-[#00B4D8]/20 flex items-center justify-center text-[#00B4D8] flex-shrink-0">
              <ShieldAlert size={20} />
            </div>
            <p className="text-[#008ba8] font-medium leading-relaxed text-base">
              <strong className="text-[#00708a]">Mandatory Requirement:</strong> It is mandatory for employers (especially manufacturing units) with more than 20 employees as per the Employees' State Insurance Act, 1948.
            </p>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="lg:col-span-5 p-6 md:p-10 lg:p-12 rounded-[2rem] lg:rounded-[3rem] bg-[#04151a] text-white relative overflow-hidden flex flex-col justify-center">
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#00B4D8]/10 blur-[80px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/3" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-[#00B4D8]">
                <Activity size={24} />
              </div>
              What does it Cover?
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8 text-base md:text-lg">
              Protect your business and employees from severe financial consequences following workplace incidents.
            </p>
            
            <div className="space-y-4">
              {[
                { title: "Accidental Injury", desc: "Bodily injury due to accidents during the course of employment." },
                { title: "Disability & Death", desc: "Covers temporary/permanent disabilities and provides death benefits." },
                { title: "Medical Coverage", desc: "Covers expenses from treating work-related injuries or illnesses." }
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
          <h2 className="text-3xl md:text-4xl font-bold text-[#04151a] mb-4">LMB's Core Business Insurance Plans</h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            Explore our specialized plans designed to cover specific risks in the construction, manufacturing, and corporate sectors.
          </p>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          {[
            { 
              id: "workmen", 
              label: "Workmen Compensation Insurance",
              icon: Users,
              content: (
                <div className="space-y-4">
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                    Protects your employees in case of any injury or illness that is a result of their job, helping them recover and get back to work while limiting your business’s exposure to civil lawsuits.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                      <h4 className="font-bold text-emerald-700 text-lg mb-3 flex items-center gap-2"><CheckCircle2 size={20}/> It covers:</h4>
                      <ul className="space-y-2 text-slate-600 font-medium text-base">
                        <li>• Accidental Injury & Occupational Illness</li>
                        <li>• Temporary & Permanent Disabilities</li>
                        <li>• Death Benefits & Funeral Costs</li>
                      </ul>
                    </div>
                    <div className="p-6 bg-rose-50 rounded-2xl border border-rose-100">
                      <h4 className="font-bold text-rose-700 text-lg mb-3 flex items-center gap-2"><ShieldAlert size={20}/> Exclusions:</h4>
                      <ul className="space-y-2 text-slate-600 font-medium text-base">
                        <li>• Injuries under the influence of drugs/alcohol</li>
                        <li>• Willful disregard of safety rules/devices</li>
                        <li>• Disablement lasting less than 3 days</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            },
            { 
              id: "contractors_all_risk", 
              label: "Contractors' All Risks Insurance",
              icon: ShieldCheck,
              content: (
                <div className="space-y-4">
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                    Contractors' All Risks (CAR) is an all-risk policy with specific exclusions that provides coverage for damage to property and / or third-party property and bodily injury claims. It can be availed by the Principal or Contractor.
                  </p>
                  <div className="mt-6 p-6 bg-[#115E59]/5 rounded-2xl border border-[#115E59]/10">
                    <h4 className="font-bold text-[#115E59] text-lg mb-3">Key Coverages:</h4>
                    <ul className="space-y-2 text-slate-700 font-medium text-base">
                      <li className="flex items-center gap-3"><CheckCircle2 className="text-[#115E59] w-5 h-5"/> <strong>Material Damage:</strong> Covers clearance & debris removal costs.</li>
                      <li className="flex items-center gap-3"><CheckCircle2 className="text-[#115E59] w-5 h-5"/> <strong>Third-Party Liability:</strong> Protects against legal claims for property damage or injury.</li>
                      <li className="flex items-center gap-3"><CheckCircle2 className="text-[#115E59] w-5 h-5"/> <strong>Comprehensive Cover:</strong> For projects where civil works exceed 50% of value.</li>
                    </ul>
                  </div>
                  <p className="text-sm text-slate-500 mt-4">* Excludes faulty design, wear and tear, defective material, and terrorism.</p>
                </div>
              )
            },
            { 
              id: "cpm", 
              label: "Contractors' Plant & Machinery Insurance",
              icon: Briefcase,
              content: (
                <div className="space-y-4">
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                    Designed to cover contractors’ plant and machinery working at construction sites like dumpers, excavators, rollers, and drilling machines. It protects your massive investments from any probable damage.
                  </p>
                  <div className="mt-6 p-6 bg-[#00B4D8]/5 rounded-2xl border border-[#00B4D8]/10">
                    <h4 className="font-bold text-[#008ba8] text-lg mb-3">Coverage Details:</h4>
                    <ul className="space-y-2 text-slate-700 font-medium text-base">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="text-[#008ba8] w-5 h-5 mt-0.5 flex-shrink-0"/> 
                        <span><strong>Loss or Damage:</strong> Expenses incurred due to accidents, fire, riots, floods, and storms.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="text-[#008ba8] w-5 h-5 mt-0.5 flex-shrink-0"/> 
                        <span><strong>At Work or Rest:</strong> Covers the insured property whether it gets damaged at work, at rest, or during maintenance.</span>
                      </li>
                    </ul>
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

      {/* Factors Impacting Premium List */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
      >
        <div className="text-center mb-10 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#04151a] mb-4">How are LMB Business Premiums Calculated?</h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            Several critical factors influence your insurance premium depending on your business type and risk profile.
          </p>
        </div>
        
        <motion.div variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-x-12 lg:gap-y-16 max-w-7xl mx-auto">
          {[
            { icon: FileText, title: "Nature of Operations", desc: "A factory environment poses more risk to employees than an office, resulting in different premium calculations." },
            { icon: Activity, title: "Sum Insured & Wages", desc: "Estimated completed project value, types of machinery, and total employee salaries directly impact the cost." },
            { icon: ShieldAlert, title: "Location & Risks", desc: "Operating in areas prone to natural disasters or high-risk construction zones can increase premium rates." },
            { icon: Zap, title: "Safety Standards", desc: "Ensuring proper safety precautions and protocols at the worksite can help bring down the premium." },
            { icon: TrendingUp, title: "Type of Machinery", desc: "Expensive construction equipment requires higher coverage, impacting the Plant & Machinery policy premium." },
            { icon: ShieldCheck, title: "Past Claims History", desc: "A history of frequent claims against the business can influence the underwriting of future policies." }
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

      {/* Target Audiences / Who Should Buy */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
        className="relative overflow-hidden pt-10"
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#115E59]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00B4D8]/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 mb-10 lg:mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#04151a]">Who Needs These Policies?</h2>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            LMB's corporate insurance solutions are crucial for various stakeholders in the corporate and construction sectors.
          </p>
        </div>

        <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 max-w-6xl mx-auto">
          {[
            { title: "Construction Companies", icon: Activity, desc: "Firms handling large projects that require CAR insurance and protection for heavy machinery." },
            { title: "Property Owners", icon: TrendingUp, desc: "Owners initiating construction can buy the CAR policy to ensure the overall project is protected." },
            { title: "Finance Companies", icon: Zap, desc: "Banks and institutions investing in large projects secure their investment through these policies." },
            { title: "Large Employers", icon: Users, desc: "IT firms, consulting companies, and businesses with large workforces needing Workmen Compensation." },
            { title: "Contractors & Subcontractors", icon: Briefcase, desc: "Teams deploying workers and operating leased or owned heavy machinery at the project site." },
            { title: "Logistics Businesses", icon: FileText, desc: "Labor-intensive operations and transport businesses requiring comprehensive employee protection." }
          ].map((item, i) => (
            <motion.div key={i} variants={fadeInUp} className="group flex flex-col items-center text-center p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2rem] bg-white border-2 border-slate-100 transition-all duration-500 shadow-sm shadow-slate-200/40 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#115E59]/20 hover:border-[#115E59] cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#115E59] mb-5 group-hover:scale-110 group-hover:bg-[#115E59] group-hover:text-white transition-all duration-500 group-hover:shadow-md group-hover:shadow-[#115E59]/30">
                <item.icon size={28} />
              </div>
              <h4 className="text-[#04151a] group-hover:text-[#115E59] font-bold text-lg lg:text-xl mb-3 transition-colors duration-500">{item.title}</h4>
              <p className="text-slate-600 text-sm lg:text-base leading-relaxed transition-colors duration-500">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
