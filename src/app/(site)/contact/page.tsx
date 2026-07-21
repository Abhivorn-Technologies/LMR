import React from "react";
import { createPageMetadata } from "@/lib/metadata";
import { getContent } from "@/services/contentService";
import { BlockRenderer } from "@/components/cms/BlockRenderer";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact LMB Insurance Brokers for insurance advisory, placement, and risk management inquiries.",
  path: "/contact",
});

export default async function ContactPage() {
  const pageData = await getContent('/contact');

  const blocks = pageData?.blocks?.length > 0 ? pageData.blocks : [
    {
      type: 'ContactBlock',
      content: {
        title: "Speak with our",
        highlightTitle: "advisory team.",
        subtitle: "Submit an inquiry below and our expert team will respond promptly during business hours.",
        contactsTitle: "Key Contacts",
        contacts: [
          { name: "Sreevallabhan S", title: "Chairman and Managing Director", phone: "+91 9847424144", email: "cmd@lmbinsurancebroker.com" },
          { name: "Jayasree S", title: "Principal Officer", phone: "+91 9744341440", email: "jayasree@lmbinsurancebroker.com" },
          { name: "Viswanathan Krishnan", title: "Executive Director (Reinsurance)", phone: "+91 9820317748", email: "viswanathan@lmbinsurancebroker.com" },
          { name: "K. B. Vijayasherakan Nair", title: "Executive Director (Underwriting)", phone: "+91 9447731159", email: "kbv@lmbinsurancebroker.com" },
          { name: "Vijayakumar T", title: "Executive Director (Claims)", phone: "+91 9447552135", email: "vijayakumar@lmbinsurancebroker.com" },
          { name: "Thangaraj Koilpillai", title: "Executive Director (Reinsurance)", phone: "+91 9969341529", email: "thangaraj@lmbinsurancebroker.com" }
        ]
      }
    }
  ];

  return (
    <main className="w-full">
      <BlockRenderer blocks={blocks} />
    </main>
  );
}
