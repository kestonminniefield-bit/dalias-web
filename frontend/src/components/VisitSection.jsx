import { motion } from "framer-motion";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { BUSINESS } from "../data/business";

export const VisitSection = () => (
  <section id="visit" data-testid="visit-section" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
    <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="md:col-span-5"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-[#D95333]">Come say hi</p>
        <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight text-[#2D2825] sm:text-5xl">
          Right on <span className="italic text-[#D95333]">the corner</span>
        </h2>

        <div className="mt-10 flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#D95333]" />
            <p data-testid="visit-address" className="text-base text-[#2D2825]">{BUSINESS.address}</p>
          </div>
          <div className="flex items-start gap-4">
            <Clock className="mt-1 h-5 w-5 shrink-0 text-[#D95333]" />
            <ul data-testid="visit-hours" className="flex flex-col gap-1.5">
              {BUSINESS.hours.map((h) => (
                <li key={h.days} className="flex gap-4 text-sm text-[#5C534D]">
                  <span className="w-32 font-medium text-[#2D2825]">{h.days}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={BUSINESS.phoneHref}
            data-testid="visit-call-button"
            className="flex items-center gap-2 rounded-full bg-[#D95333] px-7 py-3.5 text-sm font-semibold text-[#FFFBF5] transition-transform duration-200 hover:scale-105 hover:bg-[#BD472A] active:scale-95"
          >
            <Phone className="h-4 w-4" />
            {BUSINESS.phone}
          </a>
          <a
            href={BUSINESS.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="visit-directions-button"
            className="flex items-center gap-2 rounded-full border border-[#2D2825]/20 px-7 py-3.5 text-sm font-semibold text-[#2D2825] transition-colors duration-200 hover:border-[#D95333] hover:text-[#D95333]"
          >
            <Navigation className="h-4 w-4" />
            Get directions
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="md:col-span-7"
      >
        <div className="overflow-hidden rounded-2xl border border-[#E8D8C8] shadow-sm">
          <iframe
            title="Map to Dalia's Harlem Cafe"
            data-testid="visit-map"
            src={BUSINESS.mapEmbed}
            className="h-[380px] w-full md:h-[460px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </motion.div>
    </div>
  </section>
);
