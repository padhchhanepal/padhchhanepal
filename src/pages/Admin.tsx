
import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SecondaryBookForm } from "@/components/admin/SecondaryBookForm";
import { SecondaryBooksList } from "@/components/admin/SecondaryBooksList";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                <h2 className="text-xl font-semibold mb-4">Welcome to Admin Dashboard</h2>
                <p className="text-muted-foreground">
                  This dashboard will have more features in the next phase. Currently, you can manage secondhand books.
                </p>
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
