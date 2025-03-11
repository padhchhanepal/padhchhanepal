
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
    isNew: true
  },
  {
    id: "2",
    title: "Karnali Blues",
    author: "Buddhisagar",
    cover: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb",
    price: 425,
    originalPrice: 500,
    language: "nepali",
    isNew: true
  },
  {
    id: "3",
    title: "The Mountain Path",
    author: "Samjhana Sharma",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
    price: 280,
    originalPrice: 280,
    language: "english",
    isNew: false
  },
  {
    id: "4",
    title: "Palpasa Café",
    author: "Narayan Wagle",
    cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19",
    price: 380,
    originalPrice: 450,
    language: "nepali",
    isNew: true
  },
  {
    id: "5",
    title: "The History of Nepal",
    author: "John K. Sharma",
    cover: "https://images.unsplash.com/photo-1478720568477-152d9b164e26",
    price: 560,
    originalPrice: 560,
    language: "english",
    isNew: true
  },
  {
    id: "6",
    title: "Seto Dharti",
    author: "Amar Neupane",
    cover: "https://images.unsplash.com/photo-1476275466078-4007374efbbe",
    price: 340,
    originalPrice: 400,
    language: "nepali",
    isNew: true
  }
];

// Function to add a new book to the collection
export const addBook = (book: Omit<BookData, "id">): BookData => {
  const newBook: BookData = {
    ...book,
    id: (mockBooks.length + 1).toString()
  };
  
  mockBooks.push(newBook);
  return newBook;
};

// Function to get books by type
export const getBooksByType = (type: "all" | "new" | "secondhand"): BookData[] => {
  if (type === "all") return mockBooks;
  return mockBooks.filter(book => type === "new" ? book.isNew : !book.isNew);
};
