
import { cn } from "@/lib/utils";
import { CategoryChip } from "@/components/ui/category-chip";

interface CategoryFilterProps {
  bookCategories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  isVisible: boolean;
}

export function CategoryFilter({
  bookCategories,
  activeCategory,
  setActiveCategory,
  isVisible
}: CategoryFilterProps) {
  return (
    <div 
      className={cn(
        "flex flex-wrap gap-2 mb-8",
        isVisible ? "animate-slide-in-from-left" : "opacity-0"
      )}
      style={{ animationDelay: "150ms" }}
    >
      {bookCategories.map((category) => (
        <CategoryChip
          key={category}
          label={category}
          active={activeCategory === category}
          onClick={() => setActiveCategory(category)}
        />
      ))}
    </div>
  );
}
