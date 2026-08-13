import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import portraitWebp from "../assets/portrait.webp";
import portraitJpg from "../assets/portrait.jpg";

/**
 * Hero
 * ---------------------------------------------------------------------------
 * Same composition as the Lovable build: the name is the page. What changes
 * is that it now responds:
 *
 *  1. The radial spotlight follows the cursor instead of sitting still. The
 *     name is set just barely above the background, so moving the mouse
 *     genuinely reveals it. On touch it settles at centre-top.
 *  2. Characters rise from behind a mask on load, staggered.
 *  3. Scrolling drifts the name up and fades it faster than the page moves,
 *     which reads as depth rather than translation.
 *
 * Everything here is disabled under prefers-reduced-motion.
 * ---------------------------------------------------------------------------
 */

const LINE_1 = "SHEIKH";
const LINE_2 = "ANAS";

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

  /* Scroll depth */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const word = (text, base) => (
    <span className="block overflow-hidden pb-[0.03em]">
      {[...text].map((c, i) => (
        <motion.span
          key={i}
          className="inline-block"
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
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pb-16 pt-28 md:px-10"
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

      {/* Recurring dot motif */}
      <motion.span
        aria-hidden
        className="absolute left-1/2 top-[18%] h-3 w-3 -translate-x-1/2 rounded-full bg-[#EDE8E0]"
        initial={reduce ? false : { opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.h1
        style={{ y: reduce ? undefined : nameY, opacity: reduce ? undefined : nameOpacity }}
        className="relative mx-auto w-full max-w-[1400px] text-center font-[Archivo,sans-serif] text-[clamp(2.6rem,13.2vw,13rem)] font-black uppercase leading-[0.82] tracking-[-0.035em] text-[#EDE8E0]"
      >
        {word(LINE_1, 0.2)}
        {word(LINE_2, 0.42)}
      </motion.h1>

      {/* Portrait, overlapping the wordmark */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto -mt-[1.5%] h-[clamp(5.5rem,14vw,11rem)] w-[clamp(5.5rem,14vw,11rem)] overflow-hidden rounded-[22px] border border-white/10 bg-[#1a1a1d] sm:-mt-[3%] md:-mt-[6%]"
      >
        <picture>
          <source srcSet={portraitWebp} type="image/webp" />
          <img
            src={portraitJpg}
            alt="Portrait of Sheikh Anas"
            fetchPriority="high"
            className="h-full w-full object-cover"
            width={800}
            height={800}
          />
        </picture>
      </motion.div>

      {/* Footer copy */}
      <div className="mx-auto mt-12 flex w-full max-w-[1400px] flex-col gap-8 text-[0.96rem] font-medium leading-relaxed text-[#b4b4b8] md:mt-20 md:flex-row md:justify-between md:gap-16">
        {[
          {
            align: "md:text-left",
            body: "I help 6 to 8 figure Amazon brands scale with PPC. Hands-on experience managing $50K+ a month in ad spend, turning wasted spend into consistent, profitable growth.",
          },
          {
            align: "md:text-right",
            body: "Sponsored Products, Sponsored Brands and Sponsored Display, campaign structure, listing SEO and full account audits, for brands ready to scale profitably.",
          },
        ].map((c, i) => (
          <motion.p
            key={i}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={`max-w-[34ch] ${c.align}`}
          >
            {c.body}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
