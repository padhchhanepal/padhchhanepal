
import { useState, useEffect } from "react";
import { BookCard, BookData } from "@/components/ui/book-card";
import { getMostLovedBooks } from "@/data/mock-books";
import { Heart } from "lucide-react";

export function MostLovedBooks() {
  const [books, setBooks] = useState<BookData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get most loved books
    setIsLoading(true);
    setTimeout(() => {
      const lovedBooks = getMostLovedBooks();
      setBooks(lovedBooks);
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <section className="py-12 bg-gradient-to-b from-book-primary/5 to-transparent">
      <div className="page-container">
        <div className="flex items-center gap-2 mb-8">
          <Heart className="h-6 w-6 text-book-primary fill-book-primary" />
          <h2 className="text-2xl font-bold">Most Loved Books</h2>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="h-64 rounded-lg bg-muted animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {books.map((book) => (
              <BookCard key={book.id} book={book} compact />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
