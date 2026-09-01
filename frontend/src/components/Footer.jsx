import { Phone } from "lucide-react";
import { BUSINESS } from "../data/business";

export const Footer = () => (
  <footer data-testid="site-footer" className="border-t border-[#E8D8C8] py-14">
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="font-display text-2xl font-semibold tracking-tight text-[#2D2825]">
          Dalia's Harlem <span className="italic text-[#D95333]">Cafe</span>
        </p>
        <p className="mt-3 text-sm text-[#5C534D]">{BUSINESS.address}</p>
        <a href={BUSINESS.phoneHref} data-testid="footer-call-link" className="mt-1 flex items-center gap-2 text-sm text-[#5C534D] transition-colors hover:text-[#D95333]">
          <Phone className="h-3.5 w-3.5" />
          {BUSINESS.phone}
        </a>
      </div>
      <div className="flex flex-col gap-2 text-sm text-[#5C534D] md:items-end">
        <a href={BUSINESS.directionsUrl} target="_blank" rel="noopener noreferrer" data-testid="footer-directions-link" className="transition-colors hover:text-[#D95333]">
          Find us on Google Maps
        </a>
        <a href="/menu.html" target="_blank" rel="noopener noreferrer" data-testid="footer-menu-html-link" className="transition-colors hover:text-[#D95333]">
          Printable menu (HTML)
        </a>
        <a href="/admin" data-testid="footer-admin-link" className="text-[#5C534D]/60 transition-colors hover:text-[#D95333]">
          Staff login
        </a>
        <p className="text-xs text-[#5C534D]/50">© {new Date().getFullYear()} {BUSINESS.name}. Made with love on the corner.</p>
      </div>
    </div>
  </footer>
);
