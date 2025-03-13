
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export interface BookData {
  id: string;
  title: string;
  author: string;
  cover: string;
  price: number;
  originalPrice: number;
  language: "english" | "nepali";
  isNew: boolean;
  condition?: "like-new" | "good" | "fair" | "poor" | "new";
  location?: string;
  sellerContact?: string;
  description?: string;
}

interface BookCardProps {
  book: BookData;
  className?: string;
  featured?: boolean;
  compact?: boolean;
}

export function BookCard({ book, className, featured = false, compact = false }: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const discountPercent = Math.round(
    ((book.originalPrice - book.price) / book.originalPrice) * 100
  );

  const discountBadgeColor = book.language === "english" 
    ? "bg-book-english" 
    : "bg-book-nepali";

  return (
    <div
      className={cn(
        "group relative rounded-xl overflow-hidden transition-all duration-500",
        "border border-border hover:border-book-primary/50",
        "bg-white dark:bg-black/20 backdrop-blur-sm shadow-sm hover:shadow-lg",
        featured ? "md:flex md:items-center md:p-4 md:gap-6" : "flex flex-col",
        compact ? "h-full" : "",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount Badge */}
      {discountPercent > 0 && (
        <div
          className={cn(
            "absolute top-2 left-2 z-10 px-1.5 py-0.5 rounded-full text-xs font-bold text-white",
            "animate-fade-in shadow-sm",
            compact ? "text-[10px]" : "text-xs",
            discountBadgeColor
          )}
        >
          {discountPercent}% OFF
        </div>
      )}

      {/* Image Container */}
      <div
        className={cn(
          "overflow-hidden bg-book-secondary/30",
          featured ? "md:w-1/3 aspect-[3/4]" : compact ? "w-full aspect-[2/3] max-h-[180px]" : "w-full aspect-[2/3] max-h-[300px]"
        )}
      >
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
            <div className={cn(
              "rounded-full border-2 border-book-primary/50 border-t-transparent animate-spin",
              compact ? "w-6 h-6" : "w-10 h-10"
            )} />
          </div>
        )}
        <img
          src={book.cover}
          alt={book.title}
          onLoad={() => setImageLoaded(true)}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            "group-hover:scale-105 group-hover:rotate-1",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
        />
      </div>

      {/* Content */}
      <div
        className={cn(
          "flex flex-col flex-grow",
          compact ? "p-2" : "p-4",
          featured && "md:w-2/3"
        )}
      >
        <Link
          to={`/book/${book.id}`}
          className="group-hover:text-book-primary transition-colors duration-300"
        >
          <h3
            className={cn(
              "font-display font-semibold leading-tight mb-1 transition-all duration-300",
              featured ? "text-xl md:text-2xl" : compact ? "text-sm" : "text-lg",
              compact && "line-clamp-1"
            )}
          >
            {book.title}
          </h3>
        </Link>
        <p className={cn(
          "text-muted-foreground mb-2",
          compact ? "text-xs" : "text-sm",
          compact && "line-clamp-1"
        )}>
          {book.author}
        </p>

        {/* Language Badge */}
        <div
          className={cn(
            "font-medium px-2 py-0.5 rounded-full w-fit mb-2",
            book.language === "english"
              ? "bg-book-english/10 text-book-english"
              : "bg-book-nepali/10 text-book-nepali",
            compact ? "text-[10px] px-1.5 py-0.5" : "text-xs"
          )}
        >
          {book.language === "english" ? "English" : "Nepali"}
        </div>

        <div className="mt-auto flex items-end justify-between pt-2">
          <div className="flex items-center gap-1">
            <span className={cn(
              "font-bold",
              compact ? "text-sm" : "text-lg"
            )}>₹{book.price}</span>
            {book.originalPrice > book.price && (
              <span className={cn(
                "text-muted-foreground line-through",
                compact ? "text-xs" : "text-sm"
              )}>
                ₹{book.originalPrice}
              </span>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={cn(
              "rounded-full transition-all duration-300",
              compact ? "p-1.5" : "p-2",
              isWishlisted
                ? "bg-book-primary/10 text-book-primary"
                : "bg-transparent text-muted-foreground hover:bg-book-primary/5 hover:text-book-primary"
            )}
          >
            <Heart
              className={cn(
                "transition-all duration-300",
                compact ? "h-4 w-4" : "h-5 w-5",
                isWishlisted && "fill-book-primary"
              )}
            />
          </button>
        </div>
      </div>

      {/* Overlay on hover */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        )}
      />

      {/* Quick view button */}
      {!compact && (
        <Link
          to={`/book/${book.id}`}
          className={cn(
            "absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full",
            "bg-book-primary text-white font-medium text-sm",
            "transform transition-all duration-500 shadow-lg",
            "hover:bg-book-primary/90 active:scale-95",
            isHovered ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}
        >
          View Details
        </Link>
      )}
    </div>
  );
}
