import { Book } from "../types/Book";

export interface FetchBooksResponse {
  books: Book[];
  totalNumBooks: number;
}

const API_URL = 'https://mission13-mcfarland-backend-aegye3drccezeyet.eastus-01.azurewebsites.net/api'

export const fetchBooks = async ({
  pageSize,
  pageNum,
  selectedCategories,
}: {
  pageSize: number;
  pageNum: number;
  selectedCategories: string[];
}): Promise<FetchBooksResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `category=${encodeURIComponent(cat)}`)
      .join("&");

    const response = await fetch(
      `${API_URL}/api/Book?pageHowMany=${pageSize}&pageNum=${pageNum}${
        selectedCategories.length ? `&${categoryParams}` : ""
      }`
    );

if (!response.ok) {
    throw new Error('Failed to fetch bookss')
}

    return await response.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};


export const addBook = async(newBook: Book): Promise<Book> => {
    try{
        const response = await fetch(`${API_URL}/Book/AddBook`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBook)
            });

            if (!response.ok) {
                throw new Error('Failed to add book')
            }

            return await response.json();
        } catch (error) {
            console.error('Error adding book');
            throw error;
        }
};

export const updateBook = async (
    bookId: number,
    updatedBook: Book
  ): Promise<Book> => {
    try {
      const response = await fetch(`${API_URL}/api/Book/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBook),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update book (status: ${response.status})`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error updating book:', error);
      throw error; // re-throw so the caller knows it failed
    }
  };

  export const deleteBook = async (bookId: number): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/api/Book/DeleteBook/${bookId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete book (status: ${response.status})`);
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  };
  