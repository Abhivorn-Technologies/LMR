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
    <>
      <PageHero
        eyebrow="FAQ"
        title="Common questions"
        description="Answers to frequently asked questions about our services, process, and how to engage with LMB."
      />

      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <FAQAccordion items={faqItems} />
        </div>
      </section>
    </>
  );
}
