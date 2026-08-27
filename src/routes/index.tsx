import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { CaddyStage } from "@/components/caddy/CaddyStage";
import { SpecializationPills } from "@/components/caddy/SpecializationPills";
import { DoctorCarousel } from "@/components/caddy/DoctorCarousel";
import { QueueTeaser } from "@/components/caddy/QueueTeaser";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Caddy Care — Book Doctors & Dentists in Seconds" },
      {
        name: "description",
        content:
          "Caddy Care is a premium appointment booking app for doctors and dentists — live queue tracking, verified specialists and instant slots, guided by your Caddy companion.",
      },
      { property: "og:title", content: "Caddy Care — Book Doctors & Dentists in Seconds" },
      {
        property: "og:description",
        content:
          "Meet Caddy, your animated care companion. Book verified doctors, track your live queue and never wait in a lobby again.",
      },
    ],
  }),
  component: Home,
});

const spring = { type: "spring" as const, stiffness: 180, damping: 20, mass: 0.9 };

function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div aria-hidden className="clinic-grain pointer-events-none absolute inset-0 opacity-70" />

      <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-8 sm:px-8">
        {/* top bar */}
        <motion.nav
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          className="glass-card flex items-center justify-between rounded-full px-4 py-3"
        >
          <span className="font-display text-lg font-extrabold">
            Caddy<span className="foil-text foil-animate"> Care</span>
          </span>
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="hidden rounded-full bg-secondary px-3 py-1.5 text-muted-foreground sm:inline">
              Karachi · Clifton
            </span>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 420, damping: 20 }}
              className="rounded-full bg-primary px-4 py-1.5 text-primary-foreground"
            >
              Sign in
            </motion.button>
          </div>
        </motion.nav>

        {/* HERO */}
        <section className="grid items-center gap-6 pt-10 lg:grid-cols-[1.05fr_1fr]">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            className="order-2 space-y-5 lg:order-1"
          >
            <motion.p
              variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}
              transition={spring}
              className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-accent-foreground"
            >
              Your care companion
            </motion.p>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 34, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1 } }}
              transition={{ type: "spring", stiffness: 150, damping: 16 }}
              className="hero-title text-5xl sm:text-6xl lg:text-7xl"
            >
              Doctor
              <br />
              in a tap
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}
              transition={spring}
              className="max-w-md text-base text-muted-foreground"
            >
              Caddy finds the right specialist, holds your slot and watches the queue for you — so you
              show up exactly when it&apos;s your turn.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              transition={spring}
              className="glass-card flex items-center gap-2 rounded-full p-2"
            >
              <span aria-hidden className="pl-2 text-lg">
                🔍
              </span>
              <input
                aria-label="Search doctors, clinics or symptoms"
                placeholder="Search doctors, clinics or symptoms"
                className="min-w-0 flex-1 bg-transparent px-1 text-sm outline-none placeholder:text-muted-foreground"
              />
              <motion.button
                type="button"
                whileHover={{ scale: 1.05, boxShadow: "var(--shadow-glow)" }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 420, damping: 20 }}
                className="shrink-0 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
              >
                Find care
              </motion.button>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              transition={spring}
              className="flex gap-6 pt-2 text-sm"
            >
              {[
                ["1,200+", "verified doctors"],
                ["4 min", "avg. booking"],
                ["24/7", "queue tracking"],
              ].map(([big, small]) => (
                <div key={big}>
                  <p className="font-display text-xl font-extrabold">{big}</p>
                  <p className="text-xs text-muted-foreground">{small}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.86, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14, mass: 1 }}
            className="order-1 lg:order-2"
          >
            <CaddyStage />
          </motion.div>
        </section>

        {/* SPECIALIZATIONS */}
        <section className="pt-14">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={spring}
            className="mb-5 text-center text-2xl font-extrabold"
          >
            What do you need today?
          </motion.h2>
          <SpecializationPills />
        </section>

        {/* LIVE QUEUE */}
        <div className="pt-14">
          <QueueTeaser />
        </div>

        {/* DOCTORS */}
        <div className="pt-14">
          <DoctorCarousel />
        </div>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 150, damping: 18 }}
          className="glass-card mt-16 overflow-hidden rounded-4xl p-8 text-center"
        >
          <h2 className="text-3xl font-extrabold">Caddy is listening</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Say the symptom, Caddy books the specialist. Voice booking arrives with your first visit.
          </p>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05, boxShadow: "var(--shadow-glow)" }}
            whileTap={{ scale: 0.96 }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{
              scale: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
            }}
            className="mt-6 rounded-full bg-primary px-7 py-3 text-sm font-bold text-primary-foreground"
          >
            Talk to Caddy
          </motion.button>
        </motion.section>
      </div>
    </main>
  );
}
