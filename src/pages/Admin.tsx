
import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SecondaryBookForm } from "@/components/admin/SecondaryBookForm";
import { SecondaryBooksList } from "@/components/admin/SecondaryBooksList";
import { SearchBar } from "@/components/ui/search-bar";
import { PopularBooksList } from "@/components/admin/PopularBooksList";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  
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
              
              <PopularBooksList />
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
