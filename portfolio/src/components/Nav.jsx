import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINKS = [
  { href: "#selected-work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "/audit", label: "Get an audit" },
];

function MenuIcon({ open }) {
  return (
    <span className="relative flex h-4 w-5 flex-col items-center justify-between">
      <span
        aria-hidden
        className="h-[1.5px] w-full origin-center bg-current transition-transform duration-300"
        style={{ transform: open ? "translateY(6.5px) rotate(45deg)" : "none" }}
      />
      <span
        aria-hidden
        className="h-[1.5px] w-full bg-current transition-opacity duration-200"
        style={{ opacity: open ? 0 : 1 }}
      />
      <span
        aria-hidden
        className="h-[1.5px] w-full origin-center bg-current transition-transform duration-300"
        style={{ transform: open ? "translateY(-6.5px) rotate(-45deg)" : "none" }}
      />
    </span>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open, and close it if the
  // viewport grows past the mobile breakpoint (e.g. device rotation).
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e) => e.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => {
      document.body.style.overflow = "";
      mq.removeEventListener("change", onChange);
    };
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-500 ${
        scrolled || menuOpen ? "border-b border-white/[0.08] bg-[#0d0d0f]/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#top"
          className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[#EDE8E0]"
        >
          S. Anas
        </a>

        <div className="hidden items-center gap-2 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full border border-white/[0.12] px-4 py-2 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#d8d8dc] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#F5C542]/50 hover:bg-[#F5C542]/[0.08] hover:text-[#F5C542]"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="rounded-full bg-[#F5C542] px-5 py-2.5 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-[#0d0d0f] shadow-[0_4px_14px_-4px_rgba(245,197,66,0.5)] transition-transform duration-200 hover:scale-[1.05] active:scale-[0.97]"
          >
            Contact
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.16] text-[#EDE8E0] transition-colors duration-200 hover:border-[#F5C542]/50 hover:text-[#F5C542] md:hidden"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-white/[0.08] bg-[#0d0d0f]/95 px-6 pb-8 pt-6 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-2">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-[14px] border border-white/[0.12] px-5 py-4 font-mono text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-[#d8d8dc] transition-all duration-200 active:border-[#F5C542]/50 active:bg-[#F5C542]/[0.08] active:text-[#F5C542]"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
