"use client";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, BellRing, Check, MapPin, MousePointerClick, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const words = ["customers", "orders", "calls", "bookings"];
const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, []);

  // Cards tilt a little toward the pointer; on touch screens they just float.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });

  const { scrollY } = useScroll();
  const fade = useTransform(scrollY, [0, 500], [1, 0.2]);
  const sink = useTransform(scrollY, [0, 500], [0, 80]);

  return (
    <section
      className="relative isolate overflow-hidden pb-16 pt-28 sm:pt-36 lg:pb-24 lg:pt-40"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
    >
      <Backdrop />

      <div className="container grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <motion.div style={{ opacity: fade }}>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="eyebrow"
          >
            <span className="relative flex h-2 w-2">
              <motion.span
                className="absolute inset-0 rounded-full bg-volt"
                animate={{ scale: [1, 2.4], opacity: [0.7, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
              />
              <span className="relative h-2 w-2 rounded-full bg-volt" />
            </span>
            Taking new projects this month
          </motion.span>

          <h1 className="mt-6 font-display text-[2.75rem] font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-[4.6rem]">
            <Line delay={0.1}>Websites, apps</Line>
            <Line delay={0.2}>& Google growth</Line>
            <Line delay={0.3}>that bring you</Line>
            <span className="relative block overflow-hidden pb-2">
              {/* Invisible longest word reserves the space, so the headline never jumps. */}
              <span className="invisible">customers</span>
              <AnimatePresence initial={false}>
                <motion.span
                  key={words[i]}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-110%" }}
                  transition={{ duration: 0.6, ease }}
                  className="text-gradient absolute left-0 top-0"
                >
                  {words[i]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.45 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-paper-dim"
          >
            From a sharp business website to a full ordering app with an owner dashboard. One developer who
            builds it, launches it on Google, and answers on WhatsApp. Live in weeks, not months.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.55 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button href="#quote" className="group h-14 px-7 text-base">
              Get a free quote
              <motion.span className="inline-flex" whileHover={{ x: 4 }}>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </motion.span>
            </Button>
            <Button href="#work" variant="outline" className="h-14 px-7 text-base">
              See our work
            </Button>
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.7 } } }}
            className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-paper-dim"
          >
            {["Free quote within 24 hours", "Fixed price, no surprises", "You own everything"].map((t) => (
              <motion.li
                key={t}
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                className="flex items-center gap-2"
              >
                <span className="grid h-5 w-5 place-items-center rounded-full bg-volt/15 text-volt">
                  <Check size={12} strokeWidth={3} />
                </span>
                {t}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div style={{ y: sink }} className="relative mx-auto h-[480px] w-full max-w-[560px] sm:h-[520px]">
          <Showcase sx={sx} sy={sy} />
        </motion.div>
      </div>

      <ServiceMarquee />
    </section>
  );
}

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-1">
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_30%,black_20%,transparent_70%)]" />
      <motion.div
        className="absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-iris/30 blur-[120px]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-32 top-40 h-[460px] w-[460px] rounded-full bg-volt/15 blur-[120px]"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
    </div>
  );
}

/* The floating product cards on the right: a site, a Google listing, a new-order alert and an ads chart. */

