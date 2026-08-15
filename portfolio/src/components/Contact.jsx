import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

const EMAIL = "sheikhanas1992@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/muhammad-anas-amz-brand-manager-ppc-expert/";
const WHATSAPP =
  "https://wa.me/923177748484?text=Hi%20Sheikh%2C%20I%20found%20your%20portfolio%20and%20wanted%20to%20get%20in%20touch.";
const CALENDLY = "https://calendly.com/sheikhanas1992/30min";

/* Monochrome logo marks. Shape carries the identity, not colour: the site's
   accent yellow is reserved for the sparkle mark, so these use currentColor
   and lean on the icon silhouette to stay recognisable. */
function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.5 8.25h4.75V23H.5V8.25ZM8.5 8.25h4.55v2.01h.06c.63-1.2 2.18-2.47 4.49-2.47 4.8 0 5.7 3.16 5.7 7.27V23h-4.75v-6.98c0-1.66-.03-3.8-2.32-3.8-2.32 0-2.68 1.81-2.68 3.68V23H8.5V8.25Z" />
    </svg>
  );
}

function GmailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="2" y="4.5" width="20" height="15" rx="2" />
      <path d="M3 6.5 12 13 21 6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.02 2C6.5 2 2.04 6.46 2.04 11.98c0 1.85.5 3.58 1.36 5.07L2 22l5.1-1.34a9.96 9.96 0 0 0 4.92 1.3h.01c5.52 0 9.98-4.46 9.98-9.98C21.99 6.46 17.54 2 12.02 2Zm5.86 14.13c-.25.7-1.24 1.28-2.03 1.45-.55.12-1.26.21-3.66-.78-2.98-1.24-4.9-4.26-5.05-4.46-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.25-.28.55-.35.73-.35s.37 0 .53.01c.17.01.4-.06.62.48.25.6.85 2.08.92 2.23.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.3.76 1.26 1.64 2.04 1.13 1 2.08 1.32 2.38 1.47.3.15.47.12.65-.08.17-.2.74-.86.94-1.16.2-.3.4-.25.65-.15.27.1 1.7.8 1.99.95.3.15.5.22.57.35.07.13.07.75-.18 1.45Z" />
    </svg>
  );
}

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
      href={CALENDLY}
      target="_blank"
      rel="noreferrer"
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: reduce ? 0 : sx, y: reduce ? 0 : sy }}
      className="inline-flex items-center gap-3 rounded-full bg-[#F5C542] px-9 py-[1.15rem] font-mono text-[0.82rem] font-bold uppercase tracking-[0.14em] text-[#0d0d0f] shadow-[0_10px_28px_-8px_rgba(245,197,66,0.55)] transition-shadow duration-200 hover:shadow-[0_14px_32px_-6px_rgba(245,197,66,0.65)]"
    >
      Get in touch
      <span aria-hidden>→</span>
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
          <span className="relative flex h-2 w-2">
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full bg-[#9BE6B4]"
              animate={{ scale: [1, 2.2, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#9BE6B4]" />
          </span>
          <span className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#d8d8dc]">
            Open for new Amazon PPC accounts
          </span>
        </motion.div>

        <motion.h2
          variants={fadeUp({ distance: 24 })}
          className="mx-auto max-w-[16ch] text-[clamp(2.4rem,7vw,5.2rem)] font-black uppercase leading-[0.9] tracking-[-0.03em] text-[#EDE8E0]"
        >
          Let's talk
        </motion.h2>

        <motion.p variants={fadeUp({ distance: 16 })} className="mx-auto mt-6 max-w-[46ch] text-[1.02rem] font-medium text-[#c7c7cc]">
          If your PPC feels unstructured, unprofitable or hard to scale, send me the account and
          I'll tell you what I see in it.
        </motion.p>

        <motion.div
          variants={fadeUp({ distance: 18 })}
          className="mt-10 flex flex-col items-center gap-5"
        >
          <MagneticCTA />
          <a
            href="/audit"
            className="rounded-full border border-[#F5C542]/40 bg-[#F5C542]/[0.06] px-5 py-2.5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#F5C542] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F5C542]/[0.14]"
          >
            Or request a free account audit
          </a>
        </motion.div>

        <motion.div variants={fadeUp({ distance: 16 })} className="mt-10 flex items-center justify-center gap-3">
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer"
            aria-label="Sheikh Anas on LinkedIn"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.16] text-[#c7c7cc] transition-all duration-200 hover:-translate-y-1 hover:border-[#F5C542]/60 hover:text-[#F5C542]"
          >
            <LinkedInIcon className="h-[18px] w-[18px]" />
          </a>
          <a
            href={`mailto:${EMAIL}`}
            aria-label="Email Sheikh Anas"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.16] text-[#c7c7cc] transition-all duration-200 hover:-translate-y-1 hover:border-[#F5C542]/60 hover:text-[#F5C542]"
          >
            <GmailIcon className="h-[19px] w-[19px]" />
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            aria-label="Message Sheikh Anas on WhatsApp"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.16] text-[#c7c7cc] transition-all duration-200 hover:-translate-y-1 hover:border-[#F5C542]/60 hover:text-[#F5C542]"
          >
            <WhatsAppIcon className="h-[19px] w-[19px]" />
          </a>
        </motion.div>
      </motion.div>

      <footer className="mt-20 flex flex-col items-center gap-4 border-t border-white/[0.1] pt-8 text-[0.8rem] font-semibold text-[#c7c7cc] md:flex-row md:justify-between">
        <span className="font-mono uppercase tracking-[0.12em]">© {new Date().getFullYear()} Sheikh Anas</span>
        <div className="flex gap-6 font-mono uppercase tracking-[0.12em]">
          <a href={LINKEDIN} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#EDE8E0]">
            LinkedIn
          </a>
          <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-[#EDE8E0]">
            Email
          </a>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#EDE8E0]">
            WhatsApp
          </a>
        </div>
      </footer>
    </section>
  );
}
