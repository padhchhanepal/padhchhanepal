
import { useEffect, useState } from "react";
import { Book, MapPin, Edit, Trash2, Tag, MessageSquare, AlertCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookData } from "@/components/ui/book-card";
import { deleteBook, mockBooks } from "@/data/mock-books";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

export function SecondaryBooksList() {
  const [secondhandBooks, setSecondhandBooks] = useState<BookData[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Filter for secondhand books (not new)
    const filteredBooks = mockBooks.filter(book => !book.isNew);
    setSecondhandBooks(filteredBooks);
  }, []);

  const handleDeleteBook = (id: string) => {
    // Call the delete function from mock-books.ts
    deleteBook(id);
    
    // Update the local state
    setSecondhandBooks(prevBooks => prevBooks.filter(book => book.id !== id));
    
    // Show success toast
    toast({
      title: "Book Deleted",
      description: "The secondhand book has been removed from your catalog.",
    });
  };

  const getConditionBadge = (condition: string) => {
    switch(condition) {
      case 'like-new':
        return <Badge className="bg-green-500">Like New</Badge>;
      case 'good':
        return <Badge className="bg-blue-500">Good</Badge>;
      case 'fair':
        return <Badge className="bg-yellow-500">Fair</Badge>;
      case 'poor':
        return <Badge className="bg-red-500">Poor</Badge>;
      default:
        return <Badge>{condition}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Secondhand Books</h3>
      
      {secondhandBooks.length === 0 ? (
        <div className="p-8 text-center border border-dashed rounded-lg bg-muted/30">
          <Book className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
          <h4 className="text-lg font-medium">No secondhand books</h4>
          <p className="text-muted-foreground">
            Secondhand books that users list will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {secondhandBooks.map((book) => (
            <div 
              key={book.id} 
              className="p-4 rounded-lg border border-border flex flex-col md:flex-row gap-4 bg-white dark:bg-gray-800/30"
            >
              {/* Book cover image */}
              <div className="w-full md:w-24 h-32 flex-shrink-0">
                <img 
                  src={book.cover} 
                  alt={book.title} 
                  className="w-full h-full object-cover rounded-md border border-border"
                />
              </div>
              
              <div className="flex-grow space-y-2">
                {/* Book title and condition */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Book className="h-4 w-4 text-book-secondary" />
                    <h4 className="font-medium">{book.title}</h4>
                  </div>
                  {book.condition && getConditionBadge(book.condition)}
                </div>
                
                {/* Book details */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Tag className="h-3.5 w-3.5" />
                    <span>₹{book.price}</span>
                  </div>
                  <span className="hidden sm:inline">•</span>
                  <div className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    <span>{book.author}</span>
                  </div>
                </div>
                
                {/* Seller information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{book.location || "Location not specified"}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>{book.sellerContact || "Contact not provided"}</span>
                  </div>
                </div>
                
                {/* Book description */}
                {book.description && (
                  <div className="text-sm text-muted-foreground border-t pt-2 mt-2">
                    <p className="line-clamp-2">{book.description}</p>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2 self-end md:self-center">
                <Button variant="outline" size="sm" className="h-8">
                  <Edit className="h-3.5 w-3.5 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 text-destructive hover:text-destructive border-destructive/30 hover:border-destructive"
                  onClick={() => handleDeleteBook(book.id)}
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
