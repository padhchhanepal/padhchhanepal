
import { useState } from "react";
import { MapPin, Book, Tag, User, MessageSquare, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addBook } from "@/data/mock-books";

interface SecondaryBookFormProps {
  onSuccess?: () => void;
}

export function SecondaryBookForm({ onSuccess }: SecondaryBookFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [location, setLocation] = useState("");
  const [sellerContact, setSellerContact] = useState("");
  const [condition, setCondition] = useState<"like-new" | "good" | "fair" | "poor">("good");
  const [description, setDescription] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [language, setLanguage] = useState<"english" | "nepali">("english");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Add the new secondhand book to our mock database
    try {
      const newBook = addBook({
        title,
        author,
        price: Number(price),
        originalPrice: Number(originalPrice) || Number(price),
        cover: coverUrl || "https://images.unsplash.com/photo-1512820790803-83ca734da794", // Default secondhand book cover
        language,
        isNew: false,
        condition,
        location,
        sellerContact,
        description
      });
      
      toast({
        title: "Book listed successfully",
        description: `"${title}" has been added to the secondhand marketplace.`,
      });
      
      // Reset form
      setTitle("");
      setAuthor("");
      setPrice("");
      setOriginalPrice("");
      setLocation("");
      setSellerContact("");
      setCondition("good");
      setDescription("");
      setCoverUrl("");
      
      // Call success callback if provided
      if (onSuccess) onSuccess();
      
    } catch (error) {
      toast({
        title: "Error listing book",
        description: "There was a problem adding your secondhand book. Please try again.",
        variant: "destructive",
      });
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-4 p-6 bg-white dark:bg-gray-800/30 rounded-lg border border-border shadow-sm">
      <h3 className="text-xl font-semibold">List Secondhand Book</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="bookTitle" className="text-sm font-medium">
            Book Title*
          </label>
          <div className="relative">
            <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="bookTitle"
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

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-medium">
              Your Price (₹)*
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="price"
                type="number"
                placeholder="Enter your asking price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="pl-10"
                min="0"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="originalPrice" className="text-sm font-medium">
              Original Price (₹)
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="originalPrice"
                type="number"
                placeholder="Original retail price"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="pl-10"
                min="0"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="condition" className="text-sm font-medium">
            Book Condition*
          </label>
          <Select value={condition} onValueChange={(value: any) => setCondition(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select book condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="like-new">Like New (minimal to no wear)</SelectItem>
              <SelectItem value="good">Good (minor wear, no markings)</SelectItem>
              <SelectItem value="fair">Fair (visible wear, may have markings)</SelectItem>
              <SelectItem value="poor">Poor (significant wear, all pages intact)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="language" className="text-sm font-medium">
            Book Language*
          </label>
          <Select value={language} onValueChange={(value: any) => setLanguage(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select book language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="nepali">Nepali</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="location" className="text-sm font-medium">
            Your Location*
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="location"
              placeholder="Enter your location (city)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="contact" className="text-sm font-medium">
            Contact Information*
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="contact"
              placeholder="Email or phone number"
              value={sellerContact}
              onChange={(e) => setSellerContact(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="coverUrl" className="text-sm font-medium">
            Book Cover Image URL
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
            Book Description*
          </label>
          <Textarea
            id="description"
            placeholder="Describe the book condition, any markings, etc."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-book-secondary hover:bg-book-secondary/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Listing..." : "List Secondhand Book"}
        </Button>
        
        <p className="text-xs text-muted-foreground text-center">
          By listing your book, you agree to allow potential buyers to contact you through the information provided.
        </p>
      </form>
    </div>
  );
}
