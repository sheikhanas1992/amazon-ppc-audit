/**
 * Shared motion primitives. One easing curve, everywhere — mixing eases is
 * what makes a site feel assembled by committee.
 */
export const EASE = [0.16, 1, 0.3, 1];

/** Pass to whileInView so every scroll entrance fires once, not on every pass. */
export const viewportOnce = { once: true, margin: "-15% 0px" };

export function fadeUp({ delay = 0, distance = 24, duration = 0.9 } = {}) {
  return {
    hidden: { opacity: 0, y: distance },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration, delay, ease: EASE },
    },
  };
}

export function fadeIn({ delay = 0, duration = 0.8 } = {}) {
  return {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration, delay, ease: EASE } },
  };
}

export function staggerContainer({ stagger = 0.06, delayChildren = 0 } = {}) {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

export const staggerItem = fadeUp({ distance: 14, duration: 0.7 });
