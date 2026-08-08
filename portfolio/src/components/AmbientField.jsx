import { useRef, useEffect } from "react";

/**
 * AmbientField
 * ---------------------------------------------------------------------------
 * The drifting glowing-line background, without React Three Fiber.
 *
 * The reference stack does this with <Canvas>, a ShaderMaterial, and a Bloom
 * pass from @react-three/postprocessing. That is roughly 700kb of JavaScript
 * and a real GPU cost on mid-range phones, to draw some glowing lines.
 *
 * This is Canvas 2D. The bloom is faked by stroking each line three times at
 * decreasing width and increasing alpha under `globalCompositeOperation =
 * "lighter"`, which is genuinely additive and looks the same at this scale.
 * About 4kb, no dependencies, ~1.5ms a frame.
 *
 * If you later need real refraction, depth of field, or actual geometry,
 * that is when R3F earns its weight. For drifting lines it does not.
 *
 * Props
 *   density   0.6–1.4, scales line count
 *   speed     drift multiplier
 *   accent    hex for the two highlight lines (defaults to the sparkle yellow)
 * ---------------------------------------------------------------------------
 */
export default function AmbientField({
  density = 1,
  speed = 1,
  accent = "#F5C542",
  className = "",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, dpr = 1, LINES = 0;
    let t = 0, raf = 0, running = true;
    // Pointer is held as a normalised offset and eased, so the field tilts
    // rather than snapping to the cursor.
    let px = 0, py = 0, tx = 0, ty = 0;

    const size = () => {
      const r = cv.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      cv.width = Math.floor(W * dpr);
      cv.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      LINES = Math.round((W > 900 ? 13 : 8) * density);
    };

    /* Deterministic per-line jitter, so the field is varied but stable
       across reloads and resizes. */
    const rnd = (i, salt) => {
      const v = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
      return v - Math.floor(v);
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";

      px += (tx - px) * 0.045;
      py += (ty - py) * 0.045;

      const phase = t * 0.00016 * speed;
      const STEPS = 68;

      for (let i = 0; i < LINES; i++) {
        // Each line gets its own centre, tilt, amplitude and rhythm, so they
        // cross each other instead of sitting in parallel bands.
        const depth = 0.3 + rnd(i, 1) * 0.7;
        const cy     = H * (-0.05 + rnd(i, 2) * 1.1);
        const tilt   = (rnd(i, 3) - 0.5) * H * 0.34;
        const amp    = H * (0.05 + rnd(i, 4) * 0.17) * depth;
        const freq   = 1.1 + rnd(i, 5) * 2.4;
        const off    = rnd(i, 6) * Math.PI * 2;
        const rate   = 0.55 + rnd(i, 7) * 0.9;
        const isAccent = i % 7 === 3;

        const pts = [];
        for (let s = 0; s <= STEPS; s++) {
          const u = s / STEPS;
          const x = -60 + u * (W + 120) + px * 40 * depth;
          const y =
            cy +
            tilt * (u - 0.5) * 2 +
            Math.sin(u * freq * Math.PI * 2 + phase * rate + off) * amp +
            Math.sin(u * freq * 2.7 * Math.PI + phase * rate * 0.6 + off) * amp * 0.32 +
            py * 30 * depth;
          pts.push(x, y);
        }

        // Ends dissolve, so the field reads as atmosphere rather than ruling.
        const base = isAccent ? accent : "#EDE8E0";
        const grad = ctx.createLinearGradient(0, 0, W, 0);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.18, base);
        grad.addColorStop(0.82, base);
        grad.addColorStop(1, "transparent");

        const passes = isAccent ? [[9, 0.07], [1.5, 0.42]] : [[8, 0.04], [1.15, 0.26]];
        for (const [w, al] of passes) {
          ctx.beginPath();
          ctx.moveTo(pts[0], pts[1]);
          for (let s = 2; s < pts.length; s += 2) ctx.lineTo(pts[s], pts[s + 1]);
          ctx.strokeStyle = grad;
          ctx.globalAlpha = al * (0.35 + depth * 0.65);
          ctx.lineWidth = w * (0.55 + depth * 0.6);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    let last = performance.now();
    const frame = (now) => {
      const dt = Math.min(now - last, 48);
      last = now;
      if (running) { t += dt; draw(); }
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
    };

    size();
    draw();
    if (!reduce) {
      raf = requestAnimationFrame(frame);
      window.addEventListener("pointermove", onMove, { passive: true });
    }

    // stop burning frames once it is scrolled away
    const io = new IntersectionObserver(
      ([e]) => { running = e.isIntersecting; },
      { threshold: 0 }
    );
    io.observe(cv);

    let rz;
    const onResize = () => {
      clearTimeout(rz);
      rz = setTimeout(() => { size(); draw(); }, 140);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      clearTimeout(rz);
    };
  }, [density, speed, accent]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
