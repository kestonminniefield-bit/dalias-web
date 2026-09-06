import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, LogOut, Mail, Phone } from "lucide-react";
import { BUSINESS } from "../data/business";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const GBP_STEPS = [
  "Go to business.google.com and sign in with the restaurant's Google account.",
  `Add "${BUSINESS.name}" with category "Restaurant".`,
  `Verify the address (${BUSINESS.address}) and phone (${BUSINESS.phone}).`,
  "Add opening hours (Mon – Sun, 8:00 AM – 4:30 PM), this website URL, and the menu link (/menu.html).",
  "Upload photos of the storefront and best-selling dishes.",
];

const inputClass =
  "w-full rounded-2xl border border-[#E8D8C8] bg-[#FFFBF5] px-5 py-3.5 text-sm text-[#2D2825] placeholder-[#5C534D]/60 outline-none transition-shadow focus:ring-2 focus:ring-[#D95333]/50";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(typeof data.detail === "string" ? data.detail : "Login failed");
      onLogin(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-full max-w-sm flex-col gap-5"
      data-testid="admin-login-form"
    >
      <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} data-testid="admin-email-input" />
      <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} data-testid="admin-password-input" />
      {error && <p data-testid="admin-login-error" className="text-sm font-medium text-[#D95333]">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        data-testid="admin-login-submit"
        className="rounded-full bg-[#D95333] px-8 py-3.5 text-sm font-semibold text-[#FFFBF5] transition-transform duration-200 hover:scale-105 hover:bg-[#BD472A] active:scale-95 disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </motion.form>
  );
};

export default function Admin() {
  const [user, setUser] = useState(undefined);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(`${API}/auth/me`, { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data || false))
      .catch(() => setUser(false));
  }, []);

  useEffect(() => {
    if (!user) return;
    fetch(`${API}/messages`, { credentials: "include" })
      .then((res) => (res.ok ? res.json() : []))
      .then(setMessages)
      .catch(() => setMessages([]));
  }, [user]);

  const logout = async () => {
    await fetch(`${API}/auth/logout`, { method: "POST", credentials: "include" });
    setUser(false);
  };

  if (user === undefined) {
    return <div className="flex min-h-screen items-center justify-center bg-[#FFFBF5] text-sm text-[#5C534D]">Loading…</div>;
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[#FFFBF5] px-6">
        <div className="text-center">
          <p className="font-display text-3xl font-semibold tracking-tight text-[#2D2825]">
            Staff <span className="italic text-[#D95333]">login</span>
          </p>
          <p className="mt-2 text-sm text-[#5C534D]">Sign in to read customer messages.</p>
        </div>
        <LoginForm onLogin={setUser} />
        <a href="/" data-testid="admin-back-home" className="text-sm text-[#5C534D] transition-colors hover:text-[#D95333]">
          ← Back to the site
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5]" data-testid="admin-dashboard">
      <header className="border-b border-[#E8D8C8] bg-[#FFFBF5]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <p className="font-display text-xl font-semibold tracking-tight text-[#2D2825]">
            Dalia's Harlem Cafe <span className="italic text-[#D95333]">Inbox</span>
          </p>
          <div className="flex items-center gap-4">
            <a href="/" data-testid="admin-view-site" className="text-sm text-[#5C534D] transition-colors hover:text-[#D95333]">View site</a>
            <button
              onClick={logout}
              data-testid="admin-logout-button"
              className="flex items-center gap-2 rounded-full border border-[#2D2825]/20 px-5 py-2.5 text-sm font-semibold text-[#2D2825] transition-colors hover:border-[#D95333] hover:text-[#D95333]"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-[#E8D8C8] bg-[#F5EBE1] p-7 lg:col-span-1"
            data-testid="gbp-setup-card"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#D95333]">Google Business Profile</p>
            <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight text-[#2D2825]">Get found on Google</h2>
            <ol className="mt-5 flex flex-col gap-3">
              {GBP_STEPS.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-[#5C534D]">
                  <span className="font-display font-semibold text-[#D95333]">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
            <a
              href="https://business.google.com"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="gbp-setup-link"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D95333] px-6 py-3 text-sm font-semibold text-[#FFFBF5] transition-transform duration-200 hover:scale-105 hover:bg-[#BD472A]"
            >
              Open Google Business
              <ExternalLink className="h-4 w-4" />
            </a>
          </motion.div>

          <div className="md:col-span-1 lg:col-span-2">
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-[#2D2825]">Customer messages</h2>
              <span data-testid="messages-count" className="rounded-full bg-[#F5EBE1] px-4 py-1.5 text-xs font-semibold text-[#5C534D]">
                {messages.length} total
              </span>
            </div>
            {messages.length === 0 ? (
              <div data-testid="messages-empty" className="rounded-xl border border-dashed border-[#E8D8C8] p-14 text-center text-sm text-[#5C534D]">
                No messages yet. When customers write in from the contact form, they'll show up here.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2" data-testid="messages-grid">
                {messages.map((m, i) => (
                  <motion.article
                    key={m.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="rounded-xl border border-[#E8D8C8] bg-[#FFFBF5] p-6"
                    data-testid={`message-card-${m.id}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-display text-lg font-semibold text-[#2D2825]">{m.name}</p>
                      <span className="whitespace-nowrap text-xs text-[#5C534D]/70">
                        {new Date(m.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-[#5C534D]">
                      <span className="flex items-center gap-1.5"><Mail className="h-3 w-3" />{m.email}</span>
                      {m.phone && <span className="flex items-center gap-1.5"><Phone className="h-3 w-3" />{m.phone}</span>}
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-[#2D2825]">{m.message}</p>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
