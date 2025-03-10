
import { Star, Book } from "lucide-react";
import { BookData } from "@/components/ui/book-card";

// Sample data for popular books with seller reviews
const POPULAR_BOOKS = [
  {
    id: "1",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "/placeholder.svg",
    price: 280,
    originalPrice: 350,
    language: "english" as const,
    isNew: false,
    sellerReview: "Excellent condition, barely used. A classic that everyone should read.",
    sellerName: "Rajesh Sharma",
    rating: 5
  },
  {
    id: "2",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "/placeholder.svg",
    price: 320,
    originalPrice: 400,
    language: "english" as const,
    isNew: false,
    sellerReview: "Minor wear on the cover, but pages are in great condition. One of my favorites.",
    sellerName: "Priya Patel",
    rating: 4
  },
  {
    id: "3",
    title: "Seto Dharti",
    author: "Amar Neupane",
    cover: "/placeholder.svg",
    price: 250,
    originalPrice: 300,
    language: "nepali" as const,
    isNew: false,
    sellerReview: "New condition, read only once. A beautiful portrayal of rural Nepal.",
    sellerName: "Anup Thapa",
    rating: 5
  },
  {
    id: "4",
    title: "Palpasa Cafe",
    author: "Narayan Wagle",
    cover: "/placeholder.svg",
    price: 220,
    originalPrice: 275,
    language: "nepali" as const,
    isNew: false,
    sellerReview: "Like new, no marks or creases. A moving story about Nepal's civil war.",
    sellerName: "Suman Basnet",
    rating: 5
  },
  {
    id: "5",
    title: "1984",
    author: "George Orwell",
    cover: "/placeholder.svg",
    price: 290,
    originalPrice: 350,
    language: "english" as const,
    isNew: false,
    sellerReview: "Good condition with some notes in margins. A thought-provoking dystopian novel.",
    sellerName: "Diksha Shrestha",
    rating: 4
  },
  {
    id: "6",
    title: "Summer Love",
    author: "Subin Bhattarai",
    cover: "/placeholder.svg",
    price: 200,
    originalPrice: 250,
    language: "nepali" as const,
    isNew: false,
    sellerReview: "Excellent condition. A charming coming-of-age story that resonates with young adults.",
    sellerName: "Kabir KC",
    rating: 4
  },
  {
    id: "7",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover: "/placeholder.svg",
    price: 310,
    originalPrice: 380,
    language: "english" as const,
    isNew: false,
    sellerReview: "Like new, special edition with beautiful cover art. A timeless classic.",
    sellerName: "Nisha Gurung",
    rating: 5
  },
  {
    id: "8",
    title: "Karnali Blues",
    author: "Buddhisagar",
    cover: "/placeholder.svg",
    price: 280,
    originalPrice: 330,
    language: "nepali" as const,
    isNew: false,
    sellerReview: "Good condition. A moving father-son story that captures rural Nepali life perfectly.",
    sellerName: "Ramesh Karki",
    rating: 4
  },
  {
    id: "9",
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    cover: "/placeholder.svg",
    price: 350,
    originalPrice: 425,
    language: "english" as const,
    isNew: false,
    sellerReview: "Great condition, first edition. The beginning of the magical journey that captured millions.",
    sellerName: "Aakash Rai",
    rating: 5
  },
  {
    id: "10",
    title: "Pagal Basti",
    author: "Saru Bhakta",
    cover: "/placeholder.svg",
    price: 230,
    originalPrice: 275,
    language: "nepali" as const,
    isNew: false,
    sellerReview: "Like new. A powerful novel exploring psychological themes in a Nepali context.",
    sellerName: "Sarita Tamang",
    rating: 4
  }
];

export function PopularBooksList() {
  return (
    <div className="p-6 bg-white dark:bg-gray-800/30 rounded-lg border border-border shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Popular Books</h2>
      <div className="space-y-4">
        {POPULAR_BOOKS.map((book) => (
          <div 
            key={book.id} 
            className="p-4 rounded-lg border border-border bg-white dark:bg-gray-800/30 hover:border-book-primary/50 transition-colors"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-16 md:h-20 flex-shrink-0 bg-muted rounded overflow-hidden">
                <img 
                  src={book.cover} 
                  alt={book.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-grow space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                      <Book className="h-4 w-4 text-book-primary" />
                      {book.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                  </div>
                  
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < book.rating ? "fill-amber-400 text-amber-400" : "text-gray-300 dark:text-gray-600"}`} 
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="font-semibold">₹{book.price}</span>
                  {book.originalPrice > book.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{book.originalPrice}
                    </span>
                  )}
                  <span className="text-xs px-2 py-0.5 rounded-full bg-book-primary/10 text-book-primary">
                    {book.language === "english" ? "English" : "Nepali"}
                  </span>
                </div>
                
                <div className="text-sm">
                  <p className="text-muted-foreground italic">"{book.sellerReview}"</p>
                  <p className="text-xs mt-1 font-medium">— {book.sellerName}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
