import { lazy, Suspense } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Optimizer from "./components/Optimizer";
import SparkleBadge from "./components/SparkleBadge";

const LowerSections = lazy(() => import("./components/LowerSections"));

export default function App() {
  return (
    <div id="top">
      <Nav />
      <SparkleBadge />
      <main>
        <Hero />
        <div
          className="relative overflow-hidden border-y border-white/[0.1]"
          style={{
            background:
              "radial-gradient(50rem 30rem at 15% 0%, rgba(245,197,66,0.08), transparent 60%), linear-gradient(180deg, #111113 0%, #0f0f11 55%, #111113 100%)",
          }}
        >
          <Optimizer />
        </div>
        <Suspense fallback={null}>
          <LowerSections />
        </Suspense>
      </main>
    </div>
  );
}
