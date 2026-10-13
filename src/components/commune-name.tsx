import { cn } from "@/lib/utils.ts";

export default function CommuneName({ name, className }: { name: string; className?: string }) {
  return (
    <span
      className={cn(
        "font-serif font-bold text-[#b45309] hover:text-[#991b1b] transition-colors",
        "[text-shadow:0_1px_1px_rgba(0,0,0,0.1)]",
        className
      )}
    >
      {name}
    </span>
  );
}
