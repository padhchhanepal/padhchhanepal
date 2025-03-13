
import { cn } from "@/lib/utils";
import { BookData } from "./book-card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useWishlist } from "@/hooks/use-wishlist";

interface FeaturedBookProps {
  book: BookData;
  className?: string;
}

export function FeaturedBook({ book, className }: FeaturedBookProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const discountPercent = Math.round(
    ((book.originalPrice - book.price) / book.originalPrice) * 100
  );

  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden bg-gradient-to-r from-book-secondary to-book-secondary/20",
        "border border-book-primary/10 shadow-lg",
        "w-full h-full p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-12",
        isVisible ? "opacity-100" : "opacity-0",
        "transition-all duration-700 ease-out",
        className
      )}
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-book-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-book-primary/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

      {/* Book cover image */}
      <div className="relative w-40 mx-auto md:w-56 md:mx-0 shrink-0 animate-float">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse rounded-lg flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-book-primary/50 border-t-transparent animate-spin" />
          </div>
        )}
        <img
          src={book.cover}
          alt={book.title}
          onLoad={() => setImageLoaded(true)}
          className={cn(
            "w-full h-full object-cover rounded-lg shadow-xl",
            "transition-opacity duration-700 ease-in-out transform",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
        />
        
        {/* Discount badge */}
        {discountPercent > 0 && (
          <div className="absolute -top-3 -right-3 bg-book-primary text-white text-sm font-bold rounded-full h-14 w-14 flex items-center justify-center shadow-lg animate-pulse">
            {discountPercent}%
            <br />
            OFF
          </div>
        )}
      </div>

      {/* Book info */}
      <div className="flex flex-col justify-center md:py-4">
        <div className={cn(
          "flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full w-fit mb-3",
          "transition-all duration-500 delay-100",
          "animate-slide-in-from-left",
          book.language === "english"
            ? "bg-book-english/10 text-book-english"
            : "bg-book-nepali/10 text-book-nepali"
        )}>
          <span className="w-2 h-2 rounded-full bg-current"></span>
          {book.language === "english" ? "English" : "Nepali"}
        </div>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-2 animate-slide-in-from-left" style={{ animationDelay: "150ms" }}>
          {book.title}
        </h2>
        
        <p className="text-muted-foreground mb-3 animate-slide-in-from-left" style={{ animationDelay: "200ms" }}>
          by <span className="italic">{book.author}</span>
        </p>
        
        <div className="flex items-center mb-4 animate-slide-in-from-left" style={{ animationDelay: "250ms" }}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-book-primary text-book-primary" />
          ))}
          <span className="ml-2 text-sm text-muted-foreground">(24 reviews)</span>
        </div>
        
        <p className="mb-6 text-muted-foreground animate-slide-in-from-left" style={{ animationDelay: "300ms" }}>
          This captivating book takes readers on an unforgettable journey through vivid storytelling and powerful narratives.
        </p>
        
        <div className="flex items-end gap-4 mb-6 animate-slide-in-from-left" style={{ animationDelay: "350ms" }}>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground mb-1">Price</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl md:text-2xl">₹{book.price}</span>
              {book.originalPrice > book.price && (
                <span className="text-muted-foreground line-through">
                  ₹{book.originalPrice}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            In stock
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 animate-slide-in-from-left" style={{ animationDelay: "400ms" }}>
          <Button asChild className="bg-book-primary hover:bg-book-primary/90 text-white rounded-full px-6 transition-all duration-300 hover:shadow-lg">
            <Link to={`/book/${book.id}`}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Buy Now
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="rounded-full border-book-primary/20 text-book-primary hover:bg-book-primary/5 transition-all duration-300"
            onClick={() => toggleWishlist(book)}
          >
            <Heart 
              className={cn(
                "w-4 h-4 mr-2", 
                isInWishlist(book.id) && "fill-book-primary"
              )} 
            />
            {isInWishlist(book.id) ? "Wishlisted" : "Add to Wishlist"}
          </Button>
        </div>
      </div>
    </div>
  );
}
