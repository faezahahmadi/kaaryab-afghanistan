"use client";

import { X } from "lucide-react";
import Link from "next/link";
import NavLinks from "./NavLinks";
import { useTheme } from "@/context/ThemeContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();

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
        className={`fixed top-0 right-0 h-full w-72 z-50 shadow-2xl transform transition-transform duration-300 lg:hidden ${
          isDark ? "bg-slate-900 text-slate-50" : "bg-white text-slate-900"
        } ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            aria-label="Close menu"
            className={`p-2 rounded-md ${isDark ? "hover:bg-slate-800" : "hover:bg-neutral-100"}`}
          >
            <X
              size={24}
              className={isDark ? "text-slate-100" : "text-neutral-900"}
            />
          </button>
        </div>

        <nav className="px-6 py-4">
          <NavLinks mobile onLinkClick={onClose} />
        </nav>
      </aside>
    </>
  );
};

export default MobileMenu;
