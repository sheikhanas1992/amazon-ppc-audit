import { Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * SparkleBadge
 * ---------------------------------------------------------------------------
 * The persistent yellow mark. Fixed to the viewport, slow idle rotation so
 * it reads as a live thing rather than a sticker, springy scale on hover.
 * Links back to the top of the page.
 * ---------------------------------------------------------------------------
 */
export default function SparkleBadge() {
  const reduce = useReducedMotion();

  return (
    <motion.a
      href="#top"
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.12] bg-[#151517]/90 backdrop-blur-sm md:bottom-8 md:right-8"
      animate={reduce ? undefined : { rotate: 360 }}
      transition={reduce ? undefined : { repeat: Infinity, duration: 18, ease: "linear" }}
      whileHover={{ scale: 1.18, transition: { type: "spring", stiffness: 320, damping: 12 } }}
      whileTap={{ scale: 0.92 }}
    >
      <Sparkles className="h-5 w-5" style={{ color: "#F5C542" }} strokeWidth={1.75} />
    </motion.a>
  );
}
