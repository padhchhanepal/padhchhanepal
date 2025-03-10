
import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({
  className,
  placeholder = "Search for books, authors, or genres...",
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative flex items-center w-full max-w-lg transition-all duration-300",
        isFocused ? "scale-[1.02]" : "scale-100",
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-full opacity-0 transition-opacity duration-300",
          isFocused ? "opacity-100 bg-book-primary/5 animate-pulse" : ""
        )}
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={cn(
          "w-full pl-5 pr-12 py-3 rounded-full border border-border focus:border-book-primary",
          "bg-white dark:bg-black/20 backdrop-blur-sm",
          "text-foreground placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-book-primary/20 focus:ring-offset-0",
          "transition-all duration-300 ease-in-out"
        )}
      />
      <button
        type="submit"
        className={cn(
          "absolute right-3 p-2 rounded-full",
          "text-muted-foreground hover:text-book-primary",
          "transition-all duration-300 ease-in-out",
          query.trim() ? "bg-book-primary/10" : ""
        )}
      >
        <Search
          className={cn(
            "h-5 w-5 transition-colors duration-300",
            query.trim() ? "text-book-primary" : ""
          )}
        />
      </button>
    </form>
  );
}
