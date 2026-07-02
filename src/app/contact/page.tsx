import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { createPageMetadata, PageHero } from "@/components/layout/PageHero";
import { FadeIn } from "@/components/motion/FadeIn";
import { ContactForm } from "@/components/sections/ContactForm";
import { contactInfo } from "@/lib/content/company";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact LMB Insurance Brokers for insurance advisory, placement, and risk management inquiries.",
  path: "/contact",
});

const contactDetails = [
  { icon: Phone, label: "Phone", value: contactInfo.phone },
  { icon: Phone, label: "Alternate", value: contactInfo.phoneSecondary },
  { icon: Mail, label: "Email", value: contactInfo.email },
  { icon: MapPin, label: "Office", value: contactInfo.address },
  { icon: Clock, label: "Hours", value: contactInfo.hours },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Speak with our advisory team"
        description="Submit an inquiry and our team will respond during business hours."
      />

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <FadeIn>
                <div className="space-y-6">
                  {contactDetails.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-start gap-4">
                        <div className="rounded-xl border border-border bg-card p-3">
                          <Icon className="h-5 w-5 text-cyan" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                            {item.label}
                          </p>
                          <p className="mt-1 text-sm text-muted-light">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </FadeIn>

              <FadeIn delay={0.15} className="mt-10">
                <div className="aspect-video overflow-hidden rounded-2xl border border-border bg-surface">
                  <div className="flex h-full items-center justify-center text-sm text-muted">
                    (Map placeholder — Content Required from Client)
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
