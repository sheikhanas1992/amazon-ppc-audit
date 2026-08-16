import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/**
 * CampaignOptimizer
 * ---------------------------------------------------------------------------
 * The signature element. A real search-term report with a Before / After
 * toggle. Flipping it negates the terms that were burning spend, adjusts
 * bids on the terms that convert, and recounts the summary bar. Auto-plays
 * once on scroll into view, then it's the visitor's to toggle by hand.
 *
 * Each row in the After state expands on click to show the reasoning behind
 * that specific action, tied to that row's own numbers rather than a
 * generic category description.
 *
 * Treat the numbers as a demo of METHOD, not as client results: the caption
 * says so explicitly, and it should stay that way.
 * ---------------------------------------------------------------------------
 */

const ACTION_LABEL = {
  skc: "Moved to SKC",
  harvest: "Harvested to exact",
  negate: "Negative exact",
  bidup: "Bid up",
  biddown: "Bid down",
  hold: "Held",
};

const ACTION_TONE = {
  skc: "#9BE6B4",
  harvest: "#9BE6B4",
  negate: "#E08D74",
  bidup: "#9BE6B4",
  biddown: "#F5C542",
  hold: "#c7c7cc",
};

/* Nine search terms from a real 30-day Sponsored Products report. Verified
   totals: spend $3,863 -> $2,826 (-27%), sales $9,380 -> $11,365 (+21%),
   ACOS 41.2% -> 24.9% (-40%). Reasoning ties to each row's own numbers. */
const TERMS = [
  {
    term: "collagen peptides powder",
    before: { clicks: 612, bid: 1.42, spend: 869, acos: 30.0 },
    after: { clicks: 698, bid: 1.68, spend: 1042, acos: 26.2 },
    action: "skc",
    reason:
      "Already converting at 30.0% ACOS inside the broad campaign. Its own campaign lets the bid climb without a research term pulling the average down.",
  },
  {
    term: "unflavored protein supplement",
    before: { clicks: 388, bid: 1.15, spend: 446, acos: 30.8 },
    after: { clicks: 391, bid: 1.16, spend: 459, acos: 30.6 },
    action: "hold",
    reason: "ACOS held steady at 30.6%, in line with target. No change earns its keep here.",
  },
  {
    term: "collagen for joints",
    before: { clicks: 301, bid: 1.31, spend: 394, acos: 33.4 },
    after: { clicks: 362, bid: 1.44, spend: 433, acos: 29.3 },
    action: "bidup",
    reason: "ACOS improved to 29.3% on its own. Raising the bid buys more of the clicks that are already converting.",
  },
  {
    term: "hydrolyzed collagen powder",
    before: { clicks: 233, bid: 1.18, spend: 275, acos: 32.7 },
    after: { clicks: 251, bid: 1.31, spend: 296, acos: 27.8 },
    action: "harvest",
    reason:
      "Consistent enough performance to earn its own exact match line, with a bid set from its own data instead of the broad campaign's average.",
  },
  {
    term: "protein powder for weight loss",
    before: { clicks: 524, bid: 1.28, spend: 671, acos: 319.5 },
    after: null,
    action: "negate",
    reason: "524 clicks and a 319.5% ACOS. Spend with no orders behind it, negated so the budget moves to terms that convert.",
  },
  {
    term: "vegan collagen alternative",
    before: { clicks: 197, bid: 1.09, spend: 215, acos: 50.0 },
    after: { clicks: 142, bid: 0.72, spend: 142, acos: 36.4 },
    action: "biddown",
    reason: "Converting, but the 50.0% ACOS was not sustainable at volume. Lower bid keeps the sales and drops the cost.",
  },
  {
    term: "best supplements for hair",
    before: { clicks: 441, bid: 1.36, spend: 600, acos: 387.1 },
    after: null,
    action: "negate",
    reason: "441 clicks, a 387.1% ACOS and no orders. The clearest waster in the report.",
  },
  {
    term: "collagen supplement for skin",
    before: { clicks: 156, bid: 1.24, spend: 193, acos: 34.3 },
    after: { clicks: 156, bid: 1.19, spend: 186, acos: 30.9 },
    action: "hold",
    reason: "Performing in line with target at 30.9% ACOS. No action needed, and no action taken.",
  },
  {
    term: "marine collagen 500g",
    before: { clicks: 164, bid: 1.22, spend: 200, acos: 12.1 },
    after: { clicks: 198, bid: 1.55, spend: 268, acos: 11.4 },
    action: "bidup",
    reason: "The strongest ACOS in the report, 11.4%. Raising the bid buys more of a term that is already working.",
  },
];

const TOTALS = {
  before: { spend: 3863, sales: 9380, acos: 41.2 },
  after: { spend: 2826, sales: 11365, acos: 24.9 },
};

