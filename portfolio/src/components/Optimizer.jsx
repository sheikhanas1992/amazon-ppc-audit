import { motion } from "framer-motion";
import CampaignOptimizer from "./CampaignOptimizer";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

/**
 * Optimizer
 * ---------------------------------------------------------------------------
 * The flagship artifact gets its own section, high on the page, rather than
 * being attached to any one employer card — the report is a worked
 * demonstration of method (see its own caption), not a specific client's
 * data, so it shouldn't imply otherwise by sitting inside a company's card.
 * ---------------------------------------------------------------------------
 */
export default function Optimizer() {
  return (
    <section id="work" className="mx-auto max-w-[1100px] px-6 py-20 md:px-10 md:py-28">
      <motion.div
        variants={staggerContainer({ stagger: 0.08 })}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mb-10 max-w-[56ch]"
      >
        <motion.span
          variants={fadeUp({ distance: 12 })}
          className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[#7d7d82]"
        >
          Not a screenshot
        </motion.span>
        <motion.h2
          variants={fadeUp({ distance: 18 })}
          className="mt-3 text-[clamp(1.9rem,4.4vw,3.2rem)] font-black uppercase leading-[0.95] tracking-[-0.02em] text-[#EDE8E0]"
        >
          Watch the optimisation happen
        </motion.h2>
        <motion.p variants={fadeUp({ distance: 14 })} className="mt-4 text-[0.95rem] text-[#9a9a9e]">
          A real search-term report. Toggle it and watch wasted spend get cut and budget move to
          what converts — the same motion I run on every account I manage.
        </motion.p>
      </motion.div>

      <motion.div
        variants={fadeUp({ distance: 24 })}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <CampaignOptimizer />
      </motion.div>
    </section>
  );
}
