"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Moon, Sun } from "lucide-react";
import NavLinks from "./NavLinks";
import MobileMenu from "@/components/header/MobileMenue";
import { useTheme } from "@/context/ThemeContext";

export default function NavBar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full shadow-card ${isDark ? "bg-slate-900 text-slate-50" : "bg-white text-slate-900"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-15">
            {/* Logo */}
            <div className="flex-1 flex justify-start">
              <Link href="/" className="flex items-center">
                <Image
                  src="/common/navbar-logo.png"
                  alt="Karyaab Afghanistan Logo"
                  width={150}
                  height={150}
                  priority
                  className="h-14 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-1 justify-center">
              <NavLinks />
            </div>

            {/* CTA & Mobile Menu Button */}
            <div className="flex-1 flex justify-end items-center">
                           {/* Mobile Hamburger */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className={`mr-2 rounded-full p-2 transition ${isDark ? "bg-slate-800 hover:bg-slate-700" : "bg-slate-100 hover:bg-slate-200"}`}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button
                onClick={() => setIsMobileOpen(true)}
                aria-label="Open menu"
                className={`lg:hidden p-2 -mr-2 rounded-md ${isDark ? "hover:bg-slate-800" : "hover:bg-neutral-100"}`}
              >
                <Menu
                  size={28}
                  className={isDark ? "text-slate-100" : "text-neutral-900"}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />
    </>
  );
}
