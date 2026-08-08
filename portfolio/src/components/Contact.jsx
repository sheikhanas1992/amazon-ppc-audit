import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

const EMAIL = "m.anas@amzonestep.com";
const LINKEDIN = "https://www.linkedin.com/in/muhammad-anas/";

function MagneticCTA() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });

  const handleMove = (e) => {
    if (reduce) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    x.set(px * 16);
    y.set(py * 16);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={`mailto:${EMAIL}`}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: reduce ? 0 : sx, y: reduce ? 0 : sy }}
      className="inline-flex items-center gap-3 rounded-full border border-white/[0.14] bg-[#151517] px-8 py-4 font-mono text-[0.78rem] uppercase tracking-[0.14em] text-[#EDE8E0] transition-colors hover:border-[#F5C542]/60 hover:text-[#F5C542]"
    >
      Get in touch
    </motion.a>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-[1100px] px-6 py-28 text-center md:px-10 md:py-40">
      <motion.div
        variants={staggerContainer({ stagger: 0.1 })}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <motion.div variants={fadeUp({ distance: 10 })} className="mb-6 flex items-center justify-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#9BE6B4]" />
          <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[#9a9a9e]">
            Open to full-time & contract PPC roles · Remote
          </span>
        </motion.div>

        <motion.h2
          variants={fadeUp({ distance: 24 })}
          className="mx-auto max-w-[16ch] text-[clamp(2.4rem,7vw,5.2rem)] font-black uppercase leading-[0.9] tracking-[-0.03em] text-[#EDE8E0]"
        >
          Let's talk
        </motion.h2>

        <motion.p variants={fadeUp({ distance: 16 })} className="mx-auto mt-6 max-w-[46ch] text-[0.98rem] text-[#9a9a9e]">
          If you're hiring for Amazon PPC or performance marketing, I'd like to hear about it.
        </motion.p>

        <motion.div variants={fadeUp({ distance: 18 })} className="mt-10">
          <MagneticCTA />
        </motion.div>
      </motion.div>

      <footer className="mt-28 flex flex-col items-center gap-4 border-t border-white/[0.08] pt-8 text-[0.72rem] text-[#6e6e73] md:flex-row md:justify-between">
        <span className="font-mono uppercase tracking-[0.12em]">© {new Date().getFullYear()} Muhammad Anas</span>
        <div className="flex gap-6 font-mono uppercase tracking-[0.12em]">
          <a href={LINKEDIN} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#EDE8E0]">
            LinkedIn
          </a>
          <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-[#EDE8E0]">
            Email
          </a>
        </div>
      </footer>
    </section>
  );
}
