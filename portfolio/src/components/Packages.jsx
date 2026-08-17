import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE, fadeUp, staggerContainer, staggerItem, viewportOnce } from "../lib/motion";
import ComparisonTable from "./ComparisonTable";

const CALENDLY = "https://calendly.com/sheikhanas1992/30min";

const TIERS = [
  {
    key: "launch",
    name: "Launch",
    count: "10 services included",
    items: [
      "3 shortlisted products",
      "Supplier selection and contract",
      "Freight arrangement",
      "Listing images and copywriting",
      "1 month PPC ads",
    ],
    more: "and 5 more",
    button: "Get started",
    href: CALENDLY,
    order: "order-2 md:order-1",
  },
  {
    key: "scale",
    name: "Scale",
    count: "16 services included",
    items: [
      "Everything in Launch",
      "Patent check",
      "Alibaba account setup and sample inspection",
      "Trademark and Brand Registry",
      "Software integrations and inventory planning",
    ],
    more: "and 11 more",
    button: "Get started",
    href: CALENDLY,
    order: "order-3 md:order-2",
  },
  {
    key: "dominate",
    name: "Dominate",
    count: "23 services included",
    items: [
      "Everything in Scale",
      "Brand name and logo and packaging",
      "3PL warehouse arrangement",
      "Advertising video and A+ Content",
      "3 months PPC ads",
    ],
    more: "and 18 more",
    button: "Get started",
    href: CALENDLY,
    order: "order-4 md:order-3",
  },
];

const BUILD_YOUR_OWN = {
  key: "build",
  name: "Build Your Own",
  badge: "Most flexible",
  description: "Most brands don't need all of it. Tell me what you're missing and I'll price only that.",
  count: "Choose from all 24 services",
  items: [
    "Pick only the services you need",
    "No paying for work you already have covered",
    "Scope and pricing back within two working days",
  ],
  more: null,
  button: "Build your package",
  href: "/build",
  order: "order-1 md:order-4",
};

function Check() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="mt-[3px] h-4 w-4 shrink-0 text-[#F5C542]">
      <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Rungs get visually heavier as the tier climbs, so the badge alone reads
   as a progression before any copy is read. */
const RUNG_BADGE = [
  "border border-white/[0.18] bg-[#0d0d0f] text-[#c7c7cc]",
  "border border-[#F5C542]/45 bg-[#F5C542]/[0.12] text-[#F5C542]",
  "border border-[#F5C542] bg-[#F5C542] text-[#0d0d0f]",
];

/** Mobile-only: Launch, Scale and Dominate as a connected, one-open-at-a-time
 * ladder instead of three more stacked cards (Build Your Own stays a
 * standalone hero card above this). */
