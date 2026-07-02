import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-cyan/20 bg-gradient-to-br from-white via-[#f0fbff] to-[#00E5FF]/20 p-10 md:p-16 shadow-[0_20px_60px_-15px_rgba(0,180,216,0.3)]">
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-cyan/20 blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-cyan/10 blur-[80px]" />

            <div className="relative max-w-2xl">
              <h2 className="font-display text-3xl font-bold text-[#04151a] md:text-4xl lg:text-5xl">
                Ready to discuss your insurance requirements?
              </h2>
              <p className="mt-4 text-lg text-slate-700 font-medium">
                Speak with our advisory team about coverage, capacity, or risk
                management for your organization.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-[#04151a] text-white hover:bg-[#082129] hover:shadow-[0_0_20px_rgba(4,21,26,0.3)] border-none ring-0">
                    Contact Us
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/process">
                  <Button variant="secondary" size="lg" className="border-[#04151a]/20 text-[#04151a] hover:bg-[#04151a]/5 hover:text-[#04151a] hover:border-[#04151a]/40">
                    Our Process
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
