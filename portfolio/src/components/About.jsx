import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "../lib/motion";

const BIO = [
  "Most Amazon brands don't have a traffic problem. They have a PPC structure problem: ad spend keeps increasing, ACOS becomes unstable, and campaigns turn into a cost instead of a growth engine.",
  "I help 6 to 8 figure Amazon brands scale with PPC by building structured, data-driven systems that turn ad spend into consistent, profitable growth. Hands-on experience managing $50K+ a month in ad spend across multiple brands.",
  "My approach is simple: Audit, Fix, Scale. I find the inefficiencies, restructure the campaigns, and reallocate spend, then scale what's performing. No guesswork, just structured execution focused on ACOS control, TACOS stability and profitability.",
  "I also offer a free full account audit, covering PPC, listing and growth opportunities. If your PPC feels unstructured, unprofitable or hard to scale, that's the place to start.",
];

const SKILLS = [
  {
    label: "Amazon PPC",
    tags: [
      "Sponsored Products",
      "Sponsored Brands",
      "Sponsored Display",
      "Campaign Structure & Scaling",
      "Intent-Based Targeting",
      "Negative Sculpting",
      "Bid Control",
      "PPC Automation (Scale Insights)",
    ],
  },
  {
    label: "Research & Listings",
    tags: [
      "Keyword Research",
      "Competitor Analysis",
      "Listing SEO & CRO",
      "A+ Content",
      "Product & Sourcing Research",
    ],
  },
  {
    label: "Launch & Reporting",
    tags: ["Product Launches", "Full Account Audits", "Daily, Weekly & Monthly Reporting"],
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
                className="max-w-[58ch] text-[1rem] font-medium leading-relaxed text-[#b4b4b8]"
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
          className="flex flex-col gap-10 md:pt-2"
        >
          {SKILLS.map((block) => (
            <div key={block.label}>
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
                    className="rounded-full border border-white/[0.09] bg-[#151517] px-3 py-1.5 font-mono text-[0.62rem] font-medium uppercase tracking-[0.1em] text-[#b4b4b8] transition-colors duration-150 hover:border-[#F5C542]/40 hover:text-[#EDE8E0]"
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
