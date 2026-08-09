import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * CaseStudies
 * ---------------------------------------------------------------------------
 * Built from three real accounts, de-identified so it is safe to publish.
 *
 * WHAT WAS REMOVED, AND WHY IT STAYS REMOVED:
 *   · Client and parent-company names — all three are listed issuers
 *   · Absolute revenue and ad spend — brand-level revenue for a listed
 *     company can be material non-public information
 *   · Seller Central / Ads Console screenshots
 *   · ASINs, campaign names, SKU names
 *
 * WHAT SURVIVED: ratios, multiples, efficiency metrics and the reasoning.
 * These are what a hiring manager actually evaluates, and none of them
 * identify anyone.
 *
 * If you get written permission from a brand, name that one and move it to
 * the top. Until then, do not re-add anything from the list above.
 * ---------------------------------------------------------------------------
 */

const CASES = [
  {
    sector: "Dermocosmetics",
    context: "Korean pharmaceutical group · Amazon US",
    window: "8-week window, measured against the same 61 days last year",
    headline: { v: 10.4, suffix: "×", label: "Sales, year over year" },
    metrics: [
      { v: 4.33, suffix: "×", label: "Blended ROAS" },
      { v: 23.1, suffix: "%", label: "Blended ACOS" },
      { v: 266, prefix: "+", suffix: "%", label: "Page views YoY" },
    ],
    read: "Advertising scaled with organic demand instead of trailing it, and the least efficient campaign in the account was the one doing the most important job.",
    detail: [
      "Units grew 11.7× and sales 10.4× against the same window a year earlier, with Featured Offer share improving to 88.5%. The growth was broad-based rather than one spike, which is the part that actually matters.",
      "The brand-defense campaign ran at 26.9% ACOS while newer product-line campaigns converted at 14–16%. That gap is deliberate, not waste: defense exists to hold the top of the brand's own name, and judging it on ACOS alone would have led to switching off the thing protecting the flagship.",
      "72% of revenue sat in three hero SKUs. I moved incremental spend toward the newer line, which converted more efficiently dollar for dollar, while leaving defense intact.",
    ],
    tags: ["Account architecture", "Bid governance", "Brand defense", "SB + SD"],
  },
  {
    sector: "Regenerative skincare",
    context: "Korean pharmaceutical group · Amazon US",
    window: "8-week window, measured against the same 61 days last year",
    headline: { v: 42.4, prefix: "+", suffix: "%", label: "Sales, year over year" },
    metrics: [
      { v: 4.5, suffix: "×", label: "Blended ROAS" },
      { v: 22.2, suffix: "%", label: "Blended ACOS" },
      { v: 61.4, prefix: "+", suffix: "%", label: "Units YoY" },
    ],
    read: "The headline number was true and also misleading. I said so in the report rather than letting it stand.",
    detail: [
      "Essentially all of the year-over-year growth came from a single four-day promotional event that produced about 40% of the entire period's sales. Strip that window out and July was down 36% year over year against an unusually strong comparison month.",
      "I reported that plainly. The underlying baseline was still running ahead of the previous year without the promotional lift, which is the honest and more useful read.",
      "The two hero campaigns converted at 10.4% and 11.0% ACOS. What pulled the blended average up was an upper-funnel Sponsored Brands Video play trading efficiency for branded search volume — a deliberate choice, flagged as such rather than buried in the average.",
    ],
    tags: ["Promotional analysis", "Upper funnel", "SB Video", "Reporting"],
  },
  {
    sector: "Consumer health",
    context: "Korean pharmaceutical group · Amazon US",
    window: "8-week window, measured against the same 61 days last year",
    headline: { v: 10.6, prefix: "+", suffix: "%", label: "Sales, year over year" },
    metrics: [
      { v: 3.79, suffix: "×", label: "Blended ROAS" },
      { v: 26.4, suffix: "%", label: "Blended ACOS" },
      { v: 82, suffix: "%", label: "Campaigns budget-capped" },
    ],
    read: "Modest growth on the surface. The diagnosis underneath was the useful part, and it was not an efficiency problem.",
    detail: [
      "41 of 50 campaigns were sitting out of budget, including the single largest one — a competitor-conquest play running at a lean 15.5% ACOS. The account was leaving already-proven, profitable volume on the table purely on budget caps.",
      "Featured Offer share averaged 97.5% in June and slipped to 90.6% in July, with seven days below 80%. That is a more likely driver of the unit decline than seasonality, and it points at a different fix entirely.",
      "I include this account deliberately. Not everything is a 10× story, and being able to tell a delivery problem from a targeting problem is worth more than a cherry-picked number.",
    ],
    tags: ["Account audit", "Budget strategy", "Buy Box", "Diagnostics"],
  },
];

