import { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "motion/react";

const CaddyMascot = lazy(() => import("./CaddyMascot"));

/**
 * Client-only stage for the 3D Caddy mascot.
 * SSR never evaluates three.js — the module is imported after hydration.
 */
export function CaddyStage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      {/* breathing glow behind Caddy */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-4 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, color-mix(in oklab, var(--care) 55%, transparent), color-mix(in oklab, var(--ember) 30%, transparent) 55%, transparent 72%)",
        }}
        animate={{ scale: [0.92, 1.06, 0.92], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0">
        {mounted ? (
          <Suspense fallback={null}>
            <CaddyMascot />
          </Suspense>
        ) : null}
      </div>
      <span className="sr-only">Caddy, your animated care companion</span>
    </div>
  );
}
