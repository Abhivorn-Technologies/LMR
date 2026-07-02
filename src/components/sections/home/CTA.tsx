import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-graphite to-surface p-10 md:p-16">
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-cyan/10 blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-cyan/5 blur-[80px]" />

            <div className="relative max-w-2xl">
              <h2 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                Ready to discuss your insurance requirements?
              </h2>
              <p className="mt-4 text-lg text-muted-light">
                Speak with our advisory team about coverage, capacity, or risk
                management for your organization.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg">
                    Contact Us
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/process">
                  <Button variant="secondary" size="lg">
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
