"use client";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4"
    >
      <div
        className={cn(
          "mx-auto flex h-14 max-w-[1240px] items-center justify-between rounded-full border px-3 pl-4 transition-all duration-300 sm:h-16",
          scrolled ? "border-white/10 bg-ink-900/75 shadow-card backdrop-blur-xl" : "border-transparent bg-transparent",
        )}
      >
        <a href="/" aria-label="Home">
          <Logo />
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <motion.a
              key={n.href}
              href={n.href}
              whileHover={{ y: -1 }}
              className="rounded-full px-4 py-2 text-sm text-paper-dim transition-colors hover:bg-white/[0.06] hover:text-paper"
            >
              {n.label}
            </motion.a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button href="/#quote" className="hidden h-10 px-5 text-sm sm:inline-flex">
            Get a free quote
          </Button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 max-w-[1240px] rounded-3xl border border-white/10 bg-ink-900/95 p-3 backdrop-blur-xl md:hidden"
          >
            {nav.map((n, i) => (
              <motion.a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i }}
                className="block rounded-2xl px-4 py-3 text-base text-paper-dim hover:bg-white/[0.06] hover:text-paper"
              >
                {n.label}
              </motion.a>
            ))}
            <Button href="/#quote" onClick={() => setOpen(false)} className="mt-2 w-full">
              Get a free quote
            </Button>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
