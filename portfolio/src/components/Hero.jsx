import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import portraitWebp from "../assets/portrait.webp";
import portraitJpg from "../assets/portrait.jpg";

/**
 * Hero
 * ---------------------------------------------------------------------------
 * Two columns on desktop (name/copy left, portrait right, stat strip full
 * width below), single column on mobile with the portrait cropped wide and
 * a 2x2 button grid standing in for the desktop nav actions.
 *
 * Layout is driven by named CSS grid areas so mobile and desktop can reorder
 * the same elements without duplicating the portrait in the DOM.
 *
 * The name's per-character reveal, the cursor-tracked spotlight and the
 * scroll-linked fade are unchanged from the previous version, just re-homed
 * onto the new grid position.
 * ---------------------------------------------------------------------------
 */

const LINE_1 = "SHEIKH";
const LINE_2 = "ANAS";

const CALENDLY = "https://calendly.com/sheikhanas1992/30min";

const STATS = [
  { n: "400+", label: "products launched", color: "#9BE6B4" },
  { n: "$2M–$10M", label: "brand revenue managed", color: "#F5C542" },
  { n: "6 yrs", label: "on Amazon advertising", color: "#8FB8E8" },
];

const MOBILE_BUTTONS = [
  { label: "Book a strategy call", href: CALENDLY, external: true, filled: false },
  { label: "Request services", href: "#packages", filled: false },
];

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  /* Cursor spotlight, spring-damped so it trails rather than snaps */
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.28);
  const sx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });

  const spotlight = useTransform(
    [sx, sy],
    ([x, y]) =>
      `radial-gradient(58rem 42rem at ${x * 100}% ${y * 100}%, rgba(237,232,224,0.13), rgba(237,232,224,0.045) 34%, transparent 68%)`
  );

  const handleMove = (e) => {
    if (reduce) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  /* Scroll depth, applied to the name only */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  /* The gradient fill has to live on each letter's own span, not on the
     h1 as a whole: background-clip: text combined with a parent that has
     independently-transformed animated children clips unreliably in
     Safari, cutting chunks out of the glyphs. Clipping each already-atomic
     span to its own gradient avoids that entirely. */
  const word = (text, base) => (
    <span className="block overflow-hidden whitespace-nowrap pb-[0.03em]">
      {[...text].map((c, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{
            backgroundImage: "linear-gradient(180deg, #F7F3EA 0%, #EDE8E0 55%, #d8c48f 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
          initial={reduce ? false : { y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.95, delay: base + i * 0.035, ease: [0.16, 1, 0.3, 1] }}
        >
          {c}
        </motion.span>
      ))}
    </span>
  );

  return (
    <section
      ref={ref}
      onPointerMove={handleMove}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pb-10 pt-24 md:px-10 md:pb-10 md:pt-24"
    >
      {/* Hints the browser to fetch the portrait (the LCP element) before it
          would otherwise discover it via the CSS/JS-driven <picture> below. */}
      <link rel="preload" as="image" href={portraitWebp} fetchPriority="high" />

      {/* Cursor-tracked spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: reduce ? undefined : spotlight }}
      />
      {/* Static fallback glow so the section is never flat before first move */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(48rem 34rem at 50% 20%, rgba(237,232,224,0.07), transparent 65%), radial-gradient(38rem 30rem at 85% 85%, rgba(245,197,66,0.05), transparent 70%), linear-gradient(180deg, #0d0d0f 0%, #0d0d0f 82%, #111113 100%)",
        }}
      />

      <div
        className={`relative mx-auto grid w-full max-w-[1400px] grid-cols-1 items-start gap-x-14 gap-y-7
          [grid-template-areas:"eyebrow"_"name"_"portrait"_"headline"_"buttons"_"stats"]
          md:grid-cols-[1.35fr_1fr] md:gap-y-6
          md:[grid-template-areas:"eyebrow_portrait"_"name_portrait"_"headline_portrait"_"stats_stats"]`}
      >
        {/* Eyebrow */}
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 font-mono text-[0.76rem] font-bold uppercase tracking-[0.16em] text-[#9BE6B4] [grid-area:eyebrow] md:text-[0.85rem]"
        >
          <span aria-hidden className="h-[7px] w-[7px] shrink-0 rounded-full bg-[#F5C542]" />
          Amazon PPC &amp; brand management
        </motion.p>

        {/* Name */}
        <motion.h1
          style={{ y: reduce ? undefined : nameY, opacity: reduce ? undefined : nameOpacity }}
          className="font-[Archivo,sans-serif] text-[clamp(3.2rem,14vw,6.5rem)] font-black uppercase leading-[0.95] tracking-[-0.03em] [grid-area:name] md:text-[clamp(3.2rem,7vw,7.5rem)]"
        >
          {word(LINE_1, 0.2)}
          {word(LINE_2, 0.42)}
        </motion.h1>

        {/* Portrait */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[5/4] w-full overflow-hidden rounded-[20px] border border-white/10 bg-[#1a1a1d] [grid-area:portrait] md:aspect-auto md:h-full md:max-h-[46vh] md:self-start"
        >
          <picture>
            <source srcSet={portraitWebp} type="image/webp" />
            <img
              src={portraitJpg}
              alt="Portrait of Sheikh Anas, Amazon PPC and brand management specialist"
              fetchPriority="high"
              className="h-full w-full object-cover object-[50%_22%]"
              width={800}
              height={800}
            />
          </picture>
        </motion.div>

        {/* Headline: question then answer, not a paragraph */}
        <div className="[grid-area:headline]">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[36ch] text-[1.05rem] font-semibold italic leading-snug text-[#8FB8E8] md:text-[1.08rem]"
          >
            Struggling to grow your brand on Amazon?
          </motion.p>
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.97, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2 max-w-[36ch] text-[clamp(1.4rem,4.4vw,1.7rem)] font-black normal-case leading-[1.2] text-[#EDE8E0]"
          >
            I help 5 to 8 figure brands turn ad spend into{" "}
            <span className="text-[#F5C542]">profitable growth</span>.
          </motion.h2>
        </div>

        {/* Mobile-only actions: nav carries these at desktop */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 gap-3 [grid-area:buttons] md:hidden"
        >
          {MOBILE_BUTTONS.map((b) => (
            <a
              key={b.label}
              href={b.href}
              target={b.external ? "_blank" : undefined}
              rel={b.external ? "noreferrer" : undefined}
              className={
                b.filled
                  ? "flex items-center justify-center rounded-full bg-[#F5C542] px-4 py-3.5 text-center font-mono text-[0.66rem] font-bold uppercase leading-tight tracking-[0.1em] text-[#0d0d0f] shadow-[0_6px_18px_-6px_rgba(245,197,66,0.5)] transition-transform duration-200 active:scale-[0.97]"
                  : "flex items-center justify-center rounded-full border border-white/[0.18] px-4 py-3.5 text-center font-mono text-[0.66rem] font-semibold uppercase leading-tight tracking-[0.1em] text-[#c7c7cc] transition-all duration-200 active:border-[#F5C542]/50 active:text-[#F5C542]"
              }
            >
              {b.label}
            </a>
          ))}
        </motion.div>

        {/* Stat strip */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/[0.08] pt-5 [grid-area:stats] md:grid-cols-3 md:pt-6"
        >
          {STATS.map((s, i) => (
            <div key={s.label} className={i === 2 ? "col-span-2 md:col-span-1" : ""}>
              <div className="text-[clamp(1.3rem,2.6vw,1.5rem)] font-bold" style={{ color: s.color }}>
                {s.n}
              </div>
              <div className="mt-1 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[#c7c7cc] md:text-[0.72rem]">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
