export interface NavLink {
  label: string;
  href: string;
}

export type FooterVariant = "simple" | "newsletter";

export interface FooterProps {
  variant?: FooterVariant;
}

export interface Categories {
  label: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}