import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu as MenuIcon, X } from "lucide-react";
import { BUSINESS, IMAGES } from "../data/business";

const LINKS = [
  { label: "Menu", href: "/menu" },
  { label: "Visit", href: "/#visit" },
  { label: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header
      data-testid="site-header"
      className="fixed top-0 left-0 right-0 z-50 border-b border-[#E8D8C8] bg-[#FFFBF5]/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" data-testid="nav-logo" className="flex items-center">
          <img src={IMAGES.logo} alt="Dalia's Harlem Cafe" className="h-10 w-auto md:h-12" />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-testid={`nav-link-${link.label.toLowerCase()}`}
              className="text-sm font-medium text-[#5C534D] transition-colors duration-200 hover:text-[#D95333]"
            >
              {link.label}
            </a>
          ))}
          <a
            href={BUSINESS.phoneHref}
            data-testid="nav-call-button"
            className="flex items-center gap-2 rounded-full bg-[#D95333] px-5 py-2.5 text-sm font-semibold text-[#FFFBF5] transition-transform duration-200 hover:scale-105 hover:bg-[#BD472A] active:scale-95"
          >
            <Phone className="h-4 w-4" />
            {BUSINESS.phone}
          </a>
        </nav>

        <button
          data-testid="nav-mobile-toggle"
          onClick={() => setOpen(!open)}
          className="rounded-full border border-[#E8D8C8] p-2 text-[#2D2825] md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            data-testid="nav-mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-[#E8D8C8] bg-[#FFFBF5] md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  data-testid={`nav-mobile-link-${link.label.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium text-[#2D2825] transition-colors hover:bg-[#F5EBE1]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={BUSINESS.phoneHref}
                data-testid="nav-mobile-call-button"
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#D95333] px-5 py-3 text-sm font-semibold text-[#FFFBF5]"
              >
                <Phone className="h-4 w-4" />
                Call {BUSINESS.phone}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
