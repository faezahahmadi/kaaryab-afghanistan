"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/utils/Constants";
import { useTheme } from "@/context/ThemeContext";

interface NavLinksProps {
  onLinkClick?: () => void;
  mobile?: boolean;
}

const NavLinks: React.FC<NavLinksProps> = ({ onLinkClick, mobile = false }) => {
  const pathname = usePathname();
  const { isDark } = useTheme();

  return (
    <ul
      className={
        mobile
          ? "flex flex-col gap-6 items-center"
          : "hidden lg:flex items-center gap-8 flex-nowrap"
      }
    >
      {NAV_LINKS.map((link) => {
        const isActive = pathname === link.href;
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onLinkClick}
              className={`relative text-base font-medium whitespace-nowrap 
                transition-colors duration-200 hover:text-brand-600 ${
                  isActive
                    ? "text-primary-600"
                    : isDark
                      ? "text-slate-200"
                      : "text-neutral-700"
                }`}
            >
              {link.label}
              {isActive && !mobile && (
                <span
                  className="absolute -bottom-2 left-0 
                right-0 h-0.5 bg-primary-600 rounded-full"
                />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLinks;
