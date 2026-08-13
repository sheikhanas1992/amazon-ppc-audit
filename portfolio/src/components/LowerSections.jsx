import { motion } from "framer-motion";
import About from "./About";
import Experience from "./Experience";
import Contact from "./Contact";
import AmbientField from "./AmbientField";
import { fadeIn, viewportOnce } from "../lib/motion";

/** Full-bleed break between About and Experience: the design calls for
 * alternating full-bleed and contained sections so the page doesn't
 * read as one uniform stack. */
function SectionBreak() {
  return (
    <div className="relative flex h-[36vh] items-center justify-center overflow-hidden md:h-[44vh]">
      <AmbientField density={0.8} speed={0.7} />
      <motion.p
        variants={fadeIn({ duration: 1 })}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative font-mono text-[0.78rem] font-semibold uppercase tracking-[0.3em] text-[#b4b4b8]"
      >
        Track record
      </motion.p>
    </div>
  );
}

/** Everything below the flagship Optimizer section, grouped into one lazy
 * chunk so the critical above-the-fold bundle (Hero + Optimizer) stays
 * small and doesn't have to wait on this JS to parse and evaluate. */
export default function LowerSections() {
  return (
    <>
      <About />
      <SectionBreak />
      <Experience />
      <div className="border-t border-white/[0.06] bg-[#111113]">
        <Contact />
      </div>
    </>
  );
}
