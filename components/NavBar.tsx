"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import NavLinks from "./NavLinks";
import MobileMenu from "@/components/MobileMenue";

export default function NavBar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white shadow-card">
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
              {/* CTA Button (Desktop) */}
              <Link
                href="/opportunities"
                className="hidden lg:inline-flex items-center justify-center bg-cta
               text-white font-semibold py-3 px-3 rounded-full 
                shadow-button hover:bg-cta-hover transition-all duration-200 text-sm"
              >
                Explore Opportunities
              </Link>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setIsMobileOpen(true)}
                aria-label="Open menu"
                className="lg:hidden p-2 -mr-2 rounded-md hover:bg-neutral-100"
              >
                <Menu size={28} className="text-neutral-900" />
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
