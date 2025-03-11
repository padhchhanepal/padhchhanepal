
import { useState } from "react";
import { BookOpen, Tag, User, FileText, Languages } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { addBook } from "@/data/mock-books";

interface NewBookFormProps {
  onSuccess?: () => void;
}

export function NewBookForm({ onSuccess }: NewBookFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState<"english" | "nepali">("english");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API submission
    setTimeout(() => {
      try {
        const newBook = addBook({
          title,
          author,
          price: Number(price),
          originalPrice: Number(originalPrice) || Number(price),
          cover: coverUrl || "https://images.unsplash.com/photo-1544947950-fa07a98d237f", // Default cover if none provided
          language,
          isNew: true
        });
        
        toast({
          title: "Book added successfully",
          description: `"${newBook.title}" has been added to your book catalog.`,
        });
        
        // Reset form
        setTitle("");
        setAuthor("");
        setPrice("");
        setOriginalPrice("");
        setCoverUrl("");
        setDescription("");
        
        // Call success callback if provided
        if (onSuccess) onSuccess();
      } catch (error) {
        toast({
          title: "Error adding book",
          description: "There was a problem adding your book. Please try again.",
          variant: "destructive",
        });
      }
      
      setIsSubmitting(false);
    }, 1000);
  };
  
  // Calculate discount based on language (35% for English, 15% for Nepali)
  const calculateSuggestedPrice = () => {
    if (!originalPrice) return "";
    const discount = language === "english" ? 0.35 : 0.15;
    const suggestedPrice = Math.round(Number(originalPrice) * (1 - discount));
    return suggestedPrice.toString();
  };
  
  // Update price when original price or language changes
  const handleOriginalPriceChange = (value: string) => {
    setOriginalPrice(value);
    if (value) {
      setPrice(calculateSuggestedPrice());
    }
  };
  
  const handleLanguageChange = (value: "english" | "nepali") => {
    setLanguage(value);
    if (originalPrice) {
      setPrice(calculateSuggestedPrice());
    }
  };

  return (
    <div className="space-y-4 p-6 bg-white dark:bg-gray-800/30 rounded-lg border border-border shadow-sm">
      <h3 className="text-xl font-semibold">Add New Book</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Book Title*
          </label>
          <div className="relative">
            <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="title"
              placeholder="Enter book title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="author" className="text-sm font-medium">
            Author*
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="author"
              placeholder="Enter author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="language" className="text-sm font-medium">
              Language*
            </label>
            <div className="flex space-x-4">
              <Button
                type="button"
                variant={language === "english" ? "default" : "outline"}
                onClick={() => handleLanguageChange("english")}
                className={language === "english" ? "bg-book-english" : ""}
              >
                <Languages className="h-4 w-4 mr-2" />
                English (35% off)
              </Button>
              <Button
                type="button"
                variant={language === "nepali" ? "default" : "outline"}
                onClick={() => handleLanguageChange("nepali")}
                className={language === "nepali" ? "bg-book-nepali" : ""}
              >
                <Languages className="h-4 w-4 mr-2" />
                Nepali (15% off)
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="originalPrice" className="text-sm font-medium">
              Original Price (₹)*
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="originalPrice"
                type="number"
                placeholder="Enter original price"
                value={originalPrice}
                onChange={(e) => handleOriginalPriceChange(e.target.value)}
                className="pl-10"
                min="0"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-medium">
              Selling Price (₹)*
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="price"
                type="number"
                placeholder="Enter selling price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="pl-10"
                min="0"
                required
              />
            </div>
            {originalPrice && (
              <p className="text-xs text-muted-foreground mt-1">
                Suggested price with {language === "english" ? "35%" : "15%"} discount: ₹{calculateSuggestedPrice()}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="coverUrl" className="text-sm font-medium">
            Cover Image URL
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="coverUrl"
              placeholder="Enter image URL (leave empty for default)"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              className="pl-10"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            A default image will be used if none is provided
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Book Description
          </label>
          <Textarea
            id="description"
            placeholder="Enter book description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-book-primary hover:bg-book-primary/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Book"}
        </Button>
      </form>
    </div>
  );
}
