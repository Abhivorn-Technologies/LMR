"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Building2, 
  ShieldCheck, 
  LineChart, 
  Settings, 
  Lock, 
  Briefcase,
  ArrowRight,
  CheckCircle2,
  HardHat,
  HeartPulse,
  Truck
} from "lucide-react";

// --- ANIMATION VARIANTS ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const DEFAULT_FLOATING_ITEMS = ['Enterprise Risk', 'Operational Risk', 'Financial Risk', 'Compliance', 'Insurance Advisory'];

const DEFAULT_SERVICES = [
  { title: "Enterprise Risk Assessment", desc: "Identify strategic, financial, and operational risks affecting business growth." },
  { title: "Operational Risk Management", desc: "Improve operational resilience and minimize business disruptions." },
  { title: "Financial Risk Analysis", desc: "Protect businesses against market, credit, and liquidity risks." },
  { title: "Cyber Risk Assessment", desc: "Evaluate cyber threats and improve digital security strategies." },
  { title: "Regulatory & Compliance Risk", desc: "Support businesses in meeting industry regulations and compliance standards." },
  { title: "Insurance Risk Advisory", desc: "Recommend insurance strategies aligned with business risks." }
];

const DEFAULT_STEPS = [
  { num: "01", title: "Identify Risks" },
  { num: "02", title: "Risk Assessment" },
  { num: "03", title: "Risk Prioritization" },
  { num: "04", title: "Mitigation Strategy" },
  { num: "05", title: "Monitoring" }
];

const DEFAULT_INDUSTRIES = [
  { title: "Manufacturing", img: "/assets/image1.jpeg" },
  { title: "Construction", img: "/assets/image5.jpeg" },
  { title: "Healthcare", img: "/assets/image6.jpeg" },
  { title: "Logistics", img: "/assets/image1.jpeg" }
];

const DEFAULT_REASONS = [
  "Experienced Risk Consultants",
  "Customized Risk Strategies",
  "Industry Expertise",
  "Regulatory Compliance Support",
  "Data-Driven Risk Insights",
  "End-to-End Insurance Advisory"
];

const DEFAULT_STATS = [
  { val: "250+", lbl: "Corporate Clients" },
  { val: "98%", lbl: "Client Satisfaction" },
  { val: "20+", lbl: "Industry Sectors" },
  { val: "15+", lbl: "Years Expertise" }
];

const serviceIcons = [Building2, Settings, LineChart, Lock, ShieldCheck, Briefcase];
const stepIcons = [LineChart, Settings, ShieldCheck, Briefcase, Building2];
const industryIcons = [Settings, HardHat, HeartPulse, Truck];

