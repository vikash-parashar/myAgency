"use client";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "outline";

const styles: Record<Variant, string> = {
  primary: "bg-volt text-ink shadow-glow hover:bg-[#E2FF6E]",
  ghost: "text-paper hover:bg-white/[0.06]",
  outline: "border border-white/15 text-paper hover:border-white/30 hover:bg-white/[0.04]",
};

// A link-styled button with a spring on hover and tap.
export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: HTMLMotionProps<"a"> & { variant?: Variant }) {
  return (
    <motion.a
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={cn(
        "inline-flex h-12 select-none items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
        styles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </motion.a>
  );
}
