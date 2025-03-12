
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, UserCircle, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface PoetrySession {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  host: string;
  attendees: number;
  maxAttendees: number;
  description: string;
  imageUrl: string;
  longDescription?: string;
}

// This would typically come from an API
const mockSessions: PoetrySession[] = [
  {
    id: "ps1",
    title: "Himalayan Verses",
    date: "2023-08-15", 
    time: "17:00 - 19:00",
    location: "Thamel Book Café, Kathmandu",
    host: "Maya Sharma",
    attendees: 15,
    maxAttendees: 30,
    description: "An evening of poetry inspired by the majestic Himalayas. Share your poems or just come to listen and enjoy.",
    imageUrl: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80",
    longDescription: "Join us for an inspiring evening of poetry dedicated to the Himalayas. This event welcomes poets of all levels to share their work inspired by the majestic mountains that define our landscape and culture. Whether you're an experienced poet or someone who appreciates the art form, this session offers a warm, inclusive environment to explore the beauty of words.\n\nThe evening will begin with readings from featured local poets, followed by an open mic session where attendees can share their own work. Light refreshments will be provided, and a small book display will offer poetry collections for browsing and purchase."
  },
  {
    id: "ps2",
    title: "Urban Echoes",
    date: "2023-08-22",
    time: "18:30 - 20:30",
    location: "Lalitpur Literature Hub",
    host: "Raj Patel",
    attendees: 22,
    maxAttendees: 25,
    description: "Poetry that reflects our urban experiences, struggles, and triumphs in the concrete jungle.",
    imageUrl: "https://images.unsplash.com/photo-1543310465-f4d3ca5a2a25?auto=format&fit=crop&q=80",
    longDescription: "Urban Echoes is a poetry session focused on the contemporary urban experience in Nepal. From the bustle of Kathmandu's streets to the quiet corners of city life, this session explores how urban living shapes our perspectives, challenges, and dreams.\n\nThe session will feature both established and emerging voices in the local poetry scene, with special emphasis on work that captures the complexities of modern urban life. Attendees are encouraged to bring their own poetry that speaks to city experiences, social issues, or personal reflections on urban living."
  },
  {
    id: "ps3",
    title: "Nepali Traditional Poetry",
    date: "2023-09-05",
    time: "16:00 - 18:00",
    location: "Heritage Center, Bhaktapur",
    host: "Sunita Thapa",
    attendees: 18,
    maxAttendees: 40,
    description: "Celebrating our rich poetic traditions with readings of classic and contemporary Nepali poetry.",
    imageUrl: "https://images.unsplash.com/photo-1560111137-78deaf6a0b6b?auto=format&fit=crop&q=80",
    longDescription: "This special session celebrates the rich heritage of Nepali poetry, from classical works to contemporary interpretations of traditional forms. Hosted at the historic Heritage Center in Bhaktapur, the event creates a perfect blend of literary and cultural immersion.\n\nThe program includes recitations of classic Nepali poems, discussions about poetic traditions and their evolution, and performances that blend poetry with traditional music. A short workshop will introduce attendees to traditional Nepali poetic forms and techniques. This session is ideal for anyone interested in the cultural heritage of Nepal and how it continues to inspire contemporary creative expression."
  }
];

function PoetrySessionDetail() {
  const { id } = useParams<{ id: string }>();
  const [session, setSession] = useState<PoetrySession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      const foundSession = mockSessions.find(s => s.id === id) || null;
      setSession(foundSession);
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleRegister = () => {
    if (!session) return;
    
    if (session.attendees >= session.maxAttendees) {
      toast({
        title: "Session Full",
        description: "This poetry session is already at maximum capacity.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, you would make an API call to register
    setSession({
      ...session,
      attendees: session.attendees + 1
    });
    
    toast({
      title: "Registration Successful",
      description: `You've registered for "${session.title}"`,
    });
  };

  // Handle not found
  if (!isLoading && !session) {
    return (
      <>
        <Helmet>
          <title>Session Not Found | Padhchha Nepal</title>
        </Helmet>
        
        <div className="min-h-screen flex flex-col">
          <Navbar />
          
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Poetry Session Not Found</h1>
              <p className="mb-6">The poetry session you're looking for doesn't exist.</p>
              <Button asChild>
                <Link to="/poetry">View All Poetry Sessions</Link>
              </Button>
            </div>
          </main>
          
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{isLoading ? "Loading..." : `${session?.title} | Padhchha Nepal`}</title>
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          {isLoading ? (
            <div className="page-container py-12">
              <div className="h-96 w-full rounded-lg bg-muted animate-pulse mb-6"></div>
              <div className="h-8 w-64 bg-muted animate-pulse mb-4"></div>
              <div className="h-4 w-full bg-muted animate-pulse mb-2"></div>
              <div className="h-4 w-full bg-muted animate-pulse mb-2"></div>
              <div className="h-4 w-3/4 bg-muted animate-pulse"></div>
            </div>
          ) : (
            <>
              <div className="h-96 relative">
                <img 
                  src={session?.imageUrl} 
                  alt={session?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end">
                  <div className="page-container pb-12">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mb-4 bg-black/30 text-white border-white/30 hover:bg-black/50 hover:text-white"
                      asChild
                    >
                      <Link to="/poetry">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to All Sessions
                      </Link>
                    </Button>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{session?.title}</h1>
                    <p className="text-white/80 text-xl max-w-3xl">{session?.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="page-container py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold mb-4">About This Session</h2>
                    {session?.longDescription?.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                  
                  <div>
                    <div className="bg-secondary p-6 rounded-lg sticky top-6">
                      <h3 className="text-xl font-semibold mb-6">Session Details</h3>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-book-primary" />
                          <div>
                            <p className="font-medium">Date</p>
                            <p className="text-muted-foreground">
                              {new Date(session?.date || "").toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-book-primary" />
                          <div>
                            <p className="font-medium">Time</p>
                            <p className="text-muted-foreground">{session?.time}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <MapPin className="h-5 w-5 text-book-primary" />
                          <div>
                            <p className="font-medium">Location</p>
                            <p className="text-muted-foreground">{session?.location}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <UserCircle className="h-5 w-5 text-book-primary" />
                          <div>
                            <p className="font-medium">Host</p>
                            <p className="text-muted-foreground">{session?.host}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Users className="h-5 w-5 text-book-primary" />
                          <div>
                            <p className="font-medium">Attendance</p>
                            <p className="text-muted-foreground">
                              {session?.attendees}/{session?.maxAttendees} Registered
                              {session?.attendees === session?.maxAttendees && " (Full)"}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full"
                        onClick={handleRegister}
                        disabled={session?.attendees === session?.maxAttendees}
                      >
                        {session?.attendees === session?.maxAttendees ? "Session Full" : "Register Now"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
        
        <Footer />
      </div>
    </>
  );
}

export default PoetrySessionDetail;
