import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { NAV_LINKS, CATEGORIES } from "@/utils/Constants";
import { FooterProps } from "@/types/layout.types";
import SocialIcons from "./SocialIcons";

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-primary-900 text-white pt-16 pb-6">
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
              <span className="text-xl font-bold text-white">
                Karyaab Afghanistan
              </span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed p-2">
              Helping Afghan youth discover opportunities for education,
              employment, and professional growth.
            </p>
            <SocialIcons />
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-5 text-white">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-secondary-300 transition-colors text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Skills */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-5 text-white/90">
              Categories
            </h4>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <span
                  key={category.label}
                  className="px-4 py-2 text-sm rounded-md border border-secondary-300 text-white/90
                   hover:bg-secondary-300 hover:text-white transition-colors duration-200 cursor-default"
                >
                  {category.label}
                </span>
              ))}
            </div>
          </div>

          {/* Column 4: Connect / Newsletter */}
          <div className="flex flex-col gap-5">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Connect
            </h4>

            <a
              href="mailto:pixelbridge@gmail.com"
              className="flex items-center gap-3 text-white/80 hover:text-secondary-300 transition"
            >
              <Mail size={18} className="text-secondary-300" />
              <span className="text-sm">karyaabafghanistan@gmail.com</span>
            </a>

            <div className="flex items-center gap-3 text-white/80">
              <MapPin size={18} className="text-secondary-300" />
              <span className="text-sm">Worldwide / Remote</span>
            </div>

            <>
              <p className="text-sm text-white/70 italic mt-2">
                Let&apos;s find the amazing opportunity together.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 
                  w-[268px] h-[48px] bg-cta text-white font-semibold 
                  rounded-[8px] text-[16px] leading-[24px] tracking-[0.01em] 
                  hover:bg-secondary-300  transition-colors duration-200 
                  shadow-lg shadow-black/10"
              >
                Let&apos;s Talk
                <span className="text-lg">→</span>
              </Link>
            </>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Karyaab Afghanistan. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