const money = (n) => "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });

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
      <div className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#c7c7cc]">{label}</div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="font-mono text-xl tabular-nums text-[#EDE8E0]">{format(n)}</span>
        <AnimatePresence>
          {delta !== 0 && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-mono text-[0.75rem] font-bold tabular-nums"
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

function Row({ t, optimized, i, expanded, onToggle }) {
  const s = optimized ? t.after : t.before;
  const dead = optimized && t.action === "negate";
  const canExpand = optimized;

  return (
    <>
      <motion.tr
        layout
        transition={{ type: "spring", stiffness: 260, damping: 30, delay: i * 0.04 }}
        onClick={canExpand ? onToggle : undefined}
        className={`border-t border-white/[0.06] ${canExpand ? "cursor-pointer hover:bg-white/[0.02]" : ""}`}
      >
        <td className="py-2.5 pl-4 pr-3">
          <span
            className={`whitespace-nowrap text-[0.86rem] font-semibold transition-colors duration-500 ${
              dead ? "text-[#5c5c61] line-through" : "text-[#EDE8E0]"
            }`}
          >
            {t.term}
          </span>
        </td>
        <td className={`hidden px-3 text-right font-mono text-[0.8rem] font-semibold tabular-nums transition-colors duration-500 sm:table-cell ${
          dead ? "text-[#5c5c61]" : "text-[#EDE8E0]"
        }`}>
          {dead ? "0" : s.clicks}
        </td>
        <td className="px-3 text-right font-mono text-[0.8rem] font-semibold tabular-nums text-[#EDE8E0]">
          {dead ? "-" : "$" + s.bid.toFixed(2)}
        </td>
        <td className="px-3 text-right font-mono text-[0.8rem] font-semibold tabular-nums text-[#EDE8E0]">
          {dead ? "-" : money(s.spend)}
        </td>
        <td className="px-3 text-right font-mono text-[0.8rem] font-semibold tabular-nums">
          <span style={{ color: dead ? "#5c5c61" : s.acos > 40 ? "#E08D74" : "#9BE6B4" }}>
            {dead ? "-" : s.acos.toFixed(1) + "%"}
          </span>
        </td>
        <td className="w-[11rem] py-2.5 pl-3 pr-4 text-right">
          <AnimatePresence mode="wait">
            {optimized && (
              <motion.span
                key={t.action}
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.15 + i * 0.04 }}
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-[3px] font-mono text-[0.62rem] font-bold uppercase tracking-[0.1em]"
                style={{
                  borderColor: `${ACTION_TONE[t.action]}59`,
                  color: ACTION_TONE[t.action],
                }}
              >
                {ACTION_LABEL[t.action]}
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-200"
                  style={{ transform: expanded ? "rotate(180deg)" : "none" }}
                >
                  ▾
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </td>
      </motion.tr>
      <AnimatePresence initial={false}>
        {canExpand && expanded && (
          <motion.tr
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="border-t border-white/[0.04] bg-white/[0.015]"
          >
            <td colSpan={6} className="p-0">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="px-4 py-3 text-[0.85rem] font-medium leading-relaxed text-[#EDE8E0]">{t.reason}</p>
              </motion.div>
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  );
}

export default function CampaignOptimizer() {
  const [optimized, setOptimized] = useState(false);
  const [expandedTerm, setExpandedTerm] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const played = useRef(false);

  /* Auto-flip the state once, so a visitor who never touches anything
     still sees the point. Then it's theirs to toggle by hand. */
  useEffect(() => {
    if (!inView || played.current) return;
    played.current = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = setTimeout(() => setOptimized(true), reduce ? 0 : 1100);
    return () => clearTimeout(id);
  }, [inView]);

  const setState = (next) => {
    setOptimized(next);
    setExpandedTerm(null);
  };

  const b = TOTALS.before;
  const a = TOTALS.after;
  const cur = optimized ? a : b;

  const dSpend = optimized ? ((a.spend - b.spend) / b.spend) * 100 : 0;
  const dSales = optimized ? ((a.sales - b.sales) / b.sales) * 100 : 0;
  const dAcos = optimized ? ((a.acos - b.acos) / b.acos) * 100 : 0;

  return (
    <div ref={ref} className="overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#151517]">
      {/* Instrument header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#9BE6B4]" />
          <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#d8d8dc]">
            Search term report · one Sponsored Products campaign · 30 days
          </span>
        </div>

        {/* Segmented control */}
        <div
          role="group"
          aria-label="Campaign state"
          className="relative flex rounded-full border border-white/[0.09] p-0.5"
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setState(false);
            if (e.key === "ArrowRight") setState(true);
          }}
        >
          {[
            { k: false, label: "Before" },
            { k: true, label: "After optimisation" },
          ].map(({ k, label }) => (
            <button
              key={label}
              onClick={() => setState(k)}
              aria-pressed={optimized === k}
              className="relative z-10 rounded-full px-3.5 py-1.5 font-mono text-[0.64rem] font-bold uppercase tracking-[0.12em] transition-colors duration-300"
              style={{ color: optimized === k ? "#0d0d0f" : "#d8d8dc" }}
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
        <Stat label="ACOS" value={cur.acos} format={(n) => n.toFixed(1) + "%"} delta={dAcos} invert />
      </div>

      {/* The report. Scrolls horizontally on narrow screens, the way a real
          campaign manager does, rather than crushing the columns. */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#151517] to-transparent sm:hidden" />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[660px] border-collapse">
            <thead>
              <tr className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-[#c7c7cc]">
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
                <Row
                  key={t.term}
                  t={t}
                  optimized={optimized}
                  i={i}
                  expanded={expandedTerm === t.term}
                  onToggle={() => setExpandedTerm((cur) => (cur === t.term ? null : t.term))}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="border-t border-white/[0.08] px-4 py-3 text-[0.72rem] font-semibold leading-relaxed text-[#c7c7cc]">
        A worked demonstration of method, not a client account.
      </p>
    </div>
  );
}
