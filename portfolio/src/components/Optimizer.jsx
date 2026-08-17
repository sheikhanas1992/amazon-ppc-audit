import { motion } from "framer-motion";
import CampaignOptimizer from "./CampaignOptimizer";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "../lib/motion";

/**
 * Optimizer
 * ---------------------------------------------------------------------------
 * The flagship artifact gets its own section, high on the page, rather than
 * being attached to any one employer card: the report is a worked
 * demonstration of method (see its own caption), not a specific client's
 * data, so it shouldn't imply otherwise by sitting inside a company's card.
 * ---------------------------------------------------------------------------
 */

const STRIP = [
  {
    n: "01",
    label: "Top of Search placement",
    change: "0% → +45%",
    note: "Top of Search converted at roughly twice the rate of Rest of Search. The modifier buys that position instead of paying for it with a blanket bid raise across every placement.",
    color: "#9BE6B4",
  },
  {
    n: "02",
    label: "Bidding strategy",
    change: "Dynamic up and down → Dynamic down only",
    note: "Two terms were being bid up automatically into losses. Down-only stops Amazon spending past the point where the data already said stop.",
    color: "#F5C542",
  },
  {
    n: "03",
    label: "Structure",
    change: "One broad campaign → broad harvester plus two SKCs",
    note: "The two proven converters get their own campaigns with their own budgets, so a spike on a research term can no longer starve them.",
    color: "#8FB8E8",
  },
];

/* Three decisions rendered as a connected flow rather than isolated cards:
   a gradient rail draws itself in on scroll, each node pulses in sequence,
   and the rail's color literally is the handoff from one decision to the
   next. */
function CampaignStrip() {
  return (
    <motion.div
      variants={staggerContainer({ stagger: 0.16 })}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="relative mt-10"
    >
      <motion.div
        aria-hidden
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } } }}
        className="pointer-events-none absolute left-[8%] right-[8%] top-6 hidden h-px origin-left md:block"
        style={{ background: "linear-gradient(90deg, #9BE6B4, #F5C542, #8FB8E8)" }}
      />
      <motion.div
        aria-hidden
        variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } } }}
        className="pointer-events-none absolute left-6 top-4 bottom-4 w-px origin-top md:hidden"
        style={{ background: "linear-gradient(180deg, #9BE6B4, #F5C542, #8FB8E8)" }}
      />

      <div className="relative grid gap-8 md:grid-cols-3 md:gap-6">
        {STRIP.map((s, i) => (
          <motion.div key={s.label} variants={staggerItem} className="relative flex gap-5 md:flex-col md:gap-0">
            <motion.div
              initial={{ scale: 0.3, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={viewportOnce}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 + i * 0.18 }}
              className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 bg-[#0d0d0f] font-mono text-[0.8rem] font-bold"
              style={{ borderColor: s.color, color: s.color, boxShadow: "0 0 0 6px #0d0d0f" }}
            >
              {s.n}
              <motion.span
                aria-hidden
                animate={{ opacity: [0.55, 0, 0.55], scale: [1, 1.7, 1] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 + i * 0.35 }}
                className="absolute inset-0 rounded-full"
                style={{ boxShadow: `0 0 0 1.5px ${s.color}66` }}
              />
            </motion.div>

            <div className="flex-1 rounded-[16px] border border-white/[0.08] bg-[#151517] p-6 transition-colors duration-300 md:mt-5">
              <div
                className="font-mono text-[0.64rem] font-bold uppercase tracking-[0.14em]"
                style={{ color: s.color }}
              >
                {s.label}
              </div>
              <div className="mt-2 font-mono text-[0.9rem] font-semibold text-[#EDE8E0]">{s.change}</div>
              <p className="mt-3 text-[0.86rem] leading-relaxed text-[#c7c7cc]">{s.note}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Optimizer() {
  return (
    <section id="work" className="px-6 py-20 md:px-10 md:py-28">
      <motion.div
        variants={staggerContainer({ stagger: 0.08 })}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto mb-10 max-w-[1100px]"
      >
        <div className="max-w-[56ch]">
          <motion.span
            variants={fadeUp({ distance: 12 })}
            className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#c7c7cc]"
          >
            Anyone can show you a dashboard
          </motion.span>
          <motion.h2
            variants={fadeUp({ distance: 18 })}
            className="mt-3 text-[clamp(1.9rem,4.4vw,3.2rem)] font-black uppercase leading-[0.95] tracking-[-0.02em] text-[#EDE8E0]"
          >
            This is the decision underneath it
          </motion.h2>
          <motion.p variants={fadeUp({ distance: 14 })} className="mt-4 text-[1rem] font-medium text-[#c7c7cc]">
            A 30-day search term report from one Sponsored Products campaign. Toggle it and watch
            wasted spend get negated and budget move to what converts.
          </motion.p>
        </div>
      </motion.div>

      {/* Wider than every other contained section on the page -- the one
          moment the flagship component gets room the rest of the site
          deliberately doesn't, instead of sitting in the same 1100px column
          as everything else. */}
      <motion.div
        variants={fadeUp({ distance: 24 })}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto max-w-[1500px]"
      >
        <CampaignOptimizer />
        <CampaignStrip />
      </motion.div>
    </section>
  );
}
