import { Phone, Mail } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
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
    <>
      <PageHero
        eyebrow="Contact"
        title="Speak with our advisory team"
        description="Submit an inquiry and our team will respond during business hours."
        align="center"
      />

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-5 relative z-10 -mt-12">
            <div className="lg:col-span-2">
              <ScrollReveal direction="left">
                <div className="rounded-[2rem] border border-white/5 bg-[#0a2b33] p-8 md:p-10 shadow-2xl h-[700px] flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#00E5FF]/10 blur-[60px] pointer-events-none" />
                  
                  <h2 className="text-3xl font-display font-bold text-white mb-8 relative z-10">
                    Key Contacts
                  </h2>

                  <div className="space-y-8 relative z-10 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    {keyContacts.map((contact) => (
                      <div key={contact.name} className="group border-b border-white/10 pb-6 last:border-0 last:pb-0">
                        <p className="text-lg font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                          {contact.name}
                        </p>
                        <p className="text-sm font-medium text-[#00B4D8] mb-4">
                          {contact.title}
                        </p>
                        
                        <div className="space-y-3">
                          <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/20 border border-white/5 group-hover:border-[#00E5FF]/30 transition-colors">
                              <Phone className="h-4 w-4 text-[#00E5FF]" />
                            </div>
                            {contact.phone}
                          </a>
                          <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/20 border border-white/5 group-hover:border-[#00E5FF]/30 transition-colors">
                              <Mail className="h-4 w-4 text-[#00E5FF]" />
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
              <ScrollReveal direction="right" delay={0.1}>
                <ContactForm />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
