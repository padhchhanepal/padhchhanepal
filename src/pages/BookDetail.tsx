
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);

  // This would be replaced with actual API call
  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    return () => clearTimeout(timer);
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-12">
        <div className="page-container">
          {loading ? (
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="w-12 h-12 rounded-full border-4 border-book-primary border-t-transparent animate-spin" />
            </div>
          ) : (
            <div>
              <h1 className="text-3xl font-bold mb-4">Book Detail Page</h1>
              <p>Book ID: {id}</p>
              <p className="mt-4 text-muted-foreground">This page will be implemented in the next phase.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookDetail;
