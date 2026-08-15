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
    label: "Top of Search placement",
    change: "0% → +45%",
    note: "Top of Search converted at roughly twice the rate of Rest of Search. The modifier buys that position instead of paying for it with a blanket bid raise across every placement.",
  },
  {
    label: "Bidding strategy",
    change: "Dynamic up and down → Dynamic down only",
    note: "Two terms were being bid up automatically into losses. Down-only stops Amazon spending past the point where the data already said stop.",
  },
  {
    label: "Structure",
    change: "One broad campaign → broad harvester plus two SKCs",
    note: "The two proven converters get their own campaigns with their own budgets, so a spike on a research term can no longer starve them.",
  },
];

function CampaignStrip() {
  return (
    <motion.div
      variants={staggerContainer({ stagger: 0.1 })}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="mt-6 grid gap-5 md:grid-cols-3"
    >
      {STRIP.map((s) => (
        <motion.div
          key={s.label}
          variants={staggerItem}
          className="rounded-[16px] border border-white/[0.08] bg-[#151517] p-6"
        >
          <div className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#F5C542]">
            {s.label}
          </div>
          <div className="mt-2 font-mono text-[0.9rem] font-semibold text-[#EDE8E0]">{s.change}</div>
          <p className="mt-3 text-[0.86rem] leading-relaxed text-[#9a9a9e]">{s.note}</p>
        </motion.div>
      ))}
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
            className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[#7d7d82]"
          >
            Anyone can show you a dashboard
          </motion.span>
          <motion.h2
            variants={fadeUp({ distance: 18 })}
            className="mt-3 text-[clamp(1.9rem,4.4vw,3.2rem)] font-black uppercase leading-[0.95] tracking-[-0.02em] text-[#EDE8E0]"
          >
            This is the decision underneath it
          </motion.h2>
          <motion.p variants={fadeUp({ distance: 14 })} className="mt-4 text-[1rem] font-medium text-[#b4b4b8]">
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
