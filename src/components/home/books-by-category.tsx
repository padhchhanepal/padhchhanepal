
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CategoryFilter } from "./category-filter";
import { CategoryBooksDisplay } from "./category-books-display";
import { CategoryLoadingSkeleton } from "./category-loading-skeleton";
import { useSectionVisibility } from "@/hooks/use-section-visibility";
import { useCategoryBooks, CategoryBook } from "@/hooks/use-category-books";

export function BooksByCategory() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const isVisible = useSectionVisibility({ elementId: "categories-section" });
  const { categories, isLoading } = useCategoryBooks();

  // Define all available categories
  const bookCategories = [
    "All",
    "Biography",
    "Autobiography", 
    "Fiction",
    "Non-Fiction",
    "Love Story",
    "Story",
    "History",
    "Religious",
    "Poetry",
    "Essays",
    "Drama",
    "Philosophy",
    "Spiritual"
  ];

  return (
    <section 
      id="categories-section"
      className="py-12 bg-gradient-to-b from-book-secondary/20 to-transparent"
    >
      <div className="page-container">
        <div className="mb-10">
          <h2 
            className={cn(
              "section-title text-2xl font-bold",
              isVisible ? "animate-slide-in-from-left" : "opacity-0"
            )}
          >
            Most Loved Books by Category
          </h2>
          <p 
            className={cn(
              "text-muted-foreground max-w-2xl",
              isVisible ? "animate-slide-in-from-left" : "opacity-0"
            )}
            style={{ animationDelay: "100ms" }}
          >
            Discover the most popular books loved by our readers across different categories
          </p>
        </div>
        
        {/* Category filter chips */}
        <CategoryFilter 
          bookCategories={bookCategories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          isVisible={isVisible}
        />
        
        {isLoading ? (
          <CategoryLoadingSkeleton />
        ) : (
          <div className="space-y-16">
            {categories.map((category, categoryIndex) => (
              <CategoryBooksDisplay
                key={category.categoryName}
                categoryName={category.categoryName}
                books={category.books}
                isVisible={isVisible}
                categoryIndex={categoryIndex}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
