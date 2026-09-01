import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { BUSINESS } from "../data/business";

export const FloatingCall = () => (
  <motion.a
    href={BUSINESS.phoneHref}
    data-testid="floating-call-button"
    initial={{ opacity: 0, scale: 0.6 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 1.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#D95333] px-6 py-4 text-sm font-semibold text-[#FFFBF5] shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-[#BD472A] active:scale-95 md:hidden"
  >
    <Phone className="h-5 w-5" />
    Tap to call
  </motion.a>
);
