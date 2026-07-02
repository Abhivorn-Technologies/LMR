import {
  Building2,
  Fuel,
  Ship,
  Plane,
  Globe,
  type LucideIcon,
} from "lucide-react";

export interface Industry {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  coverageAreas: string[];
}

export const industries: Industry[] = [
  {
    id: "construction",
    title: "Construction & Infrastructure",
    description:
      "Insurance programs for contractors, developers, and infrastructure projects — covering project phases, third-party liability, and equipment exposure.",
    icon: Building2,
    coverageAreas: [
      "Contract works and project insurance",
      "Contractor liability",
      "Plant and machinery",
      "Delay in start-up (DSU)",
    ],
  },
  {
    id: "oil-energy",
    title: "Oil & Energy",
    description:
      "Coverage advisory for upstream, midstream, and energy operations — property, business interruption, and specialty energy risks.",
    icon: Fuel,
    coverageAreas: [
      "Energy property and BI",
      "Control of well / operators extra expense",
      "Liability for energy operations",
      "Construction and operational phases",
    ],
  },
  {
    id: "marine",
    title: "Marine",
    description:
      "Hull, cargo, and marine liability programs for shipping, logistics, and port operations.",
    icon: Ship,
    coverageAreas: [
      "Hull and machinery",
      "Cargo and freight",
      "Protection and indemnity (P&I)",
      "Port and terminal liability",
    ],
  },
  {
    id: "aviation",
    title: "Aviation",
    description:
      "Aviation insurance for operators, airports, and aviation service providers — hull, liability, and ground risk.",
    icon: Plane,
    coverageAreas: [
      "Aircraft hull and liability",
      "Airport and ground handling",
      "Aviation products liability",
      "Hangarkeepers liability",
    ],
  },
  {
    id: "travel",
    title: "Travel",
    description:
      "Travel-related insurance programs for tour operators, hospitality groups, and corporate travel portfolios.",
    icon: Globe,
    coverageAreas: [
      "Tour operator liability",
      "Travel accident and medical",
      "Cancellation and curtailment",
      "Corporate travel programs",
    ],
  },
];
