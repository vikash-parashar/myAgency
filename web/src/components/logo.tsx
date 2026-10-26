import { site } from "@/lib/site";

// Placeholder mark until the agency name and logo are final.
export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-volt font-display text-[15px] font-bold text-ink">
        {site.short}
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-ink bg-iris" />
      </span>
      <span className="font-display text-lg font-semibold tracking-tight">{site.name}</span>
    </span>
  );
}
