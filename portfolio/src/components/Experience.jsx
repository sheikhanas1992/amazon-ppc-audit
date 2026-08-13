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
 *   · "300% market penetration": penetration is a share, it cannot exceed 100%
 *   · "brand awareness +250%": not measurable on Amazon
 *   · "300% ROI": stated elsewhere as 300% ROAS, those are
 *                 different things. Pick one and be precise.
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
  },
  {
    company: "Sohomax",
    role: "Paid Media Manager: Amazon, TikTok, Meta",
    period: "Jan 2023 – Present",
    place: "United States · Remote",
    note: "Joined as Performance Marketing Specialist, moved into the manager role in Aug 2023.",
    points: [
      "Lead a team of specialists across PPC strategy, process standardisation and new product launch planning.",
      "Work with 7 and 8-figure Amazon brands on category position, managing budgets up to seven figures.",
      "Built the SOPs, benchmarks and automation the account team runs on, plus unified reporting across regions and marketplaces.",
      "Advanced keyword and ASIN research feeding Brand Analytics-led competitive strategy.",
    ],
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
  },
  {
    company: "Freelance: Upwork, Fiverr & direct",
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
  },
];

function initials(name) {
  return name
    .replace(/[():].*$/, "")
    .split(/[\s,]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function Role({ r, i }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

  return (
    <motion.li
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative list-none rounded-[24px] border border-white/[0.1] bg-[#151517] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#F5C542]/30 hover:shadow-[0_20px_44px_-20px_rgba(0,0,0,0.7)] md:p-9"
    >
      <div className="grid gap-6 md:grid-cols-[auto_minmax(0,14rem)_minmax(0,1fr)] md:gap-10">
        <div
          aria-hidden
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F5C542]/[0.1] font-mono text-[1.1rem] font-bold text-[#F5C542] transition-colors duration-300 group-hover:bg-[#F5C542]/[0.18]"
        >
          {initials(r.company)}
        </div>

        <div>
          <div className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-[#F5C542]">
            {r.period}
          </div>
          <div className="mt-2 font-mono text-[0.64rem] font-medium uppercase tracking-[0.13em] text-[#9a9a9e]">
            {r.place}
          </div>
        </div>

        <div>
          <h3 className="text-[1.25rem] font-bold leading-snug text-[#EDE8E0]">{r.company}</h3>
          <p className="mt-1 text-[1rem] font-semibold text-[#d8d8dc]">{r.role}</p>

          {r.note && (
            <p className="mt-3 font-mono text-[0.64rem] font-medium uppercase leading-relaxed tracking-[0.1em] text-[#9a9a9e]">
              {r.note}
            </p>
          )}

          <ul className="mt-5 space-y-3">
            {r.points.map((p, k) => (
              <li
                key={k}
                className="grid grid-cols-[auto_1fr] gap-3 text-[0.96rem] font-medium leading-relaxed text-[#c7c7cc]"
              >
                <span aria-hidden className="mt-[0.6em] h-[3px] w-3 rounded-full bg-[#F5C542]" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
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
        <p className="mt-6 max-w-[58ch] text-[1.05rem] font-medium leading-relaxed text-[#b4b4b8]">
          Six years on Amazon advertising, from running my own private-label brand
          to managing seven-figure budgets for 8-figure sellers. Full history on
          LinkedIn.
        </p>

        <ul className="mt-14 flex list-none flex-col gap-5 p-0">
          {ROLES.map((r, i) => (
            <Role key={r.company} r={r} i={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
