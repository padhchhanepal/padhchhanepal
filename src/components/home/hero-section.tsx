
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CategoryChip } from "@/components/ui/category-chip";
import { SearchBar } from "@/components/ui/search-bar";
import { ChevronRight } from "lucide-react";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const categories = [
    "All",
    "Fiction",
    "Non-Fiction",
    "Academic",
    "Children",
    "Self-Help",
    "Business",
    "Travel",
    "Nepali",
  ];

  return (
    <div className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-book-secondary/30 to-transparent" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-book-primary/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-book-primary/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-2xl" />
      
      {/* Floating books (decorative) */}
      <div className="absolute hidden lg:block right-[10%] top-[20%] w-[200px] h-[280px] transform rotate-12 shadow-xl rounded-md overflow-hidden animate-float">
        <img 
          src="https://images.unsplash.com/photo-1629992101753-56d196c8aabb" 
          alt="Floating book"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute hidden lg:block right-[25%] top-[45%] w-[150px] h-[220px] transform -rotate-6 shadow-xl rounded-md overflow-hidden animate-float" style={{ animationDelay: "1.5s" }}>
        <img 
          src="https://images.unsplash.com/photo-1544947950-fa07a98d237f" 
          alt="Floating book"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 pt-20">
        <div className="max-w-3xl">
          {/* Tagline */}
          <div 
            className={cn(
              "inline-block px-4 py-1 bg-book-primary/10 rounded-full text-sm font-medium text-book-primary mb-6",
              "transform transition-all duration-700 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Nepal's Premier Online Bookstore
          </div>

          {/* Heading */}
          <h1 
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6",
              "transform transition-all duration-700 ease-out delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Discover Your Next
            <span className="relative">
              <span className="relative z-10 text-book-primary"> Favorite Book</span>
              <span className="absolute bottom-0 left-0 right-0 h-4 bg-book-secondary/50 -z-0" style={{ bottom: '0.125em' }}></span>
            </span>
          </h1>

          {/* Description */}
          <p 
            className={cn(
              "text-lg text-muted-foreground max-w-xl mb-8",
              "transform transition-all duration-700 ease-out delay-200",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            From bestsellers to rare finds, explore our vast collection of books
            across all genres. Shop English and Nepali books with exclusive discounts!
          </p>

          {/* Search Bar */}
          <div
            className={cn(
              "mb-8",
              "transform transition-all duration-700 ease-out delay-300",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <SearchBar />
          </div>

          {/* Categories */}
          <div 
            className={cn(
              "flex flex-wrap gap-2 mb-8",
              "transform transition-all duration-700 ease-out delay-400",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            {categories.map((category) => (
              <CategoryChip
                key={category}
                label={category}
                active={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              />
            ))}
          </div>

          {/* CTA Buttons */}
          <div 
            className={cn(
              "flex flex-wrap gap-4",
              "transform transition-all duration-700 ease-out delay-500",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <Button asChild size="lg" className="rounded-full px-8 shadow-lg group">
              <Link to="/books">
                Browse Books
                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/secondhand">
                Browse Secondhand
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
