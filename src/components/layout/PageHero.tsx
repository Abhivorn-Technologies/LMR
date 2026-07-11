"use client";

import { motion, Variants } from "framer-motion";

export function PageHero({
  eyebrow,
  title,
  description,
  align = "left",
  theme = "dark",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "dark" | "light" | "navy";
}) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className={`relative overflow-hidden pt-32 pb-12 md:pt-40 md:pb-16 ${theme === "dark" ? "bg-[#04151a]" : theme === "navy" ? "bg-[#0a192f]" : "bg-white"}`}>
      {/* Animated Premium Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {theme === "dark" && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#020b0e] via-[#04151a] to-[#04151a] opacity-90" />
        )}
        <div className={`absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] ${theme === "dark" || theme === "navy" ? "opacity-[0.05]" : "opacity-[0.03] mix-blend-multiply"}`} />
        
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-20 h-[500px] w-[500px] rounded-full bg-[#00B4D8]/20 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 -left-20 h-[400px] w-[400px] rounded-full bg-[#00E5FF]/10 blur-[100px]"
        />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`relative mx-auto max-w-7xl px-6 ${
          align === "center" ? "flex flex-col items-center text-center" : ""
        }`}
      >
        {eyebrow && (
          <motion.p variants={itemVariants} className={`mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] backdrop-blur-md ${
            theme === "dark" || theme === "navy"
              ? "border border-[#00E5FF]/30 bg-[#00B4D8]/10 text-[#00E5FF]" 
              : "border border-[#04151a]/20 bg-[#04151a]/5 text-[#04151a]"
          }`}>
            <span className={`flex h-1.5 w-1.5 rounded-full animate-pulse ${theme === "dark" || theme === "navy" ? "bg-[#00E5FF]" : "bg-[#04151a]"}`} />
            {eyebrow}
          </motion.p>
        )}
        <motion.h1 variants={itemVariants} className={`font-display max-w-4xl text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl xl:text-7xl ${
          theme === "light" ? "text-[#04151a]" : "text-white"
        } ${align === "center" ? "mx-auto" : ""}`}>
          {title}
        </motion.h1>
        {description && (
          <motion.p variants={itemVariants} className={`mt-6 max-w-2xl text-lg leading-relaxed md:text-xl ${
            theme === "light" ? "text-slate-700 font-medium" : "text-slate-300"
          } ${align === "center" ? "mx-auto" : ""}`}>
            {description}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
