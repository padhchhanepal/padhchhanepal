
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { SearchBar } from "@/components/ui/search-bar";
import { 
  Menu, 
  X, 
  ShoppingCart, 
  Heart, 
  User, 
  LogIn 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Check if user is on homepage to adjust navbar transparency
  const isHomepage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { title: "Home", href: "/" },
    { title: "Books", href: "/books" },
    { title: "Secondhand", href: "/secondhand" },
    { title: "E-books", href: "/ebooks" },
    { title: "Audiobooks", href: "/audiobooks" },
  ];

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = location.pathname === href;
    
    return (
      <Link
        to={href}
        className={cn(
          "relative px-3 py-2 text-sm font-medium transition-colors duration-300",
          "hover:text-book-primary",
          isActive ? "text-book-primary" : "text-foreground"
        )}
      >
        {children}
        <span
          className={cn(
            "absolute bottom-0 left-0 w-full h-0.5 bg-book-primary transform origin-left rounded-full",
            "transition-transform duration-300 ease-out",
            isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          )}
        />
      </Link>
    );
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        isScrolled || !isHomepage
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Logo className="z-20" />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.title}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <SearchBar className="mr-4" />
          
          <button
            className="p-2 rounded-full text-muted-foreground hover:text-book-primary hover:bg-book-secondary/50 transition-colors duration-300"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
          </button>
          
          <button
            className="p-2 rounded-full text-muted-foreground hover:text-book-primary hover:bg-book-secondary/50 transition-colors duration-300"
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
          
          <Button asChild variant="outline" className="rounded-full" size="sm">
            <Link to="/login">
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-full text-muted-foreground hover:bg-book-secondary/50 transition-colors duration-300 z-20"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 z-10 bg-white dark:bg-black flex flex-col p-6 pt-20 transition-all duration-500 ease-in-out",
            isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          )}
        >
          <SearchBar className="mb-8" />
          
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "py-2 text-lg font-medium transition-colors duration-300",
                  "hover:text-book-primary",
                  location.pathname === item.href
                    ? "text-book-primary"
                    : "text-foreground"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          
          <div className="mt-auto flex flex-col space-y-4">
            <Link
              to="/wishlist"
              className="flex items-center gap-2 py-3 text-foreground hover:text-book-primary transition-colors"
            >
              <Heart className="w-5 h-5" />
              <span>Wishlist</span>
            </Link>
            
            <Link
              to="/cart"
              className="flex items-center gap-2 py-3 text-foreground hover:text-book-primary transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
            </Link>
            
            <Link
              to="/login"
              className="flex items-center gap-2 py-3 text-foreground hover:text-book-primary transition-colors"
            >
              <LogIn className="w-5 h-5" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
