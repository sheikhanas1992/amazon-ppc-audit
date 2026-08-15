import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "../lib/motion";

/**
 * HowIWork
 * ---------------------------------------------------------------------------
 * Combines "Rules I run accounts by" and "Why work with me" into one section:
 * rules on the left, reasons on the right, one scroll stop instead of two.
 * ---------------------------------------------------------------------------
 */

const RULES = [
  "A TACOS ceiling is agreed before I touch anything, and it holds in bad months too.",
  "Every campaign gets a stop-loss set to your margins. Two weeks above it and it stops.",
  "Structure gets fixed before budget goes up, because spend multiplies whatever is already there.",
  "Nothing scales until the page converts. Traffic has never fixed a listing.",
  "Inventory decides spend before performance does. A variation that cannot hold stock does not get scaled.",
  "You get the reasoning weekly in writing, including the decisions that did not work.",
];

const REASONS = [
  {
    claim: "Find out before you commit.",
    body: "The free audit covers PPC, listings, creative and account health, with no obligation to hire me afterward. If the account is already in good shape, I will tell you that too.",
  },
  {
    claim: "Ads, listings and creative are one job, not three vendors.",
    body: "When a campaign underperforms I can tell you whether it is the bid, the term or the page it lands on.",
  },
  {
    claim: "The person who audits your account is the person who runs it.",
    body: "Six years and 400+ product launches, hands on your account, not passed to a junior.",
  },
  {
    claim: "I build the tooling instead of exporting screenshots.",
    body: "Custom trackers and reporting workbooks per account, not a generic dashboard summary.",
  },
  {
    claim: "I tell you what did not work.",
    body: "Anyone can present a good month. You need someone whose bad months you can trust the read on.",
  },
];

export default function HowIWork() {
  return (
    <section className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(46rem 30rem at 95% 0%, rgba(245,197,66,0.05), transparent 65%)",
        }}
      />
      <div className="mx-auto max-w-[1300px]">
        <div className="grid gap-14 md:grid-cols-2 md:gap-16">
          {/* Left: rules, equal visual weight, no descriptions */}
          <div>
            <h2 className="max-w-[16ch] text-[clamp(1.7rem,3.4vw,2.6rem)] font-black normal-case leading-[1.15] tracking-[-0.01em] text-[#EDE8E0]">
              Rules I run accounts by
            </h2>
            <p className="mt-3 text-[0.95rem] font-medium italic text-[#c7c7cc]">
              Agreed before I start, not invented after a bad week.
            </p>
            <motion.ul
              variants={staggerContainer({ stagger: 0.08 })}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="mt-7 flex flex-col gap-5"
            >
              {RULES.map((rule) => (
                <motion.li
                  key={rule}
                  variants={staggerItem}
                  className="grid grid-cols-[auto_1fr] gap-3.5 rounded-[16px] border border-white/[0.08] bg-[#151517] p-5"
                >
                  <span aria-hidden className="mt-[0.4em] h-[8px] w-[8px] shrink-0 rounded-full bg-[#F5C542]" />
                  <span className="text-[0.98rem] font-semibold leading-snug text-[#EDE8E0]">{rule}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Right: reasons, bold claim plus one supporting line each */}
          <div>
            <h2 className="max-w-[16ch] text-[clamp(1.7rem,3.4vw,2.6rem)] font-black normal-case leading-[1.15] tracking-[-0.01em] text-[#EDE8E0]">
              Why work with me
            </h2>
            <motion.ul
              variants={staggerContainer({ stagger: 0.08 })}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="mt-7 flex flex-col gap-5"
            >
              {REASONS.map((r) => (
                <motion.li key={r.claim} variants={fadeUp({ distance: 14 })} className="border-l-2 border-[#F5C542]/50 pl-5">
                  <p className="text-[1.02rem] font-bold leading-snug text-[#EDE8E0]">{r.claim}</p>
                  <p className="mt-1.5 max-w-[42ch] text-[0.92rem] font-medium leading-relaxed text-[#c7c7cc]">
                    {r.body}
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
