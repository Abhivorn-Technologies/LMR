export type NavChild = { label: string; href: string };
export type NavItem =
  | { label: string; href: string; children?: undefined }
  | { label: string; href: string; children: NavChild[] };

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
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
    { label: "General Insurance", href: "/services/general-insurance" },
    { label: "Life Insurance", href: "/services/life-insurance" },
    { label: "Reinsurance", href: "/services/reinsurance" },
    { label: "Claim Services", href: "/services/claim-services" },
    { label: "Risk Management", href: "/services/risk-management" },
    { label: "Consulting Services", href: "/services/consulting" },
  ],
} as const;
