import React from "react";
import {
  GeneralInsuranceIcon,
  LifeInsuranceIcon,
  ReinsuranceIcon,
  ClaimServicesIcon,
  RiskManagementIcon,
  ConsultingIcon,
} from "@/components/icons/ServiceIcons";

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: React.ElementType;
  image: string;
  href: string;
  features: string[];
  homePoints: string[];
  subServices?: {
    id: string;
    title: string;
    description: string;
    href: string;
  }[];
}

export const services: Service[] = [
  {
    id: "general-insurance",
    title: "General Insurance",
    shortDescription:
      "Property, liability, and commercial coverage placed with leading insurers.",
    description:
      "LMB advises on general insurance programs for businesses — structuring property, liability, and specialty covers aligned to operational exposure and regulatory requirements.",
    icon: GeneralInsuranceIcon,
    image: "/assets/service-2.png",
    href: "/services/general-insurance",
    features: [
      "Property and asset protection",
      "Liability and third-party coverage",
      "Commercial and industrial programs",
      "Policy placement and renewal management",
    ],
    homePoints: [
      "Custom property & liability shields",
      "Robust commercial program structures",
      "Seamless policy renewal management",
    ],
    subServices: [
      {
        id: "car-insurance",
        title: "Car Insurance",
        description: "Comprehensive coverage and third-party protection for your vehicle.",
        href: "/services/general-insurance/car-insurance",
      },
      {
        id: "two-wheeler-insurance",
        title: "Two Wheeler Insurance",
        description: "Complete protection for two-wheelers including own-damage and liability.",
        href: "/services/general-insurance/two-wheeler-insurance",
      },
      {
        id: "commercial-vehicle-insurance",
        title: "Commercial Vehicle Insurance",
        description: "Insurance solutions for commercial fleets and transport vehicles.",
        href: "/services/general-insurance/commercial-vehicle-insurance",
      },
      {
        id: "health-insurance",
        title: "Health Insurance",
        description: "Medical coverage plans tailored for individuals and families.",
        href: "/services/general-insurance/health-insurance",
      },
      {
        id: "home-insurance",
        title: "Home Insurance",
        description: "Protect your home and belongings against theft, fire, and natural disasters.",
        href: "/services/general-insurance/home-insurance",
      },
      {
        id: "travel-insurance",
        title: "Travel Insurance",
        description: "Coverage for medical emergencies, trip cancellations, and lost baggage.",
        href: "/services/general-insurance/travel-insurance",
      },
      {
        id: "business-insurance",
        title: "Business Insurance",
        description: "Comprehensive risk protection for your enterprise and commercial assets.",
        href: "/services/general-insurance/business-insurance",
      }
    ],
  },
  {
    id: "life-insurance",
    title: "Life Insurance",
    shortDescription:
      "Employee benefits and individual life solutions through insurer partnerships.",
    description:
      "Life insurance broking for corporate employee benefit programs and individual coverage — evaluated against insurer strength, terms, and long-term suitability.",
    icon: LifeInsuranceIcon,
    image: "/assets/service-4.png",
    href: "/services/life-insurance",
    features: [
      "Group life and employee benefits",
      "Individual life placement",
      "Insurer evaluation and comparison",
      "Benefit program structuring",
    ],
    homePoints: [
      "Corporate employee benefits",
      "Individual life placement",
      "Comprehensive program structuring",
    ],
  },
  {
    id: "reinsurance",
    title: "Reinsurance",
    shortDescription:
      "Capacity structuring, treaty advisory, and facultative placement support.",
    description:
      "Reinsurance advisory for insurers and large risk holders — treaty design, facultative placement, and capacity strategy to optimize retention and transfer.",
    icon: ReinsuranceIcon,
    image: "/assets/service-7.png",
    href: "/services/reinsurance",
    features: [
      "Treaty and facultative advisory",
      "Capacity and retention strategy",
      "Reinsurer market access",
      "Program review and optimization",
    ],
    homePoints: [
      "Strategic capacity structuring",
      "Global reinsurer market access",
      "Facultative & treaty support",
    ],
  },
  {
    id: "claim-services",
    title: "Claim Services",
    shortDescription:
      "End-to-end claim management and settlement advisory.",
    description:
      "Comprehensive claim handling support from intimation to final settlement, ensuring fair representation, policy compliance, and accelerated recovery.",
    icon: ClaimServicesIcon,
    image: "/assets/service-10.png",
    href: "/services/claim-services",
    features: [
      "Claim preparation and filing",
      "Loss assessment representation",
      "Insurer negotiation and advocacy",
      "Expedited settlement tracking",
    ],
    homePoints: [
      "End-to-end claim management",
      "Aggressive insurer negotiation",
      "Expedited settlement advisory",
    ],
  },
  {
    id: "risk-management",
    title: "Risk Management",
    shortDescription:
      "Identification, assessment, and mitigation advisory across the risk lifecycle.",
    description:
      "Structured risk management services — exposure mapping, control recommendations, and insurance alignment so coverage reflects actual operational risk.",
    icon: RiskManagementIcon,
    image: "/assets/service-5.png",
    href: "/services/risk-management",
    features: [
      "Risk identification and assessment",
      "Loss prevention advisory",
      "Insurance program alignment",
      "Ongoing risk monitoring",
    ],
    homePoints: [
      "Enterprise risk identification",
      "Proactive loss prevention",
      "Continuous exposure monitoring",
    ],
  },
  {
    id: "consulting",
    title: "Consulting Services",
    shortDescription:
      "Claims consulting, policy review, and insurance program advisory.",
    description:
      "Consulting on claims handling, policy interpretation, program audits, and insurance strategy — independent advisory grounded in market and regulatory context.",
    icon: ConsultingIcon,
    image: "/assets/service-6.png",
    href: "/services/consulting",
    features: [
      "Claims consulting and support",
      "Policy and program review",
      "Coverage gap analysis",
      "Regulatory and market advisory",
    ],
    homePoints: [
      "Independent claims consulting",
      "In-depth coverage gap analysis",
      "Strategic market advisory",
    ],
  },
];
