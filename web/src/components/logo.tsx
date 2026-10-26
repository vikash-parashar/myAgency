import { site } from "@/lib/site";

// Wordmark: a lime "A" tile plus "Ampli" in bold and "Digital World" stacked beside it.
export function Logo() {
  return (
    <span className="flex items-center gap-2.5" aria-label={site.name}>
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-volt font-display text-xl font-bold text-ink">
        {site.short}
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-ink bg-iris" />
      </span>
      <span className="flex items-baseline gap-1.5 leading-none">
        <span className="font-display text-xl font-bold tracking-tight">Ampli</span>
        <span className="text-[11px] font-medium uppercase leading-[1.1] tracking-[0.18em] text-paper-dim">
          Digital
          <br />
          World
        </span>
      </span>
    </span>
  );
}
