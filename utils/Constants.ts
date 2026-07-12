import { Briefcase,  Building2, Users } from "lucide-react";
import { NavLink, Categories} from "../types/layout.types";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "Saved Opportunities", href: "/saved" },
  { label: "Add Opportunity", href: "/add-opportunity" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Contact", href: "/contact" },
    { label: "About", href: "/about" },
];
export const CATEGORIES: Categories[] = [
  { label: "Jobs" },
  { label: "Internship" },
  { label: "Scolarship" },
  { label: "Online Courses" },
  { label: "Training Program" },
  { label: "Volnteer Work" },
  ];

export const STATISTICS=[
  {id: 1, value: "5000+", title: "platform Users", icon: Users  },
  {id: 2, value: "1200+", title: "Shared Opportunities", icon: Briefcase },
  {id: 3, value: "150+", title: "Partner Organization", icon: Building2 }
]