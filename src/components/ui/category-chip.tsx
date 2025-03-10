
import React from "react";
import { cn } from "@/lib/utils";

interface CategoryChipProps {
  label: string;
  className?: string;
  onClick?: () => void;
  active?: boolean;
}

export function CategoryChip({
  label,
  className,
  onClick,
  active = false,
}: CategoryChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1 text-xs rounded-full transition-all duration-300 font-medium",
        "hover:shadow-md hover:scale-105 active:scale-95 active:shadow-sm",
        active
          ? "bg-book-primary text-white shadow-md"
          : "bg-book-secondary text-book-primary hover:bg-book-primary/20",
        className
      )}
    >
      {label}
    </button>
  );
}
