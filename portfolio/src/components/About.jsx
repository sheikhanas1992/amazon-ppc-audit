import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

const INTRO = [
  "What you just watched happen to one campaign is what I do to an entire account, every week.",
  "Most Amazon brands don't have a traffic problem. They have a structure problem: spend climbs, ACOS drifts, and a growth engine quietly turns into a cost nobody wants to question.",
];

const CLOSING = "No guesswork. Every decision has a reason I can explain to you, in writing, every week.";

const METHOD = [
  {
    n: "01",
    label: "Audit",
    body: "Reads the account as it actually is, not as the dashboard summarises it: search term reports, bid history, placement data, and the pages the traffic lands on.",
  },
  {
    n: "02",
    label: "Fix",
    body: "Restructures before spending, because pushing budget into a page that doesn't convert only makes the loss arrive faster.",
  },
  {
    n: "03",
    label: "Scale",
    body: "Expands what's proven, on a system, with a TACOS ceiling and a stop-loss rule agreed before the money moves.",
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
        {/* Left: statement, narrative, closing line and CTA */}
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
            {INTRO.map((p, i) => (
              <motion.p
                key={i}
                variants={fadeUp({ distance: 16 })}
                className="max-w-[58ch] text-[1rem] font-medium leading-relaxed text-[#c7c7cc]"
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.p
            variants={fadeUp({ distance: 16 })}
            className="mt-6 max-w-[54ch] text-[1.08rem] font-bold leading-relaxed text-[#EDE8E0]"
          >
            {CLOSING}
          </motion.p>

          <motion.div
            variants={fadeUp({ distance: 14 })}
            className="mt-8 rounded-[16px] border border-[#F5C542]/25 bg-[#F5C542]/[0.05] p-6"
          >
            <p className="max-w-[54ch] text-[0.96rem] font-medium leading-relaxed text-[#c7c7cc]">
              I also run a free full account audit covering PPC, listings and growth opportunities. If your ads feel
              unstructured, unprofitable or hard to scale, that's the place to start.
            </p>
            <a
              href="/audit"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#F5C542] px-6 py-3 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#0d0d0f] shadow-[0_6px_18px_-6px_rgba(245,197,66,0.5)] transition-transform duration-200 hover:scale-[1.04] active:scale-[0.97]"
            >
              Request a free account audit
              <span aria-hidden>→</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right: the method, Audit, Fix, Scale, as a connected sequence */}
        <motion.div
          variants={staggerContainer({ stagger: 0.12, delayChildren: 0.12 })}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col md:pt-2"
        >
          <motion.h3
            variants={fadeUp({ distance: 12 })}
            className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#c7c7cc]"
          >
            My approach: Audit, Fix, Scale
          </motion.h3>

          <div className="relative mt-7">
            <div
              aria-hidden
              className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-[#F5C542]/50 via-[#F5C542]/20 to-transparent"
            />
            <div className="flex flex-col gap-5">
              {METHOD.map((m) => (
                <motion.div key={m.n} variants={fadeUp({ distance: 14 })} className="relative">
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-[#F5C542]/50 bg-[#151517] font-mono text-[0.85rem] font-bold text-[#F5C542]"
                  >
                    {m.n}
                  </span>
                  <div className="ml-[3.25rem] rounded-[16px] border border-white/[0.09] bg-[#151517] p-5">
                    <p className="text-[1.05rem] font-bold text-[#EDE8E0]">{m.label}</p>
                    <p className="mt-1.5 text-[0.92rem] font-medium leading-relaxed text-[#c7c7cc]">{m.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
