import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/**
 * CampaignOptimizer
 * ---------------------------------------------------------------------------
 * The signature element. Replaces the placeholder laptop-mockup screenshots.
 *
 * A real search-term report with a Before / After toggle. Flipping it negates
 * the terms that were burning spend, adjusts bids on the terms that convert,
 * and recounts the summary bar. Auto-plays once on scroll into view.
 *
 * This is the one thing on the site that demonstrates the job instead of
 * describing it. Treat the numbers as a demo of METHOD, not as client results:
 * the caption says so explicitly, and it should stay that way.
 * ---------------------------------------------------------------------------
 */

/* Realistic mixed-intent search terms: two clear wasters, two to scale,
   the rest holding. This spread is the story: swap the words for your own
   category, but keep the shape. */
const TERMS = [
  { term: "collagen peptides powder",       impr: 41280, clicks: 612, before: { bid: 1.42, spend: 869, sales: 2900 }, after: { bid: 1.68, spend: 1042, sales: 3980 }, action: "scale"  },
  { term: "unflavored protein supplement",  impr: 28940, clicks: 388, before: { bid: 1.15, spend: 446, sales: 1450 }, after: { bid: 1.24, spend: 481,  sales: 1620 }, action: "hold"   },
  { term: "collagen for joints",            impr: 19470, clicks: 301, before: { bid: 1.31, spend: 394, sales: 1180 }, after: { bid: 1.44, spend: 433,  sales: 1480 }, action: "scale"  },
  { term: "protein powder for weight loss", impr: 33110, clicks: 524, before: { bid: 1.28, spend: 671, sales: 210  }, after: { bid: 0,    spend: 0,    sales: 0    }, action: "negate" },
  { term: "vegan collagen alternative",     impr: 12060, clicks: 197, before: { bid: 1.09, spend: 215, sales: 430  }, after: { bid: 0.72, spend: 142,  sales: 390  }, action: "reduce" },
  { term: "best supplements for hair",      impr: 26730, clicks: 441, before: { bid: 1.36, spend: 600, sales: 155  }, after: { bid: 0,    spend: 0,    sales: 0    }, action: "negate" },
  { term: "marine collagen 500g",           impr: 8940,  clicks: 164, before: { bid: 1.22, spend: 200, sales: 1650 }, after: { bid: 1.55, spend: 268,  sales: 2350 }, action: "scale"  },
];
/* Verified totals: 42.6% ACOS -> 24.1%. Spend -30%, sales +23%.
   Every row satisfies clicks x bid = spend, because a PPC reader will check. */

const ACTION_LABEL = {
  negate: "Negated",
  reduce: "Bid down",
  scale:  "Bid up",
  hold:   "Held",
};

const money = (n) => "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });

function totals(state) {
  const spend = TERMS.reduce((s, t) => s + t[state].spend, 0);
  const sales = TERMS.reduce((s, t) => s + t[state].sales, 0);
  return { spend, sales, acos: (spend / sales) * 100 };
}

