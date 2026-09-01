import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const inputClass =
  "w-full rounded-2xl border border-[#E8D8C8] bg-[#FFFBF5] px-5 py-3.5 text-sm text-[#2D2825] placeholder-[#5C534D]/60 outline-none transition-shadow focus:ring-2 focus:ring-[#D95333]/50";

export const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch(`${API}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      toast.success("Thanks! We'll get back to you soon.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Something went wrong — please call us instead.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="bg-[#F5EBE1]/60 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 md:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-5"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#D95333]">Drop us a line</p>
          <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight text-[#2D2825] sm:text-5xl">
            Questions, catering, <span className="italic text-[#D95333]">big orders?</span>
          </h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-[#5C534D]">
            Send us a note and we'll get back to you — or just call. We answer between flipping eggs.
          </p>
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-5 md:col-span-7"
          data-testid="contact-form"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <input required placeholder="Your name" value={form.name} onChange={update("name")} className={inputClass} data-testid="contact-name-input" />
            <input required type="email" placeholder="Email" value={form.email} onChange={update("email")} className={inputClass} data-testid="contact-email-input" />
          </div>
          <input placeholder="Phone (optional)" value={form.phone} onChange={update("phone")} className={inputClass} data-testid="contact-phone-input" />
          <textarea required rows={5} placeholder="What's on your mind?" value={form.message} onChange={update("message")} className={`${inputClass} resize-none`} data-testid="contact-message-input" />
          <div>
            <button
              type="submit"
              disabled={sending}
              data-testid="contact-submit-button"
              className="flex items-center gap-2 rounded-full bg-[#D95333] px-8 py-3.5 text-sm font-semibold text-[#FFFBF5] transition-transform duration-200 hover:scale-105 hover:bg-[#BD472A] active:scale-95 disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {sending ? "Sending…" : "Send message"}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};
