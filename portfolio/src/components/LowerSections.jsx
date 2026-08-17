import About from "./About";
import Experience from "./Experience";
import Contact from "./Contact";
import HowIWork from "./HowIWork";
import Packages from "./Packages";
import Skills from "./Skills";

/** Everything below the flagship Optimizer section, grouped into one lazy
 * chunk so the critical above-the-fold bundle (Hero + Optimizer) stays
 * small and doesn't have to wait on this JS to parse and evaluate. */
export default function LowerSections() {
  return (
    <>
      <About />
      <Experience />
      <div className="border-t border-white/[0.06]">
        <Packages />
      </div>
      <HowIWork />
      <div className="border-t border-white/[0.06]">
        <Skills />
      </div>
      <div
        className="relative overflow-hidden border-t border-white/[0.06]"
        style={{
          background:
            "radial-gradient(60rem 34rem at 50% 0%, rgba(245,197,66,0.07), transparent 60%), linear-gradient(180deg, #111113 0%, #0f0f11 100%)",
        }}
      >
        <Contact />
      </div>
    </>
  );
}
