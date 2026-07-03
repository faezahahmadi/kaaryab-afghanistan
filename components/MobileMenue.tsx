"use client";

import { X } from "lucide-react";
import Link from "next/link";
import NavLinks from "./NavLinks";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded-md hover:bg-neutral-100"
          >
            <X size={24} className="text-neutral-900" />
          </button>
        </div>

        <nav className="px-6 py-4">
          <NavLinks mobile onLinkClick={onClose} />

          <Link
            href="/opportunities"
            onClick={onClose}
            className="mt-8 block text-center bg-cta
             text-white font-semibold py-3 px-6 rounded-full hover:bg-cta-hover transition"
          >
            Explore Opportunities
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default MobileMenu;
