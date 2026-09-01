import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, SearchX } from "lucide-react";
import { MENU } from "../data/menu";

const MenuItem = ({ item }) => (
  <li className="flex items-baseline gap-3 py-3 break-inside-avoid">
    <div className="min-w-0">
      <p className="font-medium text-[#2D2825]">{item.name}</p>
      {item.desc && <p className="mt-0.5 text-sm text-[#5C534D]/80">{item.desc}</p>}
    </div>
    <span className="mx-1 flex-1 border-b border-dashed border-[#E8D8C8]" />
    <span className="font-display whitespace-nowrap text-lg font-semibold text-[#D95333]">{item.price}</span>
  </li>
);

export const MenuSection = () => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MENU;
    return MENU.map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          (item.desc || "").toLowerCase().includes(q) ||
          cat.title.toLowerCase().includes(q)
      ),
    })).filter((cat) => cat.items.length > 0);
  }, [query]);

  return (
    <section id="menu" data-testid="menu-section" className="bg-[#F5EBE1]/60 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#D95333]">The full board</p>
            <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight text-[#2D2825] sm:text-5xl">
              What are you <span className="italic text-[#D95333]">craving?</span>
            </h2>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5C534D]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search wings, coffee, burgers…"
              data-testid="menu-search-input"
              className="w-full rounded-full border border-[#E8D8C8] bg-[#FFFBF5] py-3.5 pl-12 pr-5 text-sm text-[#2D2825] placeholder-[#5C534D]/60 outline-none transition-shadow focus:ring-2 focus:ring-[#D95333]/50"
            />
          </div>
        </motion.div>

        {filtered.length === 0 ? (
          <div data-testid="menu-empty-state" className="mt-24 flex flex-col items-center gap-4 text-center">
            <SearchX className="h-10 w-10 text-[#5C534D]/50" />
            <p className="font-display text-2xl text-[#2D2825]">Nothing on the board for “{query}”.</p>
            <p className="text-sm text-[#5C534D]">Try “wings”, “coffee” or “cheese”.</p>
          </div>
        ) : (
          <div className="mt-20 flex flex-col gap-24">
            {filtered.map((cat, ci) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`grid grid-cols-1 gap-8 md:grid-cols-12 ${ci % 2 === 1 ? "md:pl-16" : ""}`}
                data-testid={`menu-category-${cat.id}`}
              >
                <div className="md:col-span-4">
                  <span className="font-display text-6xl font-light italic text-[#D95333]/50">{cat.number}</span>
                  <h3 className="font-display mt-2 text-3xl font-semibold tracking-tight text-[#2D2825]">{cat.title}</h3>
                  {cat.note && <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#5C534D]/80">{cat.note}</p>}
                </div>
                <ul className="md:col-span-8 md:columns-1 lg:columns-2 lg:gap-x-12">
                  {cat.items.map((item) => (
                    <MenuItem key={item.name} item={item} />
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
