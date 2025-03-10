
import { useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const UserAccount = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-12">
        <div className="page-container">
          <h1 className="text-3xl font-bold mb-4">User Account</h1>
          <p className="text-muted-foreground">This page will be implemented in the next phase.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserAccount;
