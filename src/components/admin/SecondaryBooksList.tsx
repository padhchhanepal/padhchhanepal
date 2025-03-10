
import { Book, MapPin, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample data for demonstration
const SAMPLE_BOOKS = [
  {
    id: "1",
    title: "To Kill a Mockingbird",
    price: 280,
    location: "Kathmandu, Nepal",
    status: "active"
  },
  {
    id: "2",
    title: "Seto Dharti",
    price: 350,
    location: "Pokhara, Nepal",
    status: "active"
  },
  {
    id: "3",
    title: "The Great Gatsby",
    price: 420,
    location: "Lalitpur, Nepal", 
    status: "pending"
  }
];

export function SecondaryBooksList() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Your Listed Books</h3>
      
      <div className="space-y-4">
        {SAMPLE_BOOKS.map((book) => (
          <div 
            key={book.id} 
            className={`p-4 rounded-lg border border-border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
              book.status === "pending" ? "bg-amber-50 dark:bg-amber-950/20" : "bg-white dark:bg-gray-800/30"
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Book className="h-4 w-4 text-book-primary" />
                <h4 className="font-medium">{book.title}</h4>
                {book.status === "pending" && (
                  <span className="text-xs px-2 py-0.5 bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 rounded-full">
                    Pending Approval
                  </span>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Tag className="h-3.5 w-3.5" />
                  <span>₹{book.price}</span>
                </div>
                <span className="hidden sm:inline">•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{book.location}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 self-end md:self-center">
              <Button variant="outline" size="sm" className="h-8">
                <Edit className="h-3.5 w-3.5 mr-1" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="h-8 text-destructive hover:text-destructive border-destructive/30 hover:border-destructive">
                <Trash2 className="h-3.5 w-3.5 mr-1" />
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
