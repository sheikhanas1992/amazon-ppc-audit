import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "../lib/motion";

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

export default function Skills() {
  return (
    <section className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(44rem 28rem at 10% 15%, rgba(245,197,66,0.05), transparent 65%)",
        }}
      />
      <div className="mx-auto max-w-[1300px]">
        <motion.div variants={staggerContainer({ stagger: 0.1 })} initial="hidden" whileInView="show" viewport={viewportOnce}>
          <motion.h2
            variants={fadeUp({ distance: 20 })}
            className="text-[clamp(2.4rem,7vw,4.4rem)] font-black uppercase leading-[0.9] tracking-[-0.03em] text-[#EDE8E0]"
          >
            Skills &amp; tooling
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer({ stagger: 0.1, delayChildren: 0.1 })}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SKILLS.map((block) => (
            <motion.div key={block.label} variants={fadeUp({ distance: 14 })}>
              <h3 className="font-mono text-[0.74rem] font-bold uppercase tracking-[0.16em] text-[#EDE8E0]">
                {block.label}
              </h3>
              <motion.div variants={staggerContainer({ stagger: 0.04 })} className="mt-4 flex flex-wrap gap-2">
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
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp({ distance: 10 })}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-10 border-t border-white/[0.08] pt-6 text-[0.85rem] font-medium italic leading-relaxed text-[#c7c7cc]"
        >
          Tooling: Scale Insights, Helium 10, Data Dive, Jungle Scout, Brand Analytics, plus trackers and reporting
          workbooks I build per account.
        </motion.p>
      </div>
    </section>
  );
}
