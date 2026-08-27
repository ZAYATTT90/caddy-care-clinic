import { motion } from "motion/react";
import { SPECIALIZATIONS } from "@/lib/home-data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const pill = {
  hidden: { opacity: 0, y: 26, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 320, damping: 18, mass: 0.7 },
  },
};

const tintClass = {
  care: "bg-primary/15 text-primary",
  ember: "bg-accent/20 text-accent-foreground",
  gold: "bg-gold/25 text-foreground",
} as const;

export function SpecializationPills() {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="flex flex-wrap justify-center gap-3"
    >
      {SPECIALIZATIONS.map((s) => (
        <motion.li key={s.id} variants={pill}>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05, boxShadow: "var(--shadow-glow)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 420, damping: 22 }}
            className="glass-card flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold"
          >
            <motion.span
              className={`grid size-8 place-items-center rounded-full text-base ${tintClass[s.tint]}`}
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 12 }}
            >
              <span aria-hidden>{s.icon}</span>
            </motion.span>
            {s.label}
          </motion.button>
        </motion.li>
      ))}
    </motion.ul>
  );
}