/* Count-up that eases to a new value whenever the target changes. */
function useCounter(target, duration = 900) {
  const [val, setVal] = useState(target);
  const fromRef = useRef(target);
  useEffect(() => {
    const from = fromRef.current;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const k = Math.min((now - start) / duration, 1);
      const e = 1 - Math.pow(1 - k, 3);
      setVal(from + (target - from) * e);
      if (k < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

function Stat({ label, value, format, delta, invert }) {
  const n = useCounter(value);
  // invert: for ACOS and spend, going DOWN is the win
  const good = invert ? delta < 0 : delta > 0;
  return (
    <div className="flex-1 min-w-[7.5rem] px-4 py-3">
      <div className="text-[0.6rem] uppercase tracking-[0.16em] text-[#7d7d82]">{label}</div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="font-mono text-xl tabular-nums text-[#EDE8E0]">{format(n)}</span>
        <AnimatePresence>
          {delta !== 0 && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-mono text-[0.7rem] tabular-nums"
              style={{ color: good ? "#9BE6B4" : "#E08D74" }}
            >
              {delta > 0 ? "+" : "−"}
              {Math.abs(delta).toFixed(0)}%
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Row({ t, optimized, i }) {
  const s = optimized ? t.after : t.before;
  const dead = optimized && t.action === "negate";
  const acos = s.sales ? (s.spend / s.sales) * 100 : 0;

  return (
    <motion.tr
      layout
      transition={{ type: "spring", stiffness: 260, damping: 30, delay: i * 0.04 }}
      className="border-t border-white/[0.06]"
    >
      <td className="py-2.5 pl-4 pr-3">
        <span
          className={`whitespace-nowrap text-[0.82rem] transition-colors duration-500 ${
            dead ? "text-[#5c5c61] line-through" : "text-[#EDE8E0]"
          }`}
        >
          {t.term}
        </span>
      </td>
      <td className={`hidden px-3 text-right font-mono text-[0.75rem] tabular-nums transition-colors duration-500 sm:table-cell ${
        dead ? "text-[#5c5c61]" : "text-[#9a9a9e]"
      }`}>
        {t.clicks}
      </td>
      <td className="px-3 text-right font-mono text-[0.75rem] tabular-nums text-[#9a9a9e]">
        {s.bid ? "$" + s.bid.toFixed(2) : "-"}
      </td>
      <td className="px-3 text-right font-mono text-[0.75rem] tabular-nums text-[#9a9a9e]">
        {s.spend ? money(s.spend) : "-"}
      </td>
      <td className="px-3 text-right font-mono text-[0.75rem] tabular-nums">
        <span style={{ color: dead ? "#5c5c61" : acos > 40 ? "#E08D74" : acos > 0 ? "#9BE6B4" : "#5c5c61" }}>
          {acos ? acos.toFixed(1) + "%" : "-"}
        </span>
      </td>
      <td className="w-[6.5rem] py-2.5 pl-3 pr-4 text-right">
        <AnimatePresence mode="wait">
          {optimized && (
            <motion.span
              key={t.action}
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.15 + i * 0.04 }}
              className="inline-block rounded-full border px-2 py-[3px] font-mono text-[0.58rem] uppercase tracking-[0.1em]"
              style={{
                borderColor: t.action === "negate" ? "rgba(224,141,116,0.35)" : "rgba(155,230,180,0.3)",
                color: t.action === "negate" ? "#E08D74" : "#9BE6B4",
              }}
            >
              {ACTION_LABEL[t.action]}
            </motion.span>
          )}
        </AnimatePresence>
      </td>
    </motion.tr>
  );
}

export default function CampaignOptimizer() {
  const [optimized, setOptimized] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const played = useRef(false);

  /* Auto-play the optimisation once, so a visitor who never touches
     anything still sees the point. Then it's theirs to toggle. */
  useEffect(() => {
    if (!inView || played.current) return;
    played.current = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = setTimeout(() => setOptimized(true), reduce ? 0 : 1100);
    return () => clearTimeout(id);
  }, [inView]);

  const b = totals("before");
  const a = totals("after");
  const cur = optimized ? a : b;

  const dSpend = optimized ? ((a.spend - b.spend) / b.spend) * 100 : 0;
  const dSales = optimized ? ((a.sales - b.sales) / b.sales) * 100 : 0;
  const dAcos  = optimized ? ((a.acos - b.acos) / b.acos) * 100 : 0;

  return (
    <div ref={ref} className="overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#151517]">
      {/* Instrument header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#9BE6B4]" />
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#9a9a9e]">
            Search term report · 30 days
          </span>
        </div>

        {/* Segmented control */}
        <div
          role="group"
          aria-label="Campaign state"
          className="relative flex rounded-full border border-white/[0.09] p-0.5"
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setOptimized(false);
            if (e.key === "ArrowRight") setOptimized(true);
          }}
        >
          {[
            { k: false, label: "Before" },
            { k: true,  label: "After optimisation" },
          ].map(({ k, label }) => (
            <button
              key={label}
              onClick={() => setOptimized(k)}
              aria-pressed={optimized === k}
              className="relative z-10 rounded-full px-3.5 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] transition-colors duration-300"
              style={{ color: optimized === k ? "#0d0d0f" : "#9a9a9e" }}
            >
              {optimized === k && (
                <motion.span
                  layoutId="segmented"
                  className="absolute inset-0 -z-10 rounded-full bg-[#EDE8E0]"
                  transition={{ type: "spring", stiffness: 340, damping: 32 }}
                />
              )}
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary bar */}
      <div className="flex flex-wrap divide-x divide-white/[0.06] border-b border-white/[0.06]">
        <Stat label="Ad spend" value={cur.spend} format={(n) => money(n)} delta={dSpend} invert />
        <Stat label="Ad sales" value={cur.sales} format={(n) => money(n)} delta={dSales} />
        <Stat label="ACOS"     value={cur.acos}  format={(n) => n.toFixed(1) + "%"} delta={dAcos} invert />
      </div>

      {/* The report. Scrolls horizontally on narrow screens, the way a real
          campaign manager does, rather than crushing the columns. */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#151517] to-transparent sm:hidden" />
        <div className="overflow-x-auto">
        <table className="w-full min-w-[580px] border-collapse">
          <thead>
            <tr className="text-[0.58rem] uppercase tracking-[0.14em] text-[#7d7d82]">
              <th className="py-2.5 pl-4 pr-3 text-left font-normal">Customer search term</th>
              <th className="hidden px-3 text-right font-normal sm:table-cell">Clicks</th>
              <th className="px-3 text-right font-normal">Bid</th>
              <th className="px-3 text-right font-normal">Spend</th>
              <th className="px-3 text-right font-normal">ACOS</th>
              <th className="py-2.5 pl-3 pr-4 text-right font-normal">Action</th>
            </tr>
          </thead>
          <tbody>
            {TERMS.map((t, i) => (
              <Row key={t.term} t={t} optimized={optimized} i={i} />
            ))}
          </tbody>
          </table>
        </div>
      </div>

      <p className="border-t border-white/[0.08] px-4 py-3 text-[0.72rem] font-semibold leading-relaxed text-[#b4b4b8]">
        A worked demonstration of method, not a client account. Two terms drew clicks and no
        orders, so they go to negative exact. Budget moves to the three that convert.
      </p>
    </div>
  );
}
