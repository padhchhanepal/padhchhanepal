
import { useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { Bestsellers } from "@/components/home/bestsellers";
import { FeaturedReviews } from "@/components/home/featured-reviews";
import { MostLovedBooks } from "@/components/home/most-loved-books";

const Index = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <Bestsellers />
        <MostLovedBooks />
        <FeaturedReviews />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
