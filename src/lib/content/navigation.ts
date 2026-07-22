export type NavChild = { label: string; href: string };
export type NavItem =
  | { label: string; href: string; children?: undefined }
  | { label: string; href: string; children: NavChild[] };

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Life insurance", href: "/services/life-insurance" },
  { label: "General insurance", href: "/services/general-insurance" },
  { label: "Risk Management", href: "/services/risk-management" },
  { label: "Claims Consultancy", href: "/services/claims" },
  { label: "Reinsurance", href: "/reinsurance" },
  { label: "Clients", href: "/clients" },
  { label: "Contact Us", href: "/contact" },
];

export const footerNavigation = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Our Services", href: "/services" },
    { label: "Reinsurance", href: "/reinsurance" },
    { label: "Contact Us", href: "/contact" },
  ],
  services: [
    { 
      label: "General Insurance", 
      href: "#",
      children: [
        { 
          label: "Car Insurance", 
          href: "#",
          icon: "Car",
          children: [
            { label: "Car Insurance", href: "/services/general-insurance/car" },
            { label: "Comprehensive Car Insurance", href: "/services/general-insurance/car/comprehensive" },
            { label: "Third Party Car Insurance", href: "/services/general-insurance/car/third-party" },
            { label: "Pay as you Drive Car Insurance", href: "/services/general-insurance/car/pay-as-you-drive" },
            { label: "Electric Car Insurance", href: "/services/general-insurance/car/electric" },
            { label: "Own Damage Car Insurance", href: "/services/general-insurance/car/own-damage" }
          ]
        },
        { 
          label: "Two Wheeler Insurance", 
          href: "#",
          icon: "Bike",
          children: [
            { label: "Bike Insurance", href: "/services/general-insurance/two-wheeler/bike" },
            { label: "Comprehensive Bike Insurance", href: "/services/general-insurance/two-wheeler/comprehensive" },
            { label: "Third Party Bike Insurance", href: "/services/general-insurance/two-wheeler/third-party" },
            { label: "Electric Bike Insurance", href: "/services/general-insurance/two-wheeler/electric" },
            { label: "Own Damage Bike Insurance", href: "/services/general-insurance/two-wheeler/own-damage" }
          ]
        },
        { 
          label: "Commercial Vehicle Insurance", 
          href: "#",
          icon: "Truck",
          children: [
            { label: "Commercial Vehicle Insurance", href: "/services/general-insurance/commercial/commercial-vehicle" },
            { label: "Auto Rickshaw Insurance", href: "/services/general-insurance/commercial/auto-rickshaw" },
            { label: "e-Rickshaw Insurance", href: "/services/general-insurance/commercial/e-rickshaw" },
            { label: "Taxi Insurance", href: "/services/general-insurance/commercial/taxi" },
            { label: "Tata Ace Insurance", href: "/services/general-insurance/commercial/tata-ace" },
            { label: "Tractor Insurance", href: "/services/general-insurance/commercial/tractor" },
            { label: "Truck Insurance", href: "/services/general-insurance/commercial/truck" },
            { label: "JCB Insurance", href: "/services/general-insurance/commercial/jcb" }
          ]
        },
        { 
          label: "Health Insurance", 
          href: "#",
          icon: "HeartPulse",
          children: [
            { label: "Health Insurance", href: "/services/general-insurance/health" },
            { label: "Health & Term Insurance Combo", href: "/services/general-insurance/health/combo" },
            { label: "Cashless Health Insurance", href: "/services/general-insurance/health/cashless" },
            { label: "Health Insurance Premium Calculator", href: "/services/general-insurance/health/premium-calculator" },
            { label: "Health Insurance Portability", href: "/services/general-insurance/health/portability" },
            { label: "Super Top Up Health Insurance", href: "/services/general-insurance/health/super-top-up" },
            { label: "Health Insurance for Parents", href: "/services/general-insurance/health/parents" },
            { label: "Group Medical Health Insurance", href: "/services/general-insurance/health/group-medical" },
            { label: "Family Health Insurance", href: "/services/general-insurance/health/family" },
            { label: "Family Floater Health Insurance", href: "/services/general-insurance/health/family-floater" },
            { label: "Senior Citizens Health Insurance", href: "/services/general-insurance/health/senior-citizens" }
          ]
        },
        { 
          label: "Home Insurance", 
          href: "#",
          icon: "Home",
          children: [
            { label: "Bharat Griha Raksha Policy", href: "/services/general-insurance/home/bharat-griha-raksha" },
            { label: "Home Insurance", href: "/services/general-insurance/home" },
            { label: "Home Insurance for Home Loan", href: "/services/general-insurance/home/home-loan" }
          ]
        },
        { 
          label: "Travel Insurance", 
          href: "#",
          icon: "Plane",
          children: [
            { label: "International Travel Insurance", href: "/services/general-insurance/travel/international" },
            { label: "Multi-Trip Travel Insurance", href: "/services/general-insurance/travel/multi-trip" },
            { label: "Schengen Travel Insurance", href: "/services/general-insurance/travel/schengen" },
            { label: "Family Travel Insurance", href: "/services/general-insurance/travel/family" }
          ]
        },
        { 
          label: "Business Insurance", 
          href: "#",
          icon: "Briefcase",
          children: [
            { label: "Workmen Compensation Insurance", href: "/services/general-insurance/business/workmen-compensation" },
            { label: "Contractors All Risk Insurance", href: "/services/general-insurance/business/contractors-all-risk" },
            { label: "Contractors Plant & Machinery Insur", href: "/services/general-insurance/business/contractors-plant-machinery" }
          ]
        }
      ]
    },
    { 
      label: "Life Insurance", 
      href: "#",
      children: [
        { 
          label: "Term Life", 
          href: "#",
          icon: "Shield",
          children: [
            { label: "Term Life Insurance", href: "/services/life-insurance/term/insurance" },
            { label: "Term Insurance Calculator", href: "/services/life-insurance/term/calculator" },
            { label: "1 Crore Term Insurance", href: "/services/life-insurance/term/1-crore" }
          ]
        },
        { 
          label: "Savings Plan", 
          href: "#",
          icon: "PiggyBank",
          children: [
            { label: "Guaranteed Returns Savings Plan", href: "/services/life-insurance/savings/guaranteed-returns" }
          ]
        },
        { 
          label: "Retirement and Pension Plans", 
          href: "#",
          icon: "Coins",
          children: [
            { label: "Retirement and Pension Plans", href: "/services/life-insurance/retirement/plans" },
            { label: "Guaranteed Pension Plan", href: "/services/life-insurance/retirement/guaranteed" }
          ]
        },
        { 
          label: "Group Life Products", 
          href: "#",
          icon: "Users",
          children: [
            { label: "Group Term Life Insurance", href: "/services/life-insurance/group/term" },
            { label: "Group Long Term Plan", href: "/services/life-insurance/group/long-term" },
            { label: "Group Micro Term Life Insurance", href: "/services/life-insurance/group/micro-term" }
          ]
        },
        { 
          label: "Product Documents", 
          href: "#",
          icon: "FileText",
          children: [
            { label: "Policy Documents & Brochures", href: "/services/life-insurance/documents/policy-brochures" },
            { label: "List of Withdrawn Products", href: "/services/life-insurance/documents/withdrawn-products" }
          ]
        }
      ]
    },
    { label: "Reinsurance", href: "/services/reinsurance" },
    { label: "Claim Services", href: "/services/claim-services" },
    { label: "Risk Management", href: "/services/risk-management" },
    { label: "Consulting Services", href: "/services/consulting" },
  ],
} as const;
