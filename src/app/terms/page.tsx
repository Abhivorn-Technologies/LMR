import { createPageMetadata, PageHero } from "@/components/layout/PageHero";
import { FadeIn } from "@/components/motion/FadeIn";
import { siteConfig } from "@/lib/content/company";

export const metadata = createPageMetadata({
  title: "Terms of Use",
  description: `Terms of use for ${siteConfig.name}.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Use" />

      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <div className="space-y-6 text-sm leading-relaxed text-muted-light">
              <p>
                (Content Required from Client — terms of use drafted by legal
                counsel covering website usage, disclaimers, intellectual
                property, and liability limitations.)
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
