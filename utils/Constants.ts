import { Briefcase,  Building2, Users } from "lucide-react";
import { NavLink, Categories} from "../types/layout.types";
import {

  GraduationCap,
  RefreshCw,
  BookOpen,
  TrendingUp,
  Handshake,
} from "lucide-react";

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

type CoreValueProps = {
  title: string;
  text: string;
  id: number;
  featured: boolean;
};


export const coreValues: CoreValueProps[] = [
  {
    title: "Our Mission",
    text: `Our mission is to make opportunities more accessible and easier to discover 
    for everyone. By bridging the gap between students, graduates, and professionals, 
    we aim to create pathways that support education, employment, and career development
     in Afghanistan.`,
    id: 1,
    featured: false,
  },
  {
    title: "Our Vision",
    text: `We envision a future where every Afghan youth can 
    unlock their potential through equal access to opportunities. Our vision
     is to empower individuals to grow, succeed, and contribute meaningfully to
      their communities and the nation.`,
    id: 2,
    featured: true,
  },
  {
    title: "Our Values",
    text: `We are guided by the values of accessibility, growth, transparency, and community.
     These principles shape how we connect people with opportunities, foster trust, 
    and build a supportive environment that encourages both individual progress and
     collective advancement.`,
    id: 3,
    featured: false,
  },
];

export const CATEGORY_COLORS: Record<string, string> = {
  Job: "#10b981",
  Scholarship: "#3b82f6",
  Internship: "#8b5cf6",
  "Online Course": "#f59e0b",
  "Training Program": "#ec4899",
  "Volunteer Work": "#14b8a6",
};
export const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Job: Briefcase,
  Scholarship: GraduationCap,
  Internship: RefreshCw,
  "Online Course": BookOpen,
  "Training Program": TrendingUp,
  "Volunteer Work": Handshake,
};
export const CHART_COLORS = [
  "#10b981",
  "#3b82f6",
  "#8b5cf6",
  "#f59e0b",
  "#ec4899",
  "#14b8a6",
];
