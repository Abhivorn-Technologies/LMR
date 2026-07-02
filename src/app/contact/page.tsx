import { Phone, Mail } from "lucide-react";
import { createPageMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact LMB Insurance Brokers for insurance advisory, placement, and risk management inquiries.",
  path: "/contact",
});

const keyContacts = [
  {
    name: "Sreevallabhan S",
    title: "Chairman and Managing Director",
    phone: "+91 9847424144",
    email: "cmd@lmbinsurancebroker.com"
  },
  {
    name: "Jayasree S",
    title: "Principal Officer",
    phone: "+91 9744341440",
    email: "jayasree@lmbinsurancebroker.com"
  },
  {
    name: "Viswanathan Krishnan",
    title: "Executive Director (Reinsurance)",
    phone: "+91 9820317748",
    email: "viswanathan@lmbinsurancebroker.com"
  },
  {
    name: "K. B. Vijayasherakan Nair",
    title: "Executive Director (Underwriting)",
    phone: "+91 9447731159",
    email: "kbv@lmbinsurancebroker.com"
  },
  {
    name: "Vijayakumar T",
    title: "Executive Director (Claims)",
    phone: "+91 9447552135",
    email: "vijayakumar@lmbinsurancebroker.com"
  },
  {
    name: "Thangaraj Koilpillai",
    title: "Executive Director (Reinsurance)",
    phone: "+91 9969341529",
    email: "thangaraj@lmbinsurancebroker.com"
  }
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-[#115E59] selection:text-white pb-24">
      <div className="pt-20">
        <ScrollReveal direction="up">
          <div className="mx-auto max-w-7xl px-6 pt-16 pb-12 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6">
              Speak with our <span className="text-[#115E59] font-serif italic">advisory team.</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
              Submit an inquiry below and our expert team will respond promptly during business hours.
            </p>
          </div>
        </ScrollReveal>
      </div>

      <section>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-5 relative z-10">
            <div className="lg:col-span-2">
              <ScrollReveal direction="left" className="h-full">
                <div className="rounded-[2.5rem] bg-[#115E59] p-10 md:p-12 shadow-2xl h-[700px] flex flex-col relative overflow-hidden group">
                  <div className="absolute top-0 right-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/10 blur-[60px] pointer-events-none" />
                  
                  <h2 className="text-3xl font-bold text-white mb-8 relative z-10 tracking-wide">
                    Key Contacts
                  </h2>

                  <div className="space-y-8 relative z-10 flex-1 overflow-y-auto pr-4 custom-scrollbar">
                    {keyContacts.map((contact) => (
                      <div key={contact.name} className="group/contact border-b border-white/10 pb-6 last:border-0 last:pb-0">
                        <p className="text-lg font-bold text-white group-hover/contact:text-slate-200 transition-colors">
                          {contact.name}
                        </p>
                        <p className="text-sm font-medium text-white/70 mb-4">
                          {contact.title}
                        </p>
                        
                        <div className="space-y-3">
                          <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 border border-white/20 group-hover/contact:bg-white/20 transition-colors">
                              <Phone className="h-4 w-4 text-white" />
                            </div>
                            {contact.phone}
                          </a>
                          <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 border border-white/20 group-hover/contact:bg-white/20 transition-colors">
                              <Mail className="h-4 w-4 text-white" />
                            </div>
                            {contact.email}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-3">
              <ScrollReveal direction="right" delay={0.1} className="h-full">
                <ContactForm />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
