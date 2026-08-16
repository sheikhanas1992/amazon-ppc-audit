import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "../lib/motion";
import ComparisonTable from "./ComparisonTable";

const CALENDLY = "https://calendly.com/sheikhanas1992/30min";

const TIERS = [
  {
    key: "launch",
    name: "Launch",
    description: "For a first product, done properly.",
    count: "10 services included",
    items: [
      "3 shortlisted products",
      "Supplier selection and contract",
      "Freight arrangement",
      "Listing images and copywriting",
      "1 month PPC ads",
    ],
    more: "and 3 more",
    button: "Get started",
    href: CALENDLY,
    order: "order-2 md:order-1",
  },
  {
    key: "scale",
    name: "Scale",
    description: "For sellers adding a second or third SKU.",
    count: "16 services included",
    items: [
      "Everything in Launch",
      "Patent check",
      "Alibaba account setup and sample inspection",
      "Trademark and Brand Registry",
      "Software integrations and inventory planning",
    ],
    more: null,
    button: "Get started",
    href: CALENDLY,
    order: "order-3 md:order-2",
  },
  {
    key: "dominate",
    name: "Dominate",
    description: "Everything, end to end, nothing outsourced.",
    count: "23 services included",
    items: [
      "Everything in Scale",
      "Brand name and logo and packaging",
      "3PL warehouse arrangement",
      "Advertising video and A+ Content",
      "3 months PPC ads",
    ],
    more: "and 2 more",
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
      <p className="mt-2 text-[0.92rem] font-medium leading-snug text-[#c7c7cc]">{tier.description}</p>
      <p className="mt-4 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-[#F5C542]">
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

      {tier.more && <p className="mt-3 text-[0.8rem] font-medium italic text-[#9a9a9e]">{tier.more}</p>}

      <div className="mt-auto pt-7">
        <a
          href={tier.href}
          target={tier.href.startsWith("http") ? "_blank" : undefined}
          rel={tier.href.startsWith("http") ? "noreferrer" : undefined}
          className={
            feature
              ? "inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F5C542] px-7 py-3.5 font-mono text-[0.76rem] font-bold uppercase tracking-[0.14em] text-[#0d0d0f] shadow-[0_8px_24px_-8px_rgba(245,197,66,0.5)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              : "inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/[0.16] px-5 py-2.5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#d8d8dc] transition-all duration-200 hover:border-[#F5C542]/50 hover:bg-[#F5C542]/[0.08] hover:text-[#F5C542]"
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

        <motion.div
          variants={staggerContainer({ stagger: 0.08, delayChildren: 0.1 })}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-4"
        >
          {TIERS.map((tier) => (
            <Card key={tier.key} tier={tier} />
          ))}
          <Card tier={BUILD_YOUR_OWN} feature />
        </motion.div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShowTable((v) => !v)}
            aria-expanded={showTable}
            className="inline-flex items-center gap-2 font-mono text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-[#F5C542] transition-colors duration-200 hover:text-[#EDE8E0]"
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

        <p className="mt-14 text-center text-[0.98rem] font-medium text-[#c7c7cc]">
          Not sure which fits?{" "}
          <a
            href="/audit"
            className="font-semibold text-[#F5C542] underline decoration-[#F5C542]/40 underline-offset-4 transition-colors hover:text-[#EDE8E0]"
          >
            Request a free audit →
          </a>
        </p>
      </div>
    </section>
  );
}
