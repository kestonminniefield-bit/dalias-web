const ITEMS = [
  "Bacon, Egg & Cheese",
  "Chopped Cheese",
  "Avocado Toast",
  "Buffalo Wings",
  "Philly Cheesesteak",
  "Fried Whiting",
  "Fresh Coffee",
  "Garlic Parmesan Wings",
];

export const Marquee = () => (
  <div data-testid="editorial-marquee" className="overflow-hidden border-y border-[#E8D8C8] bg-[#F5EBE1] py-5">
    <div className="animate-marquee flex w-max items-center gap-24 pr-24">
      {[...ITEMS, ...ITEMS].map((item, i) => (
        <span key={i} className="flex items-center gap-24 whitespace-nowrap text-sm font-medium uppercase tracking-[0.2em] text-[#D95333]">
          {item}
          <span className="text-[#5C534D]">✦</span>
        </span>
      ))}
    </div>
  </div>
);
