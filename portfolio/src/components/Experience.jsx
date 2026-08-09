import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/**
 * Experience
 * ---------------------------------------------------------------------------
 * SOURCED STRICTLY FROM THE LINKEDIN PROFILE EXPORT, plus AMZ One Step.
 *
 * Forsit is deliberately NOT here. It does not appear anywhere on the
 * LinkedIn export. If the role is real, add it to LinkedIn first, then
 * add it here. If it is not, leave it out permanently.
 *
 * DELIBERATELY OMITTED CLAIMS, and why:
 *   · "300% market penetration"  — penetration is a share; it cannot exceed 100%
 *   · "brand awareness +250%"    — not measurable on Amazon
 *   · "300% ROI"                 — stated elsewhere as 300% ROAS; those are
 *                                  different things. Pick one and be precise.
 *
 * The freelance platform roles (Fiverr ×4, Upwork ×2, WORCOFY, own FBA brand)
 * are consolidated into one entry. As eight separate listings they read as
 * padding; as one four-year freelance practice they read as range.
 * ---------------------------------------------------------------------------
 */

const ROLES = [
  {
    company: "AMZ One Step",
    role: "Senior PPC Manager",
    period: "Aug 2025 – Aug 2026",
    place: "United States · Remote",
    note: "Ran alongside the Sohomax engagement.",
    points: [
      "Campaign strategy, bid governance and account audits for FBA brands across fashion, fitness, supplements and home categories.",
      "Weekly written performance reporting and quarterly growth roadmaps, delivered direct to brand owners.",
      "Aligned creative and listing work to conversion data rather than treating ads and pages as separate problems.",
    ],
    tags: ["Account audits", "Bid strategy", "Client reporting", "CVR"],
  },
  {
    company: "Sohomax",
    role: "Paid Media Manager — Amazon, TikTok, Meta",
    period: "Jan 2023 – Present",
    place: "United States · Remote",
    note: "Joined as Performance Marketing Specialist, moved into the manager role in Aug 2023.",
    points: [
      "Lead a team of specialists across PPC strategy, process standardisation and new product launch planning.",
      "Work with 7 and 8-figure Amazon brands on category position, managing budgets up to seven figures.",
      "Built the SOPs, benchmarks and automation the account team runs on, plus unified reporting across regions and marketplaces.",
      "Advanced keyword and ASIN research feeding Brand Analytics-led competitive strategy.",
    ],
    tags: ["Team lead", "7-figure budgets", "SOPs & automation", "Brand Analytics"],
  },
  {
    company: "Four Twigs LLC",
    role: "Amazon Brand Manager",
    period: "Jan 2020 – Jan 2023",
    place: "United States · Remote",
    note: null,
    points: [
      "Launched 360 products across the catalogue over three years, owning the full Amazon launch process end to end.",
      "Managed a $2M annual Amazon brand budget across PPC, listings and market research.",
      "Improved conversion rate by 40% through listing and content optimisation.",
    ],
    tags: ["Product launch", "$2M budget", "Listing optimisation", "Brand strategy"],
  },
  {
    company: "Freelance — Upwork, Fiverr & direct",
    role: "Amazon PPC, catalogue & FBA operations",
    period: "2020 – 2022",
    place: "US & UK clients",
    note: "Consolidates several concurrent client engagements over the same period.",
    points: [
      "PPC audits, competitor analysis and campaign builds for private-label sellers in the US and UK.",
      "Catalogue and SEO work: titles, bullets, A+ content, backend terms and image optimisation.",
      "FBA logistics: replenishment, shipment planning and inventory accuracy.",
      "Ran my own private-label brand on Amazon UK, which is where most of the operational detail came from.",
    ],
    tags: ["PPC audits", "Amazon SEO", "A+ content", "FBA logistics"],
  },
];

function Role({ r, i }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

  return (
    <motion.li
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative grid gap-5 border-t border-white/[0.08] py-9 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:gap-12"
    >
      <div>
        <div className="font-mono text-[0.62rem] uppercase tracking-[0.15em] text-[#F5C542]">
          {r.period}
        </div>
        <div className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.13em] text-[#7d7d82]">
          {r.place}
        </div>
      </div>

      <div>
        <h3 className="text-[1.15rem] font-semibold leading-snug text-[#EDE8E0]">
          {r.company}
        </h3>
        <p className="mt-1 text-[0.95rem] text-[#9a9a9e]">{r.role}</p>

        {r.note && (
          <p className="mt-3 font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.1em] text-[#7d7d82]">
            {r.note}
          </p>
        )}

        <ul className="mt-5 space-y-2.5">
          {r.points.map((p, k) => (
            <li
              key={k}
              className="grid grid-cols-[auto_1fr] gap-3 text-[0.92rem] leading-relaxed text-[#9a9a9e]"
            >
              <span aria-hidden className="mt-[0.55em] h-px w-3 bg-[#F5C542] opacity-60" />
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {r.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/[0.09] px-3 py-1 font-mono text-[0.57rem] uppercase tracking-[0.11em] text-[#9a9a9e] transition-colors duration-150 hover:border-[#F5C542]/40 hover:text-[#EDE8E0]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.li>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="text-[clamp(2.4rem,9vw,6rem)] font-black uppercase leading-[0.85] tracking-[-0.03em] text-[#EDE8E0]">
          Experience
        </h2>
        <p className="mt-6 max-w-[58ch] text-[0.95rem] leading-relaxed text-[#9a9a9e]">
          Six years on Amazon advertising, from running my own private-label brand
          to managing seven-figure budgets for 8-figure sellers. Full history on
          LinkedIn.
        </p>

        <ul className="mt-14 list-none border-b border-white/[0.08] p-0">
          {ROLES.map((r, i) => (
            <Role key={r.company} r={r} i={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
