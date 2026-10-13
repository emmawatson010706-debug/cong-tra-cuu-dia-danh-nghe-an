import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils.ts";
import { ChevronDown } from "lucide-react";

interface SelectContextType {
  value: string;
  onValueChange: (val: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SelectContext = createContext<SelectContextType>({
  value: "",
  onValueChange: () => {},
  open: false,
  setOpen: () => {},
});

export function Select({ value, onValueChange, children }: { value: string; onValueChange: (v: string) => void; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
      <div className="relative inline-block w-full">{children}</div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({ className, children }: { className?: string; children: React.ReactNode }) {
  const { open, setOpen } = useContext(SelectContext);
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        "flex h-12 w-full items-center justify-between rounded-md border-2 border-[#b8860b] bg-white px-3 py-2 text-sm font-semibold text-[#1e293b] shadow-sm hover:border-[#991b1b] focus:outline-none",
        className
      )}
    >
      {children}
      <ChevronDown className="size-4 opacity-50" />
    </button>
  );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const { value } = useContext(SelectContext);
  return <span>{value === "all" ? (placeholder || "Tất cả") : value}</span>;
}

export function SelectContent({ className, children }: { className?: string; children: React.ReactNode }) {
  const { open, setOpen } = useContext(SelectContext);
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      <div
        className={cn(
          "absolute left-0 top-full z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border-2 border-[#b8860b] bg-white p-1 shadow-lg",
          className
        )}
      >
        {children}
      </div>
    </>
  );
}

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  const { onValueChange, setOpen } = useContext(SelectContext);
  return (
    <div
      onClick={() => {
        onValueChange(value);
        setOpen(false);
      }}
      className="cursor-pointer rounded px-2.5 py-1.5 text-sm font-medium text-[#1e293b] hover:bg-[#fef3c7] hover:text-[#991b1b]"
    >
      {children}
    </div>
  );
}
