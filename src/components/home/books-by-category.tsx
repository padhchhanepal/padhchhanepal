
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { BookCard, BookData } from "@/components/ui/book-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { mockBooks } from "@/data/mock-books";
import { CategoryChip } from "@/components/ui/category-chip";

interface CategoryBook {
  categoryName: string;
  books: BookData[];
}

export function BooksByCategory() {
  const [categories, setCategories] = useState<CategoryBook[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("categories-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Simulate API call to get books by category
    setIsLoading(true);
    setTimeout(() => {
      // For demonstration, we'll assign random categories to the mock books
      // In a real app, you would fetch properly categorized books from an API
      const categorizedBooks: Record<string, BookData[]> = {
        "Biography": [],
        "Autobiography": [],
        "Fiction": [],
        "Non-Fiction": [],
        "Love Story": [],
        "Story": [],
        "History": [],
        "Religious": [],
        "Poetry": [],
        "Essays": [],
        "Drama": [],
        "Philosophy": [],
        "Spiritual": []
      };
      
      // Assign books to categories (a book can be in multiple categories)
      mockBooks.forEach(book => {
        // Randomly assign each book to 1-3 categories for demo purposes
        const assignedCategories = Object.keys(categorizedBooks)
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 3) + 1);
        
        assignedCategories.forEach(category => {
          if (categorizedBooks[category].length < 5) { // Limit to 5 books per category
            categorizedBooks[category].push({...book});
          }
        });
      });
      
      // Convert to array format for state
      const categoriesArray = Object.entries(categorizedBooks)
        .filter(([_, books]) => books.length > 0) // Only include categories with books
        .map(([categoryName, books]) => ({
          categoryName,
          books: books.slice(0, 5) // Ensure max 5 books per category
        }));
      
      setCategories(categoriesArray);
      setIsLoading(false);
    }, 500);
  }, []);

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
        
        {isLoading ? (
          <div className="space-y-12">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="space-y-4">
                <div className="h-8 w-48 bg-muted rounded animate-pulse"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {[...Array(5)].map((_, bookIndex) => (
                    <div key={bookIndex} className="h-96 rounded-lg bg-muted animate-pulse"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-16">
            {categories.map((category, categoryIndex) => (
              <div key={category.categoryName} className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 
                    className={cn(
                      "text-xl font-semibold",
                      isVisible ? "animate-slide-in-from-left" : "opacity-0"
                    )}
                    style={{ animationDelay: `${200 + categoryIndex * 100}ms` }}
                  >
                    {category.categoryName}
                  </h3>
                  
                  <Button 
                    asChild
                    variant="ghost" 
                    className={cn(
                      "group",
                      isVisible ? "animate-slide-in-from-right" : "opacity-0"
                    )}
                    style={{ animationDelay: `${200 + categoryIndex * 100}ms` }}
                  >
                    <Link to={`/books?category=${encodeURIComponent(category.categoryName)}`}>
                      View All
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {category.books.map((book, index) => (
                    <div
                      key={book.id}
                      className={cn(
                        isVisible ? "animate-scale-in" : "opacity-0"
                      )}
                      style={{ animationDelay: `${300 + categoryIndex * 100 + index * 100}ms` }}
                    >
                      <BookCard book={book} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
