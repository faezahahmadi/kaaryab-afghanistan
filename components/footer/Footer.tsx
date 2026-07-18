"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { NAV_LINKS, CATEGORIES } from "@/utils/Constants";
import { FooterProps } from "@/types/layout.types";
import SocialIcons from "./SocialIcons";
import { useTheme } from "@/context/ThemeContext";

const Footer: React.FC<FooterProps> = () => {
  const { isDark } = useTheme();

  return (
    <footer
      className={`pt-16 pb-6 ${
        isDark ? "bg-slate-950 text-slate-50" : "bg-primary-900 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo + Description + Socials */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/common/navbar-logo.png"
                alt="Karyaab Afghanistan Icon"
                width={150}
                height={150}
                className="h-12 w-12 object-contain"
              />
              <span className="text-xl font-bold">Karyaab Afghanistan</span>
            </Link>
            <p
              className={`text-sm leading-relaxed p-2 ${
                isDark ? "text-slate-400" : "text-white/70"
              }`}
            >
              Helping Afghan youth discover opportunities for education,
              employment, and professional growth.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-5">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`transition-colors text-base ${
                      isDark
                        ? "text-slate-400 hover:text-emerald-400"
                        : "text-white/80 hover:text-secondary-300"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-5">
              Categories
            </h4>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <span
                  key={category.label}
                  className={`px-4 py-2 text-sm rounded-md border transition-colors duration-200 cursor-default ${
                    isDark
                      ? "border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-emerald-400"
                      : "border-secondary-300 text-white/90 hover:bg-secondary-300 hover:text-white"
                  }`}
                >
                  {category.label}
                </span>
              ))}
            </div>
          </div>

          {/* Column 4: Connect / Newsletter */}
          <div className="flex flex-col gap-5">
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Contact Info
            </h4>

            <a
              href="mailto:karyaabafghanistan@gmail.com"
              className={`flex items-center gap-3 transition ${
                isDark
                  ? "text-slate-400 hover:text-emerald-400"
                  : "text-white/80 hover:text-secondary-300"
              }`}
            >
              <Mail size={18} className="text-secondary-300" />
              <span className="text-sm">karyaabafghanistan@gmail.com</span>
            </a>

            <div
              className={`flex items-center gap-3 ${
                isDark ? "text-slate-400" : "text-white/80"
              }`}
            >
              <MapPin size={18} className="text-secondary-300" />
              <span className="text-sm">Worldwide / Remote</span>
            </div>

            <>
              <p
                className={`text-sm italic mt-2 ${
                  isDark ? "text-slate-500" : "text-white/70"
                }`}
              >
                Let&apos;s find the amazing opportunity together.
              </p>
              <SocialIcons />
            </>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div
          className={`border-t mt-12 pt-6 text-center ${
            isDark
              ? "border-slate-700 text-slate-500"
              : "border-white/10 text-white/60"
          }`}
        >
          <p className="text-sm">
            © {new Date().getFullYear()} Karyaab Afghanistan. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
