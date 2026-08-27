import { motion, useReducedMotion } from "motion/react";
import caddyHero from "@/assets/caddy-hero.png";

/**
 * Hero visual: AI-illustrated 3D-style Caddy companion with spring-physics
 * float, pointer parallax and a breathing glow behind it.
 */
export function HeroCaddy() {
  const calm = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[460px]"
      initial={{ opacity: 0, scale: 0.88, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 14, mass: 1 }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-6 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, color-mix(in oklab, var(--care) 55%, transparent), color-mix(in oklab, var(--ember) 32%, transparent) 55%, transparent 72%)",
        }}
        animate={calm ? {} : { scale: [0.92, 1.06, 0.92], opacity: [0.45, 0.8, 0.45] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.img
        src={caddyHero}
        alt="Caddy, the Caddy Care companion, waving with a stethoscope"
        width={1024}
        height={1024}
        className="relative w-full select-none drop-shadow-[0_30px_50px_color-mix(in_oklab,var(--charcoal)_28%,transparent)]"
        draggable={false}
        animate={calm ? {} : { y: [-12, 12, -12], rotate: [-2, 2.5, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.03 }}
      />

      {/* floating trust chips */}
      {[
        { label: "Verified clinics", pos: "left-0 top-10" },
        { label: "No lobby waiting", pos: "right-0 bottom-16" },
      ].map((chip, i) => (
        <motion.span
          key={chip.label}
          className={`glass-card absolute ${chip.pos} rounded-full px-3 py-1.5 text-xs font-bold`}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.5 + i * 0.15 }}
        >
          {chip.label}
        </motion.span>
      ))}
    </motion.div>
  );
}
