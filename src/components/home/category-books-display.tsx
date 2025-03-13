
import React from "react";
import { cn } from "@/lib/utils";
import { BookCard, BookData } from "@/components/ui/book-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface CategoryBooksDisplayProps {
  categoryName: string;
  books: BookData[];
  isVisible: boolean;
  categoryIndex: number;
}

export function CategoryBooksDisplay({
  categoryName,
  books,
  isVisible,
  categoryIndex
}: CategoryBooksDisplayProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 
          className={cn(
            "text-xl font-semibold",
            isVisible ? "animate-slide-in-from-left" : "opacity-0"
          )}
          style={{ animationDelay: `${200 + categoryIndex * 100}ms` }}
        >
          {categoryName}
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
          <Link to={`/books?category=${encodeURIComponent(categoryName)}`}>
            View All
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {books.map((book, index) => (
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
  );
}
