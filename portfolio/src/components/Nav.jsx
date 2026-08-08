import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#results", label: "Results" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-500 ${
        scrolled ? "border-b border-white/[0.08] bg-[#0d0d0f]/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#top"
          className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[#EDE8E0]"
        >
          M. Anas
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-[#9a9a9e] transition-colors hover:text-[#EDE8E0]"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="rounded-full border border-white/[0.14] px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#EDE8E0] transition-colors hover:border-[#F5C542]/50 hover:text-[#F5C542]"
        >
          Contact
        </a>
      </nav>
    </motion.header>
  );
}
