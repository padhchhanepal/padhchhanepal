
import { useState, useEffect } from "react";
import { BookData } from "@/components/ui/book-card";
import { mockBooks } from "@/data/mock-books";

export interface CategoryBook {
  categoryName: string;
  books: BookData[];
}

export function useCategoryBooks() {
  const [categories, setCategories] = useState<CategoryBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return { categories, isLoading };
}
