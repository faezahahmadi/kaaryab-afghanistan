import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { NAV_LINKS, CATEGORIES } from "@/utils/Constants";
import { FooterProps } from "@/types/layout.types";
import SocialIcons from "./SocialIcons";

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-primary-900 pt-16 pb-6 text-white dark:bg-slate-950 dark:text-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
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
            <p className="text-sm leading-relaxed p-2 text-white/70 dark:text-slate-400">
              Helping Afghan youth discover opportunities for education,
              employment, and professional growth.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-5">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base text-white/80 transition-colors hover:text-secondary-300 dark:text-slate-400 dark:hover:text-emerald-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-5">
              Categories
            </h4>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.label}
                  href={`/opportunities?category=${encodeURIComponent(category.label)}`}
                  className="rounded-md border border-secondary-300 px-4 py-2 text-sm text-white/90 transition-colors duration-200 hover:bg-secondary-300 hover:text-white dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-emerald-400"
                >
                  {category.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Contact Info
            </h4>

            <a
              href="mailto:karyaabafghanistan@gmail.com"
              className="flex items-center gap-3 text-white/80 transition hover:text-secondary-300 dark:text-slate-400 dark:hover:text-emerald-400"
            >
              <Mail size={18} className="text-secondary-300" />
              <span className="text-sm">karyaabafghanistan@gmail.com</span>
            </a>

            <div className="flex items-center gap-3 text-white/80 dark:text-slate-400">
              <MapPin size={18} className="text-secondary-300" />
              <span className="text-sm">Worldwide / Remote</span>
            </div>

            <>
              <p className="mt-2 text-sm italic text-white/70 dark:text-slate-500">
                Let&apos;s find the amazing opportunity together.
              </p>
              <SocialIcons />
            </>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-white/60 dark:border-slate-700 dark:text-slate-500">
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
