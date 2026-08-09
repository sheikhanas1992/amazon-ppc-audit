import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "../lib/motion";

const BIO = [
  "I run Amazon advertising and account strategy for ecommerce brands — currently leading paid media at Sohomax, working with 7- and 8-figure sellers, alongside a PPC engagement at AMZ One Step.",
  "The work is mostly at the search-term level: finding where spend is leaking to non-converting queries, moving it to the terms that actually close, and rebuilding the campaign structure so that stays true as the catalog grows.",
  "Advertising only pays off if the listing and the margin behind it can carry the traffic — three years managing Amazon brands and catalogs at Four Twigs taught me to treat PPC as one lever, not the whole machine.",
  "Currently working remotely with global ecommerce brands, and open to new opportunities.",
];

const SKILLS = [
  {
    label: "Amazon PPC",
    tags: ["Sponsored Products", "Sponsored Brands", "Sponsored Display", "Search Term Mining", "Negative Keyword Strategy", "Bid & Budget Optimisation"],
  },
  {
    label: "Account & Brand",
    tags: ["Brand Registry", "Catalog & Listing Health", "A+ Content", "Inventory Planning", "P&L Ownership"],
  },
  {
    label: "Tools & Reporting",
    tags: ["Amazon Ads Console", "Bulk Sheet Operations", "Excel / Google Sheets", "Looker Studio"],
  },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36">
      <div className="grid gap-16 md:grid-cols-2 md:gap-12">
        {/* Left — statement + bio, enters first */}
        <motion.div
          variants={staggerContainer({ stagger: 0.1 })}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.h2
            variants={fadeUp({ distance: 20 })}
            className="max-w-[14ch] text-[clamp(1.9rem,4vw,3.1rem)] font-black leading-[0.95] tracking-[-0.02em] text-[#EDE8E0]"
          >
            Ads are the easy part.
            <br />
            Margin is the job.
          </motion.h2>

          <div className="mt-10 flex flex-col gap-5">
            {BIO.map((p, i) => (
              <motion.p
                key={i}
                variants={fadeUp({ distance: 16 })}
                className="max-w-[58ch] text-[0.98rem] leading-relaxed text-[#9a9a9e]"
              >
                {p}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Right — skill blocks, enters ~120ms after left */}
        <motion.div
          variants={staggerContainer({ stagger: 0.14, delayChildren: 0.12 })}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col gap-10 md:pt-2"
        >
          {SKILLS.map((block) => (
            <div key={block.label}>
              <motion.h3
                variants={fadeUp({ distance: 12, duration: 0.7 })}
                className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[#7d7d82]"
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
                    className="rounded-full border border-white/[0.09] bg-[#151517] px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-[#9a9a9e]"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
