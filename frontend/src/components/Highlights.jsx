import { motion } from "framer-motion";
import { IMAGES } from "../data/business";

const CARDS = [
  {
    img: IMAGES.breakfast,
    alt: "Coffee and avocado toast",
    kicker: "From 6 AM",
    title: "Slow mornings, fast breakfast",
    copy: "Egg sandwiches on the griddle, avocado toast, and coffee that's actually good.",
  },
  {
    img: IMAGES.sandwich,
    alt: "Deli sandwich held up",
    kicker: "Lunch rush",
    title: "Stacked, pressed, wrapped",
    copy: "Chopped cheese, philly cheesesteaks and burgers built to order — deluxe it with fries & a soda.",
  },
];

export const Highlights = () => (
  <section data-testid="highlights-section" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
    <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-10">
      {CARDS.map((card, i) => (
        <motion.article
          key={card.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={i === 1 ? "md:mt-24" : ""}
          data-testid={`highlight-card-${i}`}
        >
          <div className={`overflow-hidden rounded-[2rem] border border-[#E8D8C8] shadow-sm ${i === 1 ? "rotate-1" : "-rotate-1"}`}>
            <img src={card.img} alt={card.alt} className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105" />
          </div>
          <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-[#D95333]">{card.kicker}</p>
          <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight text-[#2D2825] md:text-3xl">{card.title}</h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#5C534D] md:text-base">{card.copy}</p>
        </motion.article>
      ))}
    </div>
  </section>
);
