
import { useEffect, useState } from "react";
import { Book, MapPin, Edit, Trash2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookData } from "@/components/ui/book-card";
import { deleteBook, mockBooks } from "@/data/mock-books";
import { useToast } from "@/components/ui/use-toast";

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
              className="p-4 rounded-lg border border-border flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gray-800/30"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Book className="h-4 w-4 text-book-primary" />
                  <h4 className="font-medium">{book.title}</h4>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Tag className="h-3.5 w-3.5" />
                    <span>₹{book.price}</span>
                  </div>
                  <span className="hidden sm:inline">•</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>By: {book.author}</span>
                  </div>
                </div>
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