function Float({
  children,
  className,
  delay,
  depth,
  sx,
  sy,
}: {
  children: React.ReactNode;
  className: string;
  delay: number;
  depth: number;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
}) {
  const x = useTransform(sx, (v) => v * depth);
  const y = useTransform(sy, (v) => v * depth);
  return (
    <motion.div style={{ x, y }} className={`absolute ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease, delay }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5 + depth / 10, repeat: Infinity, ease: "easeInOut", delay: delay + 1 }}
          whileHover={{ scale: 1.04, rotate: 0 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

const card = "rounded-xl2 border border-white/10 bg-ink-800/90 shadow-card backdrop-blur-xl";

function Showcase({ sx, sy }: { sx: MotionValue<number>; sy: MotionValue<number> }) {
  return (
    <>
      {/* Browser */}
      <Float sx={sx} sy={sy} depth={18} delay={0.35} className="left-0 right-4 top-12 sm:right-10 sm:top-6">
        <div className={`${card} -rotate-2 overflow-hidden`}>
          <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-flare/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-volt/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-iris/80" />
            <span className="ml-3 flex-1 truncate rounded-md bg-white/[0.06] px-3 py-1 text-[11px] text-paper-mute">
              yourbusiness.in
            </span>
          </div>
          <div className="relative h-48 bg-gradient-to-br from-[#1b1440] via-ink-800 to-[#20240b] p-5 sm:h-56">
            <div className="h-2.5 w-24 rounded-full bg-white/20" />
            <div className="mt-4 h-6 w-3/4 rounded-lg bg-white/80" />
            <div className="mt-2 h-6 w-1/2 rounded-lg bg-volt" />
            <div className="mt-5 flex gap-2">
              <div className="h-8 w-28 rounded-full bg-volt/90" />
              <div className="h-8 w-20 rounded-full border border-white/20" />
            </div>
            <div className="absolute bottom-4 left-5 right-5 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((n) => (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + n * 0.12 }}
                  className="h-12 rounded-lg border border-white/10 bg-white/[0.05]"
                />
              ))}
            </div>
          </div>
        </div>
      </Float>

      {/* Google listing */}
      <Float sx={sx} sy={sy} depth={34} delay={0.55} className="-left-1 bottom-[118px] w-[205px] sm:-left-8 sm:bottom-20 sm:w-[230px]">
        <div className={`${card} rotate-[-4deg] p-4`}>
          <div className="flex items-center gap-2 text-xs text-paper-mute">
            <MapPin size={14} className="text-flare" /> Google Maps
          </div>
          <p className="mt-2 font-display text-base font-semibold">Your Business</p>
          <div className="mt-1 flex items-center gap-1 text-volt">
            {[0, 1, 2, 3, 4].map((n) => (
              <motion.span
                key={n}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2 + n * 0.08, type: "spring", stiffness: 500 }}
              >
                <Star size={14} fill="currentColor" />
              </motion.span>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-white/[0.05] px-2.5 py-1.5 text-xs">
            <ShieldCheck size={14} className="text-volt" /> Verified · Open now
          </div>
        </div>
      </Float>

      {/* New order */}
      <Float sx={sx} sy={sy} depth={46} delay={0.75} className="-right-1 top-0 w-[220px] sm:-right-6 sm:top-[-10px]">
        <div className={`${card} rotate-[5deg] p-4`}>
          <div className="flex items-center gap-3">
            <motion.span
              animate={{ rotate: [0, -14, 12, -8, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2.4 }}
              className="grid h-9 w-9 place-items-center rounded-full bg-volt text-ink"
            >
              <BellRing size={16} />
            </motion.span>
            <div>
              <p className="text-sm font-semibold">New order</p>
              <p className="text-xs text-paper-mute">2 items · UPI paid</p>
            </div>
          </div>
        </div>
      </Float>

      {/* Ads chart */}
      <Float sx={sx} sy={sy} depth={28} delay={0.95} className="bottom-0 right-0 w-[205px] sm:right-2 sm:w-[250px]">
        <div className={`${card} rotate-[2deg] p-4`}>
          <div className="flex items-center justify-between text-xs text-paper-mute">
            <span className="flex items-center gap-1.5">
              <MousePointerClick size={14} className="text-iris-light" /> Leads from ads
            </span>
            <span className="whitespace-nowrap rounded-full bg-volt/15 px-2 py-0.5 font-semibold text-volt">this week</span>
          </div>
          <svg viewBox="0 0 220 70" className="mt-3 h-16 w-full">
            <defs>
              <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#D4FF3A" stopOpacity=".35" />
                <stop offset="100%" stopColor="#D4FF3A" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0 60 L30 52 L60 55 L90 40 L120 44 L150 26 L180 22 L220 6 L220 70 L0 70 Z"
              fill="url(#g)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            />
            <motion.path
              d="M0 60 L30 52 L60 55 L90 40 L120 44 L150 26 L180 22 L220 6"
              fill="none"
              stroke="#D4FF3A"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.2, duration: 1.4, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </Float>
    </>
  );
}

const services = [
  "Websites",
  "Android apps",
  "iPhone apps",
  "Google Business listing",
  "SEO",
  "Google Ads",
  "Facebook & Instagram ads",
  "Online ordering",
  "Logo & branding",
  "Social media",
];

function ServiceMarquee() {
  const row = [...services, ...services];
  return (
    <div className="relative mt-16 border-y border-white/[0.07] bg-white/[0.015] py-5 lg:mt-24 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <motion.div
        className="flex w-max gap-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
      >
        {row.map((s, n) => (
          <span key={n} className="flex items-center gap-10 font-display text-xl text-paper-dim sm:text-2xl">
            {s}
            <span className="h-1.5 w-1.5 rounded-full bg-volt" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
