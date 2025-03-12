
import { Helmet } from "react-helmet";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PoetrySessions } from "@/components/home/poetry-sessions";

function Poetry() {
  return (
    <>
      <Helmet>
        <title>Poetry Sessions | Padhchha Nepal</title>
        <meta name="description" content="Discover and join poetry reading sessions and workshops at Padhchha Nepal." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          <div className="page-container py-12">
            <h1 className="text-4xl font-bold mb-6">Poetry Sessions & Workshops</h1>
            <p className="text-lg max-w-3xl mb-12">
              Immerse yourself in the world of poetry. Join our community sessions, listen to talented poets,
              and share your own work in a supportive environment.
            </p>
            
            <PoetrySessions />
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}

export default Poetry;