function useCountUp(target, run, dec) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setV(target);
    const t0 = performance.now(), dur = 1400;
    let raf;
    const tick = (now) => {
      const k = Math.min((now - t0) / dur, 1);
      setV(target * (1 - Math.pow(1 - k, 3)));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run]);
  return v.toFixed(dec);
}

function Metric({ m, run, big }) {
  const dec = m.v % 1 !== 0 ? (m.v.toString().split(".")[1]?.length ?? 1) : 0;
  const val = useCountUp(m.v, run, dec);
  return (
    <div>
      <div
        className={`font-mono tabular-nums leading-none text-[#EDE8E0] ${
          big ? "text-[clamp(2.4rem,6vw,3.6rem)]" : "text-[1.35rem]"
        }`}
      >
        {m.prefix || ""}{val}{m.suffix || ""}
      </div>
      <div className="mt-2 text-[0.6rem] uppercase tracking-[0.15em] text-[#7d7d82]">
        {m.label}
      </div>
    </div>
  );
}

function Case({ c, i }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();

  /* A little depth on hover -- transform only, so it stays cheap and honours
     the site's "opacity/transform only" motion rule. */
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spx = useSpring(px, { stiffness: 220, damping: 22, mass: 0.6 });
  const spy = useSpring(py, { stiffness: 220, damping: 22, mass: 0.6 });
  const rotateX = useTransform(spy, [0, 1], [4, -4]);
  const rotateY = useTransform(spx, [0, 1], [-4, 4]);

  const handleMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.article
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
      className="overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#151517]"
    >
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-[1.05rem] font-semibold text-[#EDE8E0]">{c.sector}</h3>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#7d7d82]">
            {c.context}
          </span>
        </div>

        <div className="mt-7 grid gap-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] md:items-end">
          <Metric m={c.headline} run={inView} big />
          <div className="grid grid-cols-3 gap-4">
            {c.metrics.map((m) => (
              <Metric key={m.label} m={m} run={inView} />
            ))}
          </div>
        </div>

        <p className="mt-7 max-w-[62ch] text-[0.95rem] leading-relaxed text-[#9a9a9e]">
          {c.read}
        </p>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="group mt-5 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#F5C542] transition-opacity hover:opacity-70"
        >
          {open ? "Close" : "Read the detail"}
          <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}>
            +
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="space-y-4 pt-6">
                {c.detail.map((d, k) => (
                  <p key={k} className="max-w-[70ch] text-[0.92rem] leading-relaxed text-[#9a9a9e]">
                    {d}
                  </p>
                ))}
                <p className="pt-1 font-mono text-[0.58rem] uppercase tracking-[0.13em] text-[#5c5c61]">
                  {c.window}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-7 flex flex-wrap gap-2 border-t border-white/[0.06] pt-6">
          {c.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/[0.09] px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.11em] text-[#9a9a9e] transition-colors duration-150 hover:border-[#F5C542]/40 hover:text-[#EDE8E0]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function CaseStudies() {
  return (
    <section id="results" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="text-center text-[clamp(2.4rem,9vw,6rem)] font-black uppercase leading-[0.85] tracking-[-0.03em] text-[#EDE8E0]">
          Selected work
        </h2>
        <p className="mx-auto mt-6 max-w-[60ch] text-center text-[0.95rem] leading-relaxed text-[#9a9a9e]">
          Three accounts I ran in the same eight-week window. Brands are unnamed and
          figures are expressed as ratios, because the underlying accounts are under
          agreement. Happy to walk through any of them properly on a call.
        </p>

        <div className="mt-14 space-y-5">
          {CASES.map((c, i) => (
            <Case key={c.sector} c={c} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
