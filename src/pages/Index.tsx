
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { Bestsellers } from "@/components/home/bestsellers";
import { FeaturedReviews } from "@/components/home/featured-reviews";
import { BooksByCategory } from "@/components/home/books-by-category";
import { PoetrySessions } from "@/components/home/poetry-sessions";

function Index() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Padhchha Nepal - Discover, Read, and Share Books</title>
        <meta 
          name="description" 
          content="Discover new books, share your favorites, and connect with fellow readers at Padhchha Nepal, Nepal's premier community for book lovers."
        />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          <HeroSection />
          <Bestsellers />
          <BooksByCategory />
          <FeaturedReviews />
        </main>
        
        <Footer />
      </div>
    </>
  );
}

export default Index;
