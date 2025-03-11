import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { BookCard, BookData } from "@/components/ui/book-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { mockBooks } from "@/data/mock-books";

export function Bestsellers() {
  const [isVisible, setIsVisible] = useState(false);

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

    const element = document.getElementById("bestsellers-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Get only the first 10 books from mock data
  const bestsellers = mockBooks.slice(0, 10);

  return (
    <section 
      id="bestsellers-section"
      className="page-container py-16"
    >
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 
            className={cn(
              "section-title",
              isVisible ? "animate-slide-in-from-left" : "opacity-0"
            )}
          >
            Bestselling Books
          </h2>
          <p 
            className={cn(
              "text-muted-foreground max-w-2xl",
              isVisible ? "animate-slide-in-from-left" : "opacity-0"
            )}
            style={{ animationDelay: "100ms" }}
          >
            Our most popular books that readers can't get enough of
          </p>
        </div>
        
        <Button 
          asChild
          variant="ghost" 
          className={cn(
            "group",
            isVisible ? "animate-slide-in-from-right" : "opacity-0"
          )}
        >
          <Link to="/books">
            View All
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {bestsellers.map((book, index) => (
          <div
            key={book.id}
            className={cn(
              isVisible ? "animate-scale-in" : "opacity-0"
            )}
            style={{ animationDelay: `${150 + index * 100}ms` }}
          >
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </section>
  );
}