export function RiskManagementBlock({ content }: { content?: any }) {
  const c = content || {};

  const tagline = c.tagline || "Strategic Advisory";
  const title = c.title || "Risk Management";
  const highlightTitle = c.highlightTitle || "Solutions";
  const description = c.description || "Helping businesses identify, assess, reduce, and manage risks before they become costly problems. Protect your enterprise with intelligent, data-driven foresight.";
  const buttonText = c.buttonText || "Contact Experts";
  const floatingItems = c.floatingItems || DEFAULT_FLOATING_ITEMS;

  const servicesTitle = c.servicesTitle || "Our Risk Management Services";
  const servicesSubtitle = c.servicesSubtitle || "Comprehensive solutions designed to safeguard your enterprise from every angle, delivering resilience in an unpredictable world.";
  const servicesList = c.servicesList || DEFAULT_SERVICES;

  const processTitle = c.processTitle || "Our Risk Management Process";
  const processSteps = c.processSteps || DEFAULT_STEPS;

  const industriesTitle = c.industriesTitle || "Industries We Serve";
  const industriesSubtitle = c.industriesSubtitle || "Tailored risk management frameworks engineered specifically for the unique vulnerabilities of your sector.";
  const industriesList = c.industriesList || DEFAULT_INDUSTRIES;

  const whyTitle = c.whyTitle || "Why Businesses Trust LMB";
  const reasons = c.reasons || DEFAULT_REASONS;
  const stats = c.stats || DEFAULT_STATS;

  const ctaTitle = c.ctaTitle || "Need expert guidance to protect your business?";
  const ctaButtonText = c.ctaButtonText || "Talk to Our Risk Experts";

  return (
    <div className="w-full bg-white selection:bg-[#19C8D6] selection:text-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900 pt-20">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/image6.jpeg" 
            alt="Risk Management"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#19C8D6]/10 border border-[#19C8D6]/20 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#19C8D6] animate-pulse" />
              <span className="text-sm font-semibold tracking-wider text-[#19C8D6] uppercase">{tagline}</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
              {title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#19C8D6] to-[#0E6D73]">{highlightTitle}</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 font-medium">
              {description}
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl backdrop-blur-md border border-white/10 transition-all duration-300 hover:-translate-y-1">
                {buttonText}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:flex flex-col gap-4 relative ml-auto"
          >
            {floatingItems.map((item: string, idx: number) => (
              <motion.div 
                key={item}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + (idx * 0.1), type: "spring", stiffness: 100 }}
                className={`flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-xl w-64 ${idx % 2 === 0 ? '-ml-12' : 'ml-0'}`}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#19C8D6]/20 text-[#19C8D6]">
                  <CheckCircle2 size={20} />
                </div>
                <span className="text-white font-semibold">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-[#0E6D73] mb-6 tracking-tight">
              {servicesTitle}
            </motion.h2>
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-lg text-slate-600 font-medium">
              {servicesSubtitle}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((srv: any, i: number) => {
              const IconComp = serviceIcons[i % serviceIcons.length];
              return (
                <motion.div 
                  key={srv.title || i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl hover:border-[#19C8D6]/30 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#19C8D6]/5 rounded-bl-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-150" />
                  
                  <div className="w-14 h-14 rounded-2xl bg-[#0E6D73]/5 flex items-center justify-center mb-6 group-hover:bg-[#0E6D73] transition-colors duration-500">
                    <IconComp size={28} className="text-[#0E6D73] group-hover:text-[#19C8D6] transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#0E6D73] transition-colors duration-300">
                    {srv.title}
                  </h3>
                  
                  <p className="text-slate-500 leading-relaxed font-medium">
                    {srv.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-20">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-[#0E6D73] mb-6 tracking-tight">
              {processTitle}
            </motion.h2>
          </div>

          <div className="relative flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-4">
            <div className="hidden md:block absolute top-[45px] left-[5%] w-[90%] h-[2px] bg-slate-100 z-0">
              <div className="h-full bg-gradient-to-r from-[#19C8D6] to-[#0E6D73] w-full origin-left scale-x-0 animate-[scaleX_1.5s_ease-out_forwards]" style={{ animationTimeline: 'view()' }} />
            </div>

            {processSteps.map((step: any, i: number) => {
              const StepIcon = stepIcons[i % stepIcons.length];
              return (
                <motion.div 
                  key={step.num || i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="relative z-10 flex flex-col items-center text-center w-full md:w-1/5 group"
                >
                  <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-50 shadow-xl flex items-center justify-center mb-6 relative group-hover:-translate-y-2 group-hover:border-[#19C8D6]/30 transition-all duration-300">
                    <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#0E6D73] text-white flex items-center justify-center text-sm font-bold shadow-md">
                      {step.num || `0${i+1}`}
                    </span>
                    <StepIcon size={32} className="text-[#0E6D73] group-hover:text-[#19C8D6] transition-colors" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-800">{step.title}</h4>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                {industriesTitle}
              </motion.h2>
              <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-lg text-slate-400 font-medium">
                {industriesSubtitle}
              </motion.p>
            </div>
            <Link href="/industries" className="shrink-0 flex items-center gap-2 text-[#19C8D6] font-bold hover:text-white transition-colors">
              View All Industries <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industriesList.map((ind: any, i: number) => {
              const IndIcon = industryIcons[i % industryIcons.length];
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer"
                >
                  <Image src={ind.img || "/assets/image1.jpeg"} alt={ind.title || "Industry"} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E6D73]/90 via-[#0E6D73]/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 border border-white/30">
                        <IndIcon size={24} className="text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{ind.title}</h3>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex items-center gap-2 text-sm text-[#19C8D6] font-semibold">
                        Learn More <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 mb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border-[8px] border-slate-50"
            >
              <Image src="/assets/image6.jpeg" alt="Corporate Meeting" fill className="object-cover" />
            </motion.div>

            <div>
              <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-[#0E6D73] mb-10 tracking-tight">
                {whyTitle}
              </motion.h2>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-12">
                {reasons.map((r: string, i: number) => (
                  <motion.div 
                    key={r}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="text-[#19C8D6] shrink-0 mt-0.5" size={24} />
                    <span className="font-semibold text-slate-700">{r}</span>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-slate-100">
                {stats.map((stat: any, i: number) => (
                  <motion.div key={stat.lbl || i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <div className="text-3xl font-black text-[#0E6D73] mb-1">{stat.val}</div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.lbl}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden bg-[#0E6D73] shadow-2xl"
          >
            <div className="absolute inset-0">
              <Image src="/assets/image5.jpeg" alt="CTA Background" fill className="object-cover opacity-20 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0E6D73] to-[#0E6D73]/80" />
            </div>
            
            <div className="relative z-10 p-12 md:p-16 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-8">
              <h3 className="text-3xl md:text-4xl font-extrabold text-white max-w-lg leading-tight">
                {ctaTitle}
              </h3>
              <Link href="/contact" className="shrink-0 px-8 py-5 bg-white text-[#0E6D73] font-bold rounded-2xl hover:bg-[#19C8D6] hover:text-slate-900 transition-colors shadow-xl text-lg">
                {ctaButtonText}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
