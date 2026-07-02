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
    { label: "Contact Us", href: "/contact" },
  ],
  services: [
    { label: "Our Services", href: "/services" },
    { label: "Reinsurance", href: "/reinsurance" },
  ],
} as const;
