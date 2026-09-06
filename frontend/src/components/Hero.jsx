import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Phone } from "lucide-react";
import { BUSINESS, IMAGES } from "../data/business";

const LINES = ["Look for the", "pink daisies", "on the block."];

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section id="top" ref={ref} data-testid="hero-section" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-12">
        <motion.div style={{ y: textY }} className="md:col-span-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            data-testid="hero-badge"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#E8D8C8] bg-[#F5EBE1] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#5C534D]"
          >
            <span className="h-2 w-2 rounded-full bg-[#D95333]" />
            Open daily from 8 AM — griddle's hot
          </motion.p>

          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-[#2D2825] sm:text-6xl">
            {LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.2 + i * 0.13, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                >
                  {i === 1 ? (
                    <>
                      <span className="italic text-[#D95333]">pink daisies</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            data-testid="hero-slogan"
            className="font-display mt-6 text-xl italic text-[#D95333] md:text-2xl"
          >
            Your sunny little corner for a homestyle Harlem breakfast.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            data-testid="hero-subtext"
            className="mt-5 max-w-md text-base leading-relaxed text-[#5C534D] md:text-lg"
          >
            Bacon, egg & cheese before the train, coffee that wakes you up kindly,
            and a hot breakfast waiting five minutes after you call it in.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="/menu"
              data-testid="hero-menu-button"
              className="flex items-center gap-2 rounded-full bg-[#D95333] px-7 py-3.5 text-sm font-semibold text-[#FFFBF5] transition-transform duration-200 hover:scale-105 hover:bg-[#BD472A] active:scale-95"
            >
              See the menu
              <ArrowDown className="h-4 w-4" />
            </a>
            <a
              href={BUSINESS.phoneHref}
              data-testid="hero-call-button"
              className="flex items-center gap-2 rounded-full border border-[#2D2825]/20 px-7 py-3.5 text-sm font-semibold text-[#2D2825] transition-colors duration-200 hover:border-[#D95333] hover:text-[#D95333]"
            >
              <Phone className="h-4 w-4" />
              Call to order
            </a>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: imgY }} className="relative md:col-span-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, rotate: 4 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2.5rem] border border-[#E8D8C8] shadow-sm"
          >
            <img
              src={IMAGES.hero}
              alt="Dalia's Harlem Cafe storefront with the pink daisy sign"
              data-testid="hero-image"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-[#2D2825]/10" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            data-testid="hero-special-card"
            className="animate-float-soft absolute -bottom-6 -left-4 rounded-2xl border border-[#E8D8C8] bg-[#FFFBF5] px-5 py-4 shadow-sm md:-left-10"
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#5C534D]">Morning favorite</p>
            <p className="font-display text-lg font-semibold text-[#2D2825]">
              Bacon, Egg & Cheese — <span className="text-[#D95333]">$5</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
