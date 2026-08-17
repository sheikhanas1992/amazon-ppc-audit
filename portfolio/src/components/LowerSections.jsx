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
      <div
        className="relative overflow-hidden border-t border-white/[0.18]"
        style={{
          background:
            "radial-gradient(50rem 30rem at 85% 0%, rgba(143,184,232,0.17), transparent 65%), linear-gradient(180deg, #121a29 0%, #0d0f16 100%)",
        }}
      >
        <Experience />
      </div>
      <div className="border-t border-white/[0.18] bg-[#0d0d0f]">
        <Packages />
      </div>
      <div
        className="relative overflow-hidden border-t border-white/[0.18]"
        style={{
          background:
            "radial-gradient(50rem 30rem at 15% 0%, rgba(155,230,180,0.16), transparent 65%), linear-gradient(180deg, #0f1e14 0%, #0c110d 100%)",
        }}
      >
        <HowIWork />
      </div>
      <div className="border-t border-white/[0.18] bg-[#0d0d0f]">
        <Skills />
      </div>
      <div
        className="relative overflow-hidden border-t border-white/[0.18]"
        style={{
          background:
            "radial-gradient(60rem 34rem at 50% 0%, rgba(245,197,66,0.18), transparent 60%), linear-gradient(180deg, #1c1509 0%, #0f0c07 100%)",
        }}
      >
        <Contact />
      </div>
    </>
  );
}
