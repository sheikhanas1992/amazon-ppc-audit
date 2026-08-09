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
        <Optimizer />
        <Suspense fallback={null}>
          <LowerSections />
        </Suspense>
      </main>
    </div>
  );
}
