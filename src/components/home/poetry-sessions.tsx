
import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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
}

// Mock data for poetry sessions
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
  }
];

export function PoetrySessions() {
  const [sessions, setSessions] = useState<PoetrySession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setSessions(mockSessions);
      setIsLoading(false);
    }, 800);
  }, []);

  const handleRegister = (session: PoetrySession) => {
    if (session.attendees >= session.maxAttendees) {
      toast({
        title: "Session Full",
        description: "This poetry session is already at maximum capacity.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, you would make an API call to register
    const updatedSessions = sessions.map(s => 
      s.id === session.id ? { ...s, attendees: s.attendees + 1 } : s
    );
    
    setSessions(updatedSessions);
    toast({
      title: "Registration Successful",
      description: `You've registered for "${session.title}"`,
    });
  };

  return (
    <section className="py-12 bg-gradient-to-b from-purple-50 to-transparent dark:from-purple-950/20 dark:to-transparent">
      <div className="page-container">
        <h2 className="section-title mb-8">Poetry Sessions</h2>
        <p className="text-lg max-w-3xl mb-10">
          Join our community poetry readings and workshops. Share your verses, discover new poets, 
          and immerse yourself in the rhythm of words.
        </p>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="h-96 rounded-lg bg-muted animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((session) => (
              <div 
                key={session.id} 
                className="bg-white dark:bg-black/20 backdrop-blur-sm rounded-lg overflow-hidden shadow-md border border-border hover:shadow-lg transition-shadow"
              >
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={session.imageUrl} 
                    alt={session.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <h3 className="text-white text-xl font-bold p-4">{session.title}</h3>
                  </div>
                </div>
                
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(session.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{session.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{session.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{session.attendees}/{session.maxAttendees} Attendees</span>
                  </div>
                  
                  <p className="text-sm line-clamp-3">{session.description}</p>
                  
                  <div className="flex justify-between items-center pt-2">
                    <Button 
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <Link to={`/poetry/${session.id}`}>Details</Link>
                    </Button>
                    
                    <Button 
                      size="sm"
                      onClick={() => handleRegister(session)}
                      disabled={session.attendees >= session.maxAttendees}
                      className={session.attendees >= session.maxAttendees ? "bg-muted" : ""}
                    >
                      {session.attendees >= session.maxAttendees ? "Full" : "Register"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-10 text-center">
          <Button asChild>
            <Link to="/poetry">View All Poetry Sessions</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
