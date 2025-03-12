import { BookData } from "@/components/ui/book-card";

export const mockBooks: BookData[] = [
  {
    id: "1",
    title: "Summer Light",
    author: "Anmol Basnet",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    price: 340,
    originalPrice: 400,
    language: "english",
    isNew: true,
    condition: "new",
    location: "",
    sellerContact: "",
    description: "A beautiful story about summer adventures."
  },
  {
    id: "2",
    title: "Karnali Blues",
    author: "Buddhisagar",
    cover: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb",
    price: 425,
    originalPrice: 500,
    language: "nepali",
    isNew: true,
    condition: "new",
    location: "",
    sellerContact: "",
    description: "Award-winning Nepali novel about rural life."
  },
  {
    id: "3",
    title: "The Mountain Path",
    author: "Samjhana Sharma",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
    price: 280,
    originalPrice: 280,
    language: "english",
    isNew: false,
    condition: "good",
    location: "Kathmandu",
    sellerContact: "sharma@example.com",
    description: "A well-maintained secondhand book about mountain journeys."
  },
  {
    id: "4",
    title: "Palpasa Café",
    author: "Narayan Wagle",
    cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19",
    price: 380,
    originalPrice: 450,
    language: "nepali",
    isNew: true,
    condition: "new",
    location: "",
    sellerContact: "",
    description: "A modern classic of Nepali literature."
  },
  {
    id: "5",
    title: "The History of Nepal",
    author: "John K. Sharma",
    cover: "https://images.unsplash.com/photo-1478720568477-152d9b164e26",
    price: 560,
    originalPrice: 560,
    language: "english",
    isNew: true,
    condition: "new",
    location: "",
    sellerContact: "",
    description: "Comprehensive history of Nepal from ancient times to present."
  },
  {
    id: "6",
    title: "Seto Dharti",
    author: "Amar Neupane",
    cover: "https://images.unsplash.com/photo-1476275466078-4007374efbbe",
    price: 340,
    originalPrice: 400,
    language: "nepali",
    isNew: true,
    condition: "new",
    location: "",
    sellerContact: "",
    description: "Award-winning Nepali novel about social issues."
  },
  // Adding some secondhand books for testing
  {
    id: "7",
    title: "Old Classic Novel",
    author: "Mohan Koirala",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    price: 200,
    originalPrice: 350,
    language: "nepali",
    isNew: false,
    condition: "fair",
    location: "Pokhara",
    sellerContact: "mohan@example.com",
    description: "A classic Nepali novel with some visible wear but all pages intact."
  },
  {
    id: "8",
    title: "Vintage Poetry Collection",
    author: "Laxmi Prasad Devkota",
    cover: "https://images.unsplash.com/photo-1520013817300-1f4c1cb245ef",
    price: 175,
    originalPrice: 250,
    language: "nepali",
    isNew: false,
    condition: "good",
    location: "Patan",
    sellerContact: "literary@example.com",
    description: "Rare collection of poems by Nepal's greatest poet. Some minor wear on cover."
  },
  // Adding more books with different categories
  {
    id: "9",
    title: "Himalayan Dreams",
    author: "Maya Thapa",
    cover: "https://images.unsplash.com/photo-1495640452828-3df6795cf69b",
    price: 290,
    originalPrice: 350,
    language: "english",
    isNew: true,
    condition: "new",
    location: "",
    sellerContact: "",
    description: "A biography of the first Nepali woman to climb Mount Everest."
  },
  {
    id: "10",
    title: "The Lost Kingdom",
    author: "Rajan Kattel",
    cover: "https://images.unsplash.com/photo-1535398089889-dd807df1dfaa",
    price: 320,
    originalPrice: 380,
    language: "english",
    isNew: true,
    condition: "new",
    location: "",
    sellerContact: "",
    description: "Historical fiction about ancient Nepal."
  },
  {
    id: "11",
    title: "My Life Journey",
    author: "Prabin Gurung",
    cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
    price: 410,
    originalPrice: 450,
    language: "nepali",
    isNew: true,
    condition: "new",
    location: "",
    sellerContact: "",
    description: "Autobiography of a renowned Nepali entrepreneur."
  },
  {
    id: "12",
    title: "Love in Kathmandu",
    author: "Sunita Rai",
    cover: "https://images.unsplash.com/photo-1474366521946-c3d4b507abf2",
    price: 280,
    originalPrice: 330,
    language: "english",
    isNew: true,
    condition: "new",
    location: "",
    sellerContact: "",
    description: "A love story set against the backdrop of bustling Kathmandu."
  },
  {
    id: "13",
    title: "Meditations on the Himalayas",
    author: "Tenzin Lama",
    cover: "https://images.unsplash.com/photo-1571425046056-2d768bcd9192",
    price: 325,
    originalPrice: 370,
    language: "english",
    isNew: true,
    condition: "new",
    location: "",
    sellerContact: "",
    description: "Spiritual reflections from a Buddhist monk."
  },
  {
    id: "14",
    title: "Collected Essays on Nepali Culture",
    author: "Dipak Sharma",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765",
    price: 390,
    originalPrice: 430,
    language: "english",
    isNew: true,
    condition: "new",
    location: "",
    sellerContact: "",
    description: "A compilation of essays examining various aspects of Nepali culture."
  },
  {
    id: "15",
    title: "The Village Tales",
    author: "Krishna Magar",
    cover: "https://images.unsplash.com/photo-1516041541579-76c595d1d05f",
    price: 255,
    originalPrice: 300,
    language: "nepali",
    isNew: true,
    condition: "new",
    location: "",
    sellerContact: "",
    description: "Short stories from rural Nepal that capture the essence of village life."
  }
];

export const addBook = (book: Omit<BookData, "id">): BookData => {
  const newBook: BookData = {
    ...book,
    id: (mockBooks.length + 1).toString()
  };
  
  mockBooks.push(newBook);
  return newBook;
};

export const getBooksByType = (type: "all" | "new" | "secondhand"): BookData[] => {
  if (type === "all") return mockBooks;
  return mockBooks.filter(book => type === "new" ? book.isNew : !book.isNew);
};

export const deleteBook = (id: string): void => {
  const index = mockBooks.findIndex(book => book.id === id);
  if (index !== -1) {
    mockBooks.splice(index, 1);
  }
};

export const getMostLovedBooks = (): BookData[] => {
  // Simulate a list of most loved books (in a real app, this would be based on user ratings/likes)
  return [...mockBooks]
    .sort(() => Math.random() - 0.5) // Random sorting for demonstration
    .slice(0, 6); // Return top 6 books
};