function MobileLadder() {
  const [openKey, setOpenKey] = useState(null);

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute left-[19px] top-9 bottom-9 w-px bg-gradient-to-b from-white/[0.18] via-[#F5C542]/40 to-[#F5C542]"
      />
      <div className="flex flex-col gap-3">
        {TIERS.map((tier, i) => {
          const open = openKey === tier.key;
          return (
            <div key={tier.key} className="relative pl-12">
              <span
                aria-hidden
                className={`absolute -left-0 top-4 flex h-9 w-9 items-center justify-center rounded-full font-mono text-[0.8rem] font-bold ${RUNG_BADGE[i]}`}
              >
                {i + 1}
              </span>

              <button
                type="button"
                onClick={() => setOpenKey(open ? null : tier.key)}
                aria-expanded={open}
                className={`flex w-full items-center justify-between gap-3 rounded-[16px] border px-4 py-4 text-left transition-colors duration-200 ${
                  open ? "border-[#F5C542]/40 bg-[#1a1712]" : "border-white/[0.1] bg-[#151517]"
                }`}
              >
                <span>
                  <span className="block text-[1.05rem] font-black normal-case leading-tight text-[#EDE8E0]">
                    {tier.name}
                  </span>
                  <span className="mt-0.5 block font-mono text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[#F5C542]">
                    {tier.count}
                  </span>
                </span>
                <span
                  aria-hidden
                  className={`shrink-0 text-[1.1rem] text-[#F5C542] transition-transform duration-300 ${open ? "-rotate-180" : ""}`}
                >
                  ⌄
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 rounded-[16px] border border-white/[0.08] bg-[#131315] p-5">
                      <ul className="flex flex-col gap-2.5">
                        {tier.items.map((item) => (
                          <li
                            key={item}
                            className="grid grid-cols-[auto_1fr] gap-2.5 text-[0.85rem] font-medium leading-snug text-[#d8d8dc]"
                          >
                            <Check />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      {tier.more && (
                        <p className="mt-3 text-[0.8rem] font-semibold italic text-[#c7c7cc]">{tier.more}</p>
                      )}
                      <a
                        href={tier.href}
                        target={tier.href.startsWith("http") ? "_blank" : undefined}
                        rel={tier.href.startsWith("http") ? "noreferrer" : undefined}
                        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#F5C542]/50 bg-[#F5C542]/[0.06] px-5 py-3 font-mono text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#F5C542] transition-all duration-200 active:border-[#F5C542] active:bg-[#F5C542]/[0.14]"
                      >
                        {tier.button}
                        <span aria-hidden>→</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Card({ tier, feature = false }) {
  return (
    <motion.div
      variants={staggerItem}
      className={`${tier.order} relative flex h-full flex-col rounded-[20px] p-7 transition-all duration-300 ${
        feature
          ? "border-2 border-[#F5C542]/60 bg-gradient-to-b from-[#1c1a10] to-[#17150d] shadow-[0_20px_44px_-20px_rgba(245,197,66,0.25)]"
          : "border border-white/[0.1] bg-[#151517] hover:border-white/[0.2]"
      }`}
    >
      {feature && tier.badge && (
        <span className="absolute -top-3.5 left-7 rounded-full bg-[#F5C542] px-3 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.1em] text-[#0d0d0f]">
          {tier.badge}
        </span>
      )}

      <h3 className="text-[1.3rem] font-black normal-case leading-tight text-[#EDE8E0]">{tier.name}</h3>
      {tier.description && (
        <p className="mt-2 text-[0.92rem] font-medium leading-snug text-[#c7c7cc]">{tier.description}</p>
      )}
      <p className={`font-mono text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-[#F5C542] ${tier.description ? "mt-4" : "mt-3"}`}>
        {tier.count}
      </p>

      <ul className="mt-5 flex flex-col gap-2.5">
        {tier.items.map((item) => (
          <li
            key={item}
            className="grid grid-cols-[auto_1fr] gap-2.5 text-[0.86rem] font-medium leading-snug text-[#d8d8dc]"
          >
            <Check />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {tier.more && <p className="mt-3 text-[0.82rem] font-semibold italic text-[#c7c7cc]">{tier.more}</p>}

      <div className="mt-auto pt-7">
        <a
          href={tier.href}
          target={tier.href.startsWith("http") ? "_blank" : undefined}
          rel={tier.href.startsWith("http") ? "noreferrer" : undefined}
          className={
            feature
              ? "inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F5C542] px-7 py-3.5 font-mono text-[0.76rem] font-bold uppercase tracking-[0.14em] text-[#0d0d0f] shadow-[0_8px_24px_-8px_rgba(245,197,66,0.5)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              : "inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#F5C542]/50 bg-[#F5C542]/[0.06] px-5 py-3 font-mono text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#F5C542] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#F5C542] hover:bg-[#F5C542]/[0.14]"
          }
        >
          {tier.button}
          <span aria-hidden>→</span>
        </a>
      </div>
    </motion.div>
  );
}

export default function Packages() {
  const [showTable, setShowTable] = useState(false);

  return (
    <section id="packages" className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(50rem 30rem at 10% 100%, rgba(245,197,66,0.05), transparent 65%)",
        }}
      />
      <div className="mx-auto max-w-[1300px]">
        <motion.div variants={staggerContainer({ stagger: 0.1 })} initial="hidden" whileInView="show" viewport={viewportOnce}>
          <motion.h2
            variants={fadeUp({ distance: 20 })}
            className="text-[clamp(2.4rem,7vw,4.4rem)] font-black uppercase leading-[0.9] tracking-[-0.03em] text-[#EDE8E0]"
          >
            Packages
          </motion.h2>
          <motion.p variants={fadeUp({ distance: 16 })} className="mt-5 max-w-[52ch] text-[1.02rem] font-medium leading-relaxed text-[#c7c7cc]">
            Four ways to work together. Most brands end up building their own.
          </motion.p>
        </motion.div>

        {/* Desktop and tablet: four cards, equal height, in a grid. */}
        <motion.div
          variants={staggerContainer({ stagger: 0.08, delayChildren: 0.1 })}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 hidden items-stretch gap-5 md:grid md:grid-cols-2 lg:grid-cols-4"
        >
          {TIERS.map((tier) => (
            <Card key={tier.key} tier={tier} />
          ))}
          <Card tier={BUILD_YOUR_OWN} feature />
        </motion.div>

        {/* Mobile: Build Your Own stays a hero card up top, Launch/Scale/Dominate
            become a connected, tap-to-expand ladder instead of more stacked cards. */}
        <motion.div
          variants={staggerContainer({ stagger: 0.1, delayChildren: 0.1 })}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 flex flex-col gap-8 md:hidden"
        >
          <Card tier={{ ...BUILD_YOUR_OWN, order: "" }} feature />
          <MobileLadder />
        </motion.div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShowTable((v) => !v)}
            aria-expanded={showTable}
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.16] px-6 py-3 font-mono text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#d8d8dc] transition-all duration-200 hover:border-[#F5C542]/50 hover:bg-[#F5C542]/[0.08] hover:text-[#F5C542]"
          >
            Compare all 24 services
            <span
              aria-hidden
              className={`inline-block transition-transform duration-300 ${showTable ? "-rotate-180" : ""}`}
            >
              ⌄
            </span>
          </button>
        </div>

        <AnimatePresence initial={false}>
          {showTable && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-8">
                <ComparisonTable />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="text-[0.98rem] font-medium text-[#c7c7cc]">Not sure which fits?</p>
          <a
            href="/audit"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#F5C542]/50 bg-[#F5C542]/[0.06] px-6 py-3 font-mono text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#F5C542] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#F5C542] hover:bg-[#F5C542]/[0.14]"
          >
            Request a free audit
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
