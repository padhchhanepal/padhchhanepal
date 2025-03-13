
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BookOpen, ShoppingCart, CreditCard, ArrowLeft, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BookData } from "@/components/ui/book-card";
import { mockBooks } from "@/data/mock-books";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState<BookData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod" | "wallet">("card");
  const { toast } = useToast();

  // Fetch book data
  useEffect(() => {
    // In a real app, this would be an API call
    const timer = setTimeout(() => {
      const foundBook = mockBooks.find(b => b.id === id);
      setBook(foundBook || null);
      setLoading(false);
    }, 1000);

    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    return () => clearTimeout(timer);
  }, [id]);

  const handleBuyNow = () => {
    toast({
      title: "Order Placed Successfully",
      description: `You ordered "${book?.title}" with ${
        paymentMethod === "card" ? "Card Payment" : 
        paymentMethod === "cod" ? "Cash on Delivery" : 
        "Digital Wallet"
      }`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-12">
        <div className="page-container">
          {loading ? (
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="w-12 h-12 rounded-full border-4 border-book-primary border-t-transparent animate-spin" />
            </div>
          ) : book ? (
            <div className="space-y-8">
              <Link to="/" className="flex items-center text-muted-foreground hover:text-book-primary transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Book Image */}
                <div className="flex justify-center">
                  <div className="relative w-64 md:w-80">
                    <img 
                      src={book.cover} 
                      alt={book.title} 
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                    {book.originalPrice > book.price && (
                      <div className="absolute -top-3 -right-3 bg-book-primary text-white text-sm font-bold rounded-full h-14 w-14 flex items-center justify-center shadow-lg">
                        {Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}%
                        <br />
                        OFF
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Book Details */}
                <div className="space-y-6">
                  <div>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                      book.language === "english" 
                        ? "bg-book-english/10 text-book-english" 
                        : "bg-book-nepali/10 text-book-nepali"
                    }`}>
                      {book.language === "english" ? "English" : "Nepali"}
                    </div>
                    <h1 className="text-3xl font-bold">{book.title}</h1>
                    <p className="text-lg text-muted-foreground">by {book.author}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">₹{book.price}</span>
                    {book.originalPrice > book.price && (
                      <span className="text-muted-foreground line-through">₹{book.originalPrice}</span>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold">Book Description</h3>
                    <p className="text-muted-foreground">
                      This captivating {book.language} book takes readers on an unforgettable journey through vivid 
                      storytelling and powerful narratives. Written by the acclaimed author {book.author}, 
                      this book has received widespread acclaim for its depth and engaging style.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold">Shipping Information</h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Delivery within 2-3 business days</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>Free shipping within Kathmandu Valley</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold">Payment Method</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant={paymentMethod === "card" ? "default" : "outline"} 
                        onClick={() => setPaymentMethod("card")}
                        className={paymentMethod === "card" ? "bg-book-primary hover:bg-book-primary/90" : ""}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Card Payment
                      </Button>
                      <Button 
                        variant={paymentMethod === "wallet" ? "default" : "outline"} 
                        onClick={() => setPaymentMethod("wallet")}
                        className={paymentMethod === "wallet" ? "bg-book-primary hover:bg-book-primary/90" : ""}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Digital Wallet
                      </Button>
                      <Button 
                        variant={paymentMethod === "cod" ? "default" : "outline"} 
                        onClick={() => setPaymentMethod("cod")}
                        className={paymentMethod === "cod" ? "bg-book-primary hover:bg-book-primary/90" : ""}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Cash on Delivery
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleBuyNow}
                    className="w-full bg-book-primary hover:bg-book-primary/90 h-12 text-lg"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Buy Now
                  </Button>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800/30 rounded-lg border border-border p-6 space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-book-primary" />
                  About this Book
                </h2>
                <p className="text-muted-foreground">
                  {book.title} is a {book.language} book that delves into themes of culture, identity, and human connection.
                  The author masterfully weaves a tale that resonates with readers from all walks of life.
                  Whether you're a seasoned reader or just starting your literary journey, this book offers
                  valuable insights and a truly immersive experience.
                </p>
                <p className="text-muted-foreground">
                  Published by Padhchha Nepal, this edition features high-quality paper and binding,
                  ensuring a premium reading experience. Each copy is carefully inspected to meet our
                  quality standards before being shipped to our valued customers.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-2">Book Not Found</h2>
              <p className="text-muted-foreground mb-6">We couldn't find the book you're looking for.</p>
              <Button asChild>
                <Link to="/">Return to Home</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookDetail;
