
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { BookData } from "@/components/ui/book-card";

// Type definitions
type WishlistState = {
  items: BookData[];
  ids: Set<string>;
};

export function useWishlist() {
  // Initialize state from localStorage if available
  const [wishlist, setWishlist] = useState<WishlistState>(() => {
    if (typeof window !== "undefined") {
      const savedWishlist = localStorage.getItem("wishlist");
      if (savedWishlist) {
        try {
          const parsedData = JSON.parse(savedWishlist);
          return {
            items: parsedData,
            ids: new Set(parsedData.map((item: BookData) => item.id)),
          };
        } catch (e) {
          console.error("Failed to parse wishlist from localStorage", e);
        }
      }
    }
    return { items: [], ids: new Set<string>() };
  });

  // Sync to localStorage whenever wishlist changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(wishlist.items));
    }
  }, [wishlist.items]);

  const addToWishlist = (book: BookData) => {
    if (!wishlist.ids.has(book.id)) {
      setWishlist((prev) => ({
        items: [...prev.items, book],
        ids: new Set(prev.ids).add(book.id),
      }));
      toast({
        title: "Added to Wishlist",
        description: `"${book.title}" has been added to your wishlist.`,
      });
    }
  };

  const removeFromWishlist = (bookId: string) => {
    const bookToRemove = wishlist.items.find((item) => item.id === bookId);
    if (wishlist.ids.has(bookId) && bookToRemove) {
      setWishlist((prev) => {
        const newIds = new Set(prev.ids);
        newIds.delete(bookId);
        return {
          items: prev.items.filter((item) => item.id !== bookId),
          ids: newIds,
        };
      });
      toast({
        title: "Removed from Wishlist",
        description: `"${bookToRemove.title}" has been removed from your wishlist.`,
      });
    }
  };

  const toggleWishlist = (book: BookData) => {
    if (wishlist.ids.has(book.id)) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist(book);
    }
  };

  const isInWishlist = (bookId: string): boolean => {
    return wishlist.ids.has(bookId);
  };

  const clearWishlist = () => {
    setWishlist({ items: [], ids: new Set<string>() });
    toast({
      title: "Wishlist Cleared",
      description: "All items have been removed from your wishlist.",
    });
  };

  return {
    wishlist: wishlist.items,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
    count: wishlist.items.length,
  };
}
