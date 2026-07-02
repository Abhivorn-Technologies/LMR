import { PageHero } from "@/components/layout/PageHero";
import { createPageMetadata } from "@/lib/metadata";
import { FadeIn } from "@/components/motion/FadeIn";
import { Card } from "@/components/ui/Card";
export const metadata = createPageMetadata({
  title: "Leadership",
  description: "Leadership team at LMB Insurance Brokers.",
  path: "/leadership",
});

export default function LeadershipPage() {
  return (
    <div className="min-h-screen bg-[#04151a] text-white relative z-0 overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-0 left-0 w-full h-[600px] z-0 pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-[#00E5FF]/5 blur-[120px]" />
        <div className="absolute top-1/3 -left-1/4 h-[600px] w-[600px] rounded-full bg-[#0c494f]/10 blur-[150px]" />
      </div>

      <PageHero
        eyebrow="Leadership"
        title="Experienced insurance professionals"
        description="LMB is led by practitioners with deep experience across insurance broking, underwriting, and risk management."
      />

      <section className="pb-24 relative z-10">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <Card className="text-center bg-white/[0.02] border-white/10 hover:border-cyan/30 p-12">
              <p className="text-[#c4e0e6] font-medium text-lg">
                (Content Required from Client — leadership profiles, names,
                titles, photographs, and biographies)
              </p>
            </Card>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
