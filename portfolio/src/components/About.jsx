import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "../lib/motion";

const BIO = [
  "What you just watched happen to one campaign is what I do to an entire account, every week.",
  "Most Amazon brands don't have a traffic problem. They have a structure problem: spend climbs, ACOS drifts, and a growth engine quietly turns into a cost nobody wants to question.",
  "My approach is Audit, Fix, Scale. Audit reads the account as it actually is, not as the dashboard summarises it: search term reports, bid history, placement data, and the pages the traffic lands on.",
  "Fix restructures before spending, because pushing budget into a page that doesn't convert only makes the loss arrive faster. Scale expands what's proven, on a system, with a TACOS ceiling and a stop-loss rule agreed before the money moves.",
  "No guesswork. Every decision has a reason I can explain to you, in writing, every week.",
  "I also run a free full account audit covering PPC, listings and growth opportunities. If your ads feel unstructured, unprofitable or hard to scale, that's the place to start.",
];

const SKILLS = [
  {
    label: "Amazon PPC",
    tags: [
      "Sponsored Products",
      "Sponsored Brands",
      "Sponsored Display",
      "Campaign structure & scaling",
      "Intent-based targeting",
      "Negative sculpting",
      "Bid & placement control",
      "Automation via Scale Insights",
    ],
  },
  {
    label: "Research & Listings",
    tags: ["Keyword research", "Competitor & ASIN analysis", "Listing SEO & conversion", "Product & sourcing research"],
  },
  {
    label: "Creative & Content",
    tags: [
      "Listing images",
      "A+ Content",
      "Product photography direction",
      "Infographics & comparison charts",
      "Brand Store",
      "Creative testing",
    ],
  },
  {
    label: "Launch & Reporting",
    tags: [
      "Product launches",
      "Full account audits",
      "Weekly & monthly written reporting",
      "Custom performance trackers & SEO gap analysis",
    ],
  },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden px-6 py-24 md:px-10 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(44rem 30rem at 90% 10%, rgba(245,197,66,0.05), transparent 65%)",
        }}
      />
      <div className="mx-auto grid max-w-[1400px] gap-16 md:grid-cols-2 md:gap-12">
        {/* Left: statement + bio, enters first */}
        <motion.div
          variants={staggerContainer({ stagger: 0.1 })}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.h2
            variants={fadeUp({ distance: 20 })}
            className="max-w-[18ch] text-[clamp(1.7rem,3.4vw,2.6rem)] font-black normal-case leading-[1.15] tracking-[-0.01em] text-[#EDE8E0]"
          >
            Cut wasted spend. Improve conversion. Scale what works.
          </motion.h2>

          <div className="mt-10 flex flex-col gap-5">
            {BIO.map((p, i) => (
              <motion.p
                key={i}
                variants={fadeUp({ distance: 16 })}
                className="max-w-[58ch] text-[1rem] font-medium leading-relaxed text-[#c7c7cc]"
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.div variants={fadeUp({ distance: 14 })} className="mt-8">
            <a
              href="/audit"
              className="inline-flex items-center gap-2 rounded-full bg-[#F5C542] px-6 py-3 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#0d0d0f] shadow-[0_6px_18px_-6px_rgba(245,197,66,0.5)] transition-transform duration-200 hover:scale-[1.04] active:scale-[0.97]"
            >
              Request a free account audit
              <span aria-hidden>→</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right: skill blocks, enters ~120ms after left */}
        <motion.div
          variants={staggerContainer({ stagger: 0.14, delayChildren: 0.12 })}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col md:pt-2"
        >
          {SKILLS.map((block, i) => (
            <div key={block.label} className={i > 0 ? "mt-8 border-t border-white/[0.08] pt-8" : ""}>
              <motion.h3
                variants={fadeUp({ distance: 12, duration: 0.7 })}
                className="font-mono text-[0.74rem] font-bold uppercase tracking-[0.16em] text-[#EDE8E0]"
              >
                {block.label}
              </motion.h3>
              <motion.div
                variants={staggerContainer({ stagger: 0.04 })}
                className="mt-4 flex flex-wrap gap-2"
              >
                {block.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    variants={staggerItem}
                    className="rounded-full border border-white/[0.09] bg-[#151517] px-3 py-1.5 font-mono text-[0.62rem] font-medium uppercase tracking-[0.1em] text-[#c7c7cc] transition-colors duration-150 hover:border-[#F5C542]/40 hover:text-[#EDE8E0]"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          ))}

          <motion.p
            variants={fadeUp({ distance: 10 })}
            className="mt-8 border-t border-white/[0.08] pt-6 text-[0.82rem] italic leading-relaxed text-[#9a9a9e]"
          >
            Tooling: Scale Insights, Helium 10, Data Dive, Jungle Scout, Brand Analytics, plus
            trackers and reporting workbooks I build per account.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
