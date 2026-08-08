import { motion } from "framer-motion";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Optimizer from "./components/Optimizer";
import About from "./components/About";
import Experience from "./components/Experience";
import CaseStudies from "./components/CaseStudies";
import Contact from "./components/Contact";
import SparkleBadge from "./components/SparkleBadge";
import AmbientField from "./components/AmbientField";
import { fadeIn, viewportOnce } from "./lib/motion";

/** Full-bleed break between About and Experience — the design brief calls
 * for alternating full-bleed and contained sections so the page doesn't
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
        className="relative font-mono text-[0.72rem] uppercase tracking-[0.3em] text-[#6e6e73]"
      >
        Track record
      </motion.p>
    </div>
  );
}

export default function App() {
  return (
    <div id="top">
      <Nav />
      <SparkleBadge />
      <main>
        <Hero />
        <Optimizer />
        <About />
        <SectionBreak />
        <Experience />
        <CaseStudies />
        <Contact />
      </main>
    </div>
  );
}
