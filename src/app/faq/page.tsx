import { PageHero } from "@/components/layout/PageHero";
import { createPageMetadata } from "@/lib/metadata";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { faqItems } from "@/lib/content/pages";

export const metadata = createPageMetadata({
  title: "FAQ",
  description:
    "Frequently asked questions about LMB Insurance Brokers, services, and engagement process.",
  path: "/faq",
});

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#04151a] text-white relative z-0 overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-0 left-0 w-full h-[600px] z-0 pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-[#00E5FF]/5 blur-[120px]" />
        <div className="absolute top-1/3 -left-1/4 h-[600px] w-[600px] rounded-full bg-[#0c494f]/10 blur-[150px]" />
      </div>

      <PageHero
        eyebrow="FAQ"
        title="Common questions"
        description="Answers to frequently asked questions about our services, process, and how to engage with LMB."
      />

      <section className="pb-24 relative z-10">
        <div className="mx-auto max-w-3xl px-6">
          <FAQAccordion items={faqItems} />
        </div>
      </section>
    </div>
  );
}
