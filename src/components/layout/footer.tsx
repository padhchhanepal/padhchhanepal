
import { Link } from "react-router-dom";
import { Logo } from "@/components/ui/logo";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-book-secondary/30 dark:bg-book-primary/10 pt-12 pb-6 border-t border-border mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div className="space-y-4">
            <Logo className="mb-3" />
            <p className="text-muted-foreground text-sm">
              Nepal's premier online book store, bringing you the best in literature, education, and entertainment through a seamless shopping experience.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-book-primary transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-book-primary transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-book-primary transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { text: "New Arrivals", href: "/books" },
                { text: "Best Sellers", href: "/books?sort=bestseller" },
                { text: "Secondhand Books", href: "/secondhand" },
                { text: "E-books", href: "/ebooks" },
                { text: "Audiobooks", href: "/audiobooks" },
                { text: "Sale & Offers", href: "/sale" },
              ].map((link) => (
                <li key={link.text}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-book-primary transition-colors duration-300 text-sm"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              {[
                { text: "My Account", href: "/account" },
                { text: "Track Order", href: "/track-order" },
                { text: "Returns Policy", href: "/returns" },
                { text: "Shipping Information", href: "/shipping" },
                { text: "FAQ", href: "/faq" },
                { text: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.text}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-book-primary transition-colors duration-300 text-sm"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="space-y-3">
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Your email address"
                  className="rounded-l-lg rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button className="rounded-l-none">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                By subscribing you agree to our{" "}
                <Link to="/privacy" className="underline hover:text-book-primary">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t border-border pt-8 pb-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-book-primary" />
              <span className="text-sm">Kathmandu, Nepal</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-book-primary" />
              <span className="text-sm">+977 9800000000</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-book-primary" />
              <span className="text-sm">info@padhchhanepal.com</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Padhchha Nepal. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link to="/terms" className="hover:text-book-primary">Terms & Conditions</Link>
            <span>•</span>
            <Link to="/privacy" className="hover:text-book-primary">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
