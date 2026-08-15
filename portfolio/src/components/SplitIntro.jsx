import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

/**
 * SplitIntro
 * ---------------------------------------------------------------------------
 * Two short paragraphs, left and right, directly under the hero. Sets up the
 * core position (ads, listings and launches as one system) before the case
 * studies and demo make the case for it.
 * ---------------------------------------------------------------------------
 */
export default function SplitIntro() {
  return (
    <section id="intro" className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(42rem 26rem at 10% 100%, rgba(245,197,66,0.045), transparent 65%)",
        }}
      />
      <motion.div
        variants={staggerContainer({ stagger: 0.12 })}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto grid max-w-[1300px] gap-10 md:grid-cols-2 md:gap-16"
      >
        <motion.p
          variants={fadeUp({ distance: 18 })}
          className="text-[1.15rem] font-medium leading-relaxed text-[#EDE8E0] md:text-[1.25rem]"
        >
          Most sellers hire someone to run ads. What they actually need is someone who treats
          ads, listings and launches as one system, because no campaign can fix a page that does
          not convert. I run that whole system for 5 to 8 figure Amazon brands.
        </motion.p>
        <motion.p
          variants={fadeUp({ distance: 18, delay: 0.08 })}
          className="text-[1.02rem] font-medium leading-relaxed text-[#b4b4b8]"
        >
          Six years in. 400+ products launched, brands running $2M to $10M a year, and a 40%
          conversion lift from listing and creative work. Currently more than 20 accounts across
          supplements, personal care, home, sporting goods and hardware.
        </motion.p>
      </motion.div>
    </section>
  );
}
