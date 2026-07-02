import {
  Shield,
  RefreshCw,
  Heart,
  LineChart,
  FileSearch,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: LucideIcon;
  href: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: "general-insurance",
    title: "General Insurance",
    shortDescription:
      "Property, liability, and commercial coverage placed with leading insurers.",
    description:
      "LMB advises on general insurance programs for businesses — structuring property, liability, and specialty covers aligned to operational exposure and regulatory requirements.",
    icon: Shield,
    href: "/services#general-insurance",
    features: [
      "Property and asset protection",
      "Liability and third-party coverage",
      "Commercial and industrial programs",
      "Policy placement and renewal management",
    ],
  },
  {
    id: "reinsurance",
    title: "Reinsurance",
    shortDescription:
      "Capacity structuring, treaty advisory, and facultative placement support.",
    description:
      "Reinsurance advisory for insurers and large risk holders — treaty design, facultative placement, and capacity strategy to optimize retention and transfer.",
    icon: RefreshCw,
    href: "/reinsurance",
    features: [
      "Treaty and facultative advisory",
      "Capacity and retention strategy",
      "Reinsurer market access",
      "Program review and optimization",
    ],
  },
  {
    id: "life-insurance",
    title: "Life Insurance",
    shortDescription:
      "Employee benefits and individual life solutions through insurer partnerships.",
    description:
      "Life insurance broking for corporate employee benefit programs and individual coverage — evaluated against insurer strength, terms, and long-term suitability.",
    icon: Heart,
    href: "/services#life-insurance",
    features: [
      "Group life and employee benefits",
      "Individual life placement",
      "Insurer evaluation and comparison",
      "Benefit program structuring",
    ],
  },
  {
    id: "risk-management",
    title: "Risk Management",
    shortDescription:
      "Identification, assessment, and mitigation advisory across the risk lifecycle.",
    description:
      "Structured risk management services — exposure mapping, control recommendations, and insurance alignment so coverage reflects actual operational risk.",
    icon: LineChart,
    href: "/services#risk-management",
    features: [
      "Risk identification and assessment",
      "Loss prevention advisory",
      "Insurance program alignment",
      "Ongoing risk monitoring",
    ],
  },
  {
    id: "consulting",
    title: "Consulting Services",
    shortDescription:
      "Claims consulting, policy review, and insurance program advisory.",
    description:
      "Consulting on claims handling, policy interpretation, program audits, and insurance strategy — independent advisory grounded in market and regulatory context.",
    icon: FileSearch,
    href: "/services#consulting",
    features: [
      "Claims consulting and support",
      "Policy and program review",
      "Coverage gap analysis",
      "Regulatory and market advisory",
    ],
  },
];
