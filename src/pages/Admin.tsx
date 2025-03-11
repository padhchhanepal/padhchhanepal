
import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SecondaryBookForm } from "@/components/admin/SecondaryBookForm";
import { SecondaryBooksList } from "@/components/admin/SecondaryBooksList";
import { SearchBar } from "@/components/ui/search-bar";
import { PopularBooksList } from "@/components/admin/PopularBooksList";
import { Book, BookOpen, ShoppingBag } from "lucide-react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookType, setBookType] = useState<"all" | "new" | "secondhand">("all");
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
    // In a real app, this would trigger an API call to search books
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-12">
        <div className="page-container">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          
          <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="new-books">New Books</TabsTrigger>
              <TabsTrigger value="secondary">Secondhand Books</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="space-y-6">
              <div className="p-6 bg-white dark:bg-gray-800/30 rounded-lg border border-border shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Search Books</h2>
                <SearchBar 
                  onSearch={handleSearch} 
                  placeholder="Search by title, author, or genre..." 
                  className="max-w-full mb-2"
                />
                {searchQuery && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Showing results for: "{searchQuery}"
                  </p>
                )}
              </div>
              
              <div className="p-6 bg-white dark:bg-gray-800/30 rounded-lg border border-border shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Book Management</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-book-primary/10 rounded-lg border border-book-primary/20">
                    <div className="flex items-center gap-3 mb-2">
                      <BookOpen className="h-6 w-6 text-book-primary" />
                      <h3 className="font-semibold">New Books</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Manage your new book inventory, prices, and details</p>
                    <button 
                      onClick={() => setActiveTab("new-books")}
                      className="w-full py-2 bg-book-primary text-white rounded-md hover:bg-book-primary/90 transition-colors"
                    >
                      Manage New Books
                    </button>
                  </div>
                  
                  <div className="p-4 bg-book-secondary/10 rounded-lg border border-book-secondary/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Book className="h-6 w-6 text-book-secondary" />
                      <h3 className="font-semibold">Secondhand Books</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Manage secondhand book listings, approvals and sellers</p>
                    <button 
                      onClick={() => setActiveTab("secondary")}
                      className="w-full py-2 bg-book-secondary text-white rounded-md hover:bg-book-secondary/90 transition-colors"
                    >
                      Manage Secondhand Books
                    </button>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg border border-border">
                    <div className="flex items-center gap-3 mb-2">
                      <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                      <h3 className="font-semibold">Orders</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">View and manage customer orders and deliveries</p>
                    <button 
                      onClick={() => setActiveTab("orders")}
                      className="w-full py-2 bg-muted-foreground text-white rounded-md hover:bg-muted-foreground/90 transition-colors"
                    >
                      Manage Orders
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-white dark:bg-gray-800/30 rounded-lg border border-border shadow-sm mb-4">
                <h2 className="text-xl font-semibold mb-4">Book Type Filter</h2>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setBookType("all")}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                      bookType === "all" 
                        ? "bg-book-primary text-white" 
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    <ShoppingBag className="h-4 w-4" />
                    All Books
                  </button>
                  <button 
                    onClick={() => setBookType("new")}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                      bookType === "new" 
                        ? "bg-book-primary text-white" 
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    <BookOpen className="h-4 w-4" />
                    New Books
                  </button>
                  <button 
                    onClick={() => setBookType("secondhand")}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                      bookType === "secondhand" 
                        ? "bg-book-primary text-white" 
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    <Book className="h-4 w-4" />
                    Secondhand Books
                  </button>
                </div>
              </div>
              
              <PopularBooksList bookType={bookType} />
            </TabsContent>
            
            <TabsContent value="new-books" className="space-y-6">
              <div className="p-6 bg-white dark:bg-gray-800/30 rounded-lg border border-border shadow-sm">
                <h2 className="text-xl font-semibold mb-4">New Books Management</h2>
                <p className="text-muted-foreground mb-4">
                  This section allows you to manage your new book inventory. Add, edit, or remove books from your store.
                </p>
                <div className="bg-book-primary/5 border border-book-primary/20 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Publication Information</h3>
                  <p className="text-sm text-muted-foreground">
                    New books are sourced directly from publishers with standardized discounts:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                    <li>English books: <span className="font-medium text-book-english">35% discount</span></li>
                    <li>Nepali books: <span className="font-medium text-book-nepali">15% discount</span></li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="secondary" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <SecondaryBookForm />
                </div>
                <div className="lg:col-span-2">
                  <SecondaryBooksList />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="orders" className="space-y-6">
              <div className="p-6 bg-white dark:bg-gray-800/30 rounded-lg border border-border shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Order Management</h2>
                <p className="text-muted-foreground">
                  Order management features will be implemented in the next phase.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-6">
              <div className="p-6 bg-white dark:bg-gray-800/30 rounded-lg border border-border shadow-sm">
                <h2 className="text-xl font-semibold mb-4">User Management</h2>
                <p className="text-muted-foreground">
                  User management features will be implemented in the next phase.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
