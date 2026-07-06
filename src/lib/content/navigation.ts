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
  { label: "Claims Consultancy", href: "/services/claims-consultancy" },
  { label: "Reinsurance", href: "/reinsurance" },
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
          children: [
            { label: "Bike Insurance", href: "/services/general-insurance/two-wheeler/bike" },
            { label: "Comprehensive Bike Insurance", href: "/services/general-insurance/two-wheeler/comprehensive" },
            { label: "Third Party Bike Insurance", href: "/services/general-insurance/two-wheeler/third-party" },
            { label: "Electric Bike Insurance", href: "/services/general-insurance/two-wheeler/electric" },
            { label: "Own Damage Bike Insurance", href: "/services/general-insurance/two-wheeler/own-damage" }
          ]
        },
        { label: "Commercial Vehicle Insurance", href: "/services/general-insurance/commercial" },
        { label: "Health Insurance", href: "/services/general-insurance/health" },
        { label: "Home Insurance", href: "/services/general-insurance/home" },
        { label: "Travel Insurance", href: "/services/general-insurance/travel" },
        { label: "Business Insurance", href: "/services/general-insurance/business" }
      ]
    },
    { label: "Life Insurance", href: "/services/life-insurance" },
    { label: "Reinsurance", href: "/services/reinsurance" },
    { label: "Claim Services", href: "/services/claim-services" },
    { label: "Risk Management", href: "/services/risk-management" },
    { label: "Consulting Services", href: "/services/consulting" },
  ],
} as const;
