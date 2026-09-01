import { motion } from "framer-motion";
import { IMAGES } from "../data/business";

const CARDS = [
  {
    img: IMAGES.sausageEggCheese,
    alt: "Sausage, egg and cheese on a roll at Dalia's Harlem Cafe",
    kicker: "From 8 AM",
    title: "Slow mornings, fast breakfast",
    copy: "Egg sandwiches on the griddle, sausage hot off the flat-top, and coffee that's actually good.",
  },
  {
    img: IMAGES.choppedCheese,
    alt: "Chopped cheese sandwich at Dalia's Harlem Cafe",
    kicker: "Lunch rush",
    title: "Stacked, pressed, wrapped",
    copy: "Our chopped cheese, philly cheesesteaks and burgers built to order — deluxe it with fries & a soda.",
  },
];

const GALLERY = [
  { img: IMAGES.wings, alt: "Saucy wings at Dalia's Harlem Cafe", label: "Wings, sauced to order" },
  { img: IMAGES.breakfastPlate, alt: "Breakfast plate with eggs, sausage and home fries", label: "The full breakfast plate" },
  { img: IMAGES.avocadoToast, alt: "Avocado toast", label: "Avocado toast" },
  { img: IMAGES.coffee, alt: "Fresh hot coffee", label: "Coffee, always on" },
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

    <div className="mt-24 grid grid-cols-2 gap-6 lg:grid-cols-4" data-testid="dish-gallery">
      {GALLERY.map((shot, i) => (
        <motion.figure
          key={shot.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={i % 2 === 1 ? "lg:mt-10" : ""}
          data-testid={`gallery-item-${i}`}
        >
          <div className="overflow-hidden rounded-3xl border border-[#E8D8C8] shadow-sm">
            <img src={shot.img} alt={shot.alt} className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-105" />
          </div>
          <figcaption className="mt-4 text-sm font-medium text-[#5C534D]">{shot.label}</figcaption>
        </motion.figure>
      ))}
    </div>
  </section>
);
