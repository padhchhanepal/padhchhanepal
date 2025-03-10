
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { FeaturedBook } from "@/components/ui/featured-book";
import { BookData } from "@/components/ui/book-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function FeaturedReviews() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

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

    const element = document.getElementById("featured-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Sample featured books (would come from API in real app)
  const featuredBooks: BookData[] = [
    {
      id: "5",
      title: "Summer's End",
      author: "Reysa Kedar",
      cover: "https://images.unsplash.com/photo-1478720568477-152d9b164e26",
      price: 580,
      originalPrice: 900,
      language: "english",
      isNew: true
    },
    {
      id: "6",
      title: "Karnali Blues",
      author: "Buddhi Sagar",
      cover: "https://images.unsplash.com/photo-1476275466078-4007374efbbe",
      price: 425,
      originalPrice: 500,
      language: "nepali",
      isNew: false
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === featuredBooks.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? featuredBooks.length - 1 : prev - 1));
  };

  return (
    <section
      id="featured-section"
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
            Featured Book of the Month
          </h2>
          <p
            className={cn(
              "text-muted-foreground max-w-2xl",
              isVisible ? "animate-slide-in-from-left" : "opacity-0"
            )}
            style={{ animationDelay: "100ms" }}
          >
            Handpicked selections from our editors
          </p>
        </div>

        <div
          className={cn(
            "flex gap-2",
            isVisible ? "animate-slide-in-from-right" : "opacity-0"
          )}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-full h-10 w-10"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-full h-10 w-10"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl">
        <div
          className="transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          <div className="flex">
            {featuredBooks.map((book) => (
              <div key={book.id} className="min-w-full">
                <FeaturedBook book={book} />
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {featuredBooks.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                currentSlide === index
                  ? "w-6 bg-book-primary"
                  : "bg-book-primary/30 hover:bg-book-primary/50"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
