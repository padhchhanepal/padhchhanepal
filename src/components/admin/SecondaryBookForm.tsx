
import { useState } from "react";
import { MapPin, Book, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface SecondaryBookFormProps {
  onSuccess?: () => void;
}

export function SecondaryBookForm({ onSuccess }: SecondaryBookFormProps) {
  const [bookName, setBookName] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API submission
    setTimeout(() => {
      toast({
        title: "Book listed successfully",
        description: `"${bookName}" has been added to the secondhand marketplace.`,
      });
      
      // Reset form
      setBookName("");
      setPrice("");
      setLocation("");
      setIsSubmitting(false);
      
      // Call success callback if provided
      if (onSuccess) onSuccess();
    }, 1000);
  };

  return (
    <div className="space-y-4 p-6 bg-white dark:bg-gray-800/30 rounded-lg border border-border shadow-sm">
      <h3 className="text-xl font-semibold">List Secondhand Book</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="bookName" className="text-sm font-medium">
            Book Name
          </label>
          <div className="relative">
            <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="bookName"
              placeholder="Enter book title"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="price" className="text-sm font-medium">
            Price (₹)
          </label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="price"
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="pl-10"
              min="0"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="location" className="text-sm font-medium">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="location"
              placeholder="Enter your location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-book-primary hover:bg-book-primary/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Listing..." : "List Book"}
        </Button>
      </form>
    </div>
  );
}
