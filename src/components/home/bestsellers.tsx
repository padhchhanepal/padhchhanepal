
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { BookCard, BookData } from "@/components/ui/book-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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

  // Sample book data (would come from API in real app)
  const bestsellers: BookData[] = [
    {
      id: "1",
      title: "The Alchemist",
      author: "Paulo Coelho",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
      price: 450,
      originalPrice: 700,
      language: "english",
      isNew: true
    },
    {
      id: "2",
      title: "Seto Dharati",
      author: "Amar Neupane",
      cover: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb",
      price: 425,
      originalPrice: 500,
      language: "nepali",
      isNew: false
    },
    {
      id: "3",
      title: "Atomic Habits",
      author: "James Clear",
      cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
      price: 650,
      originalPrice: 1000,
      language: "english",
      isNew: true
    },
    {
      id: "4",
      title: "Palpasa Café",
      author: "Narayan Wagle",
      cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19",
      price: 340,
      originalPrice: 400,
      language: "nepali",
      isNew: false
    }
  ];

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

      <div className="book-grid">
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
