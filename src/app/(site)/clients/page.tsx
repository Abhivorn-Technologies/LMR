import { CompanyLogosMarquee } from "@/components/sections/home/CompanyLogosMarquee";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Our Clients | LMB Insurance Brokers",
  description: "Government departments, PSUs and public corporations we are proud to serve.",
  path: "/clients",
});

export default function ClientsPage() {
  return (
    <main className="min-h-[80vh] bg-white pt-24 md:pt-32 pb-12 flex flex-col justify-center">
      <CompanyLogosMarquee />
    </main>
  );
}
