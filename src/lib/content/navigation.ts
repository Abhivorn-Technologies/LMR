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
  company: [
    { label: "About", href: "/about" },
    { label: "Leadership", href: "/leadership" },
    { label: "Careers", href: "/careers" },
    { label: "Why LMB", href: "/why-lmb" },
  ],
  services: [
    { label: "General Insurance", href: "/services#general-insurance" },
    { label: "Reinsurance", href: "/reinsurance" },
    { label: "Life Insurance", href: "/services#life-insurance" },
    { label: "Risk Management", href: "/services#risk-management" },
    { label: "Consulting", href: "/services#consulting" },
  ],
  resources: [
    { label: "Resources", href: "/resources" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
  ],
} as const;
