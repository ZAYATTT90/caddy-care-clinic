import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { DOCTORS, type Doctor } from "@/lib/home-data";

function DoctorCard({
  doctor,
  index,
  progress,
  total,
}: {
  doctor: Doctor;
  index: number;
  progress: MotionValue<number>;
  total: number;
}) {
  // Coverflow: map horizontal scroll progress to a 3D rotation per card so the
  // card nearest the centre faces the viewer while neighbours angle away.
  const center = index / Math.max(1, total - 1);
  const rotateY = useTransform(progress, [center - 0.45, center, center + 0.45], [26, 0, -26], {
    clamp: true,
  });
  const scale = useTransform(progress, [center - 0.45, center, center + 0.45], [0.93, 1, 0.93], {
    clamp: true,
  });

  return (
    <motion.article
      style={{ rotateY, scale, transformPerspective: 1000 }}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="glass-card w-[268px] shrink-0 rounded-4xl p-5"
    >
      <div className="relative mx-auto size-28">
        <motion.div
          aria-hidden
          className="absolute -inset-2 rounded-full blur-xl"
          style={{ background: "color-mix(in oklab, var(--care) 50%, transparent)" }}
          animate={{ opacity: [0.35, 0.75, 0.35], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
        />
        <img
          src={doctor.photo}
          alt={`${doctor.name}, ${doctor.specialty}`}
          width={640}
          height={640}
          loading="lazy"
          draggable={false}
          className="relative size-28 rounded-full border-2 border-card object-cover"
        />
      </div>
      <h3 className="mt-4 text-center text-lg font-extrabold">{doctor.name}</h3>
      <p className="text-center text-sm text-muted-foreground">{doctor.specialty}</p>
      <p className="mt-1 text-center text-xs text-muted-foreground">{doctor.clinic}</p>

      <div className="mt-4 flex items-center justify-between rounded-2xl bg-secondary/70 px-3 py-2 text-xs font-semibold">
        <span className="text-gold">★ {doctor.rating}</span>
        <span>{doctor.fee}</span>
        <span className="text-primary">{doctor.next}</span>
      </div>

      <motion.button
        type="button"
        whileHover={{ scale: 1.04, boxShadow: "var(--shadow-glow)" }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 420, damping: 20 }}
        className="mt-4 w-full rounded-full bg-primary py-2.5 text-sm font-bold text-primary-foreground"
      >
        Book appointment
      </motion.button>
    </motion.article>
  );
}

export function DoctorCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragWidth, setDragWidth] = useState(0);
  const { scrollXProgress } = useScroll({ container: trackRef, axis: "x" });

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => setDragWidth(Math.max(0, el.scrollWidth - el.clientWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="space-y-5">
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ type: "spring", stiffness: 160, damping: 18 }}
        className="flex items-end justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-extrabold">Featured doctors</h2>
          <p className="text-sm text-muted-foreground">Drag sideways — Caddy shuffles the deck.</p>
        </div>
        <span className="hidden rounded-full bg-secondary px-3 py-1 text-xs font-bold text-muted-foreground sm:inline">
          {DOCTORS.length} available now
        </span>
      </motion.header>

      <div
        ref={trackRef}
        className="no-scrollbar -mx-1 overflow-x-auto px-1 pb-4"
        style={{ scrollbarWidth: "none" }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: -dragWidth, right: 0 }}
          dragElastic={0.12}
          dragMomentum
          className="flex cursor-grab gap-5 active:cursor-grabbing"
        >
          {DOCTORS.map((d, i) => (
            <DoctorCard
              key={d.id}
              doctor={d}
              index={i}
              total={DOCTORS.length}
              progress={scrollXProgress}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
