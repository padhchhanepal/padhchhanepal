
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import BookDetail from "./pages/BookDetail";
import UserAccount from "./pages/UserAccount";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Preload images for faster loading
const preloadImages = () => {
  const images = [
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    "https://images.unsplash.com/photo-1629992101753-56d196c8aabb",
    "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
    "https://images.unsplash.com/photo-1541963463532-d68292c34b19",
    "https://images.unsplash.com/photo-1478720568477-152d9b164e26",
    "https://images.unsplash.com/photo-1476275466078-4007374efbbe"
  ];
  
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

const App = () => {
  useEffect(() => {
    preloadImages();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/account" element={<UserAccount />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
