import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll } from "framer-motion";

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

function Role({ r, i, isFirst }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

  return (
    <motion.li
      ref={ref}
      initial={reduce ? false : { opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative list-none pl-[4.75rem] md:pl-[6rem]"
    >
      {/* Timeline node: sits on the connecting line, glow ring pulses in. */}
      <motion.div
        aria-hidden
        initial={reduce ? false : { scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.55, delay: i * 0.12 + 0.1, ease: [0.34, 1.56, 0.64, 1] }}
        className="absolute left-0 top-0 z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#F5C542]/50 bg-[#151517] font-mono text-[1.1rem] font-bold text-[#F5C542] shadow-[0_0_0_5px_#0d0d0f,0_0_24px_-6px_rgba(245,197,66,0.5)] md:h-16 md:w-16"
      >
        {isFirst && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-2xl border border-[#F5C542]/60"
            animate={reduce ? {} : { scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        {initials(r.company)}
      </motion.div>

      <div className="group relative overflow-hidden rounded-[24px] border border-white/[0.1] bg-gradient-to-b from-[#17171a] to-[#141416] p-7 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] transition-all duration-300 hover:-translate-y-1 hover:border-[#F5C542]/35 hover:shadow-[0_24px_48px_-20px_rgba(0,0,0,0.75)] md:p-9">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#F5C542] to-transparent transition-transform duration-500 group-hover:scale-x-100"
        />

        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="text-[1.3rem] font-bold leading-snug text-[#EDE8E0]">{r.company}</h3>
          <div className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-[#F5C542]">
            {r.period}
          </div>
        </div>
        <div className="mt-1 flex flex-wrap items-baseline justify-between gap-3">
          <p className="text-[1.02rem] font-semibold text-[#d8d8dc]">{r.role}</p>
          <div className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.13em] text-[#9a9a9e]">
            {r.place}
          </div>
        </div>

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
    </motion.li>
  );
}

/** Vertical spine connecting every role node, filling in as you scroll. */
function Timeline({ children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 55%"],
  });

  return (
    <div ref={ref} className="relative">
      <div
        aria-hidden
        className="absolute left-7 top-7 bottom-7 w-[2px] bg-white/[0.09] md:left-8"
      />
      <motion.div
        aria-hidden
        style={{ scaleY: reduce ? 1 : scrollYProgress }}
        className="absolute left-7 top-7 bottom-7 w-[2px] origin-top bg-gradient-to-b from-[#F5C542] via-[#F5C542]/70 to-[#F5C542]/10 md:left-8"
      />
      <ul className="flex flex-col gap-8 p-0">{children}</ul>
    </div>
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

        <div className="mt-14">
          <Timeline>
            {ROLES.map((r, i) => (
              <Role key={r.company} r={r} i={i} isFirst={i === 0} />
            ))}
          </Timeline>
        </div>
      </div>
    </section>
  );
}
