import { createPageMetadata, PageHero } from "@/components/layout/PageHero";
import { FadeIn } from "@/components/motion/FadeIn";
import { siteConfig } from "@/lib/content/company";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />

      <section className="pb-24">
        <div className="prose-invert mx-auto max-w-3xl px-6">
          <FadeIn>
            <div className="space-y-6 text-sm leading-relaxed text-muted-light">
              <p>
                (Content Required from Client — privacy policy drafted by legal
                counsel covering data collection, usage, cookies, third-party
                sharing, and user rights under applicable regulations.)
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
