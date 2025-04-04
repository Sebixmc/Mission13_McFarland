import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { fetchBooks, deleteBook } from "../api/booksAPI";
import { Paginator } from "../components/Pagination";
import NewBookForm from "../NewBookForm";
import EditBookForm from "../EditBookForm";



const AdminBooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);


  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks({
          pageSize,
          pageNum,
          selectedCategories: [],
        });
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum]);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div className="container">
      <h1 className="my-4">Admin - Books</h1>
  
    {!showForm && (
        <button className="btn btn-success mb-3" onClick={(() => setShowForm(true))}>Add Project</button>
    )} 

      {showForm && (
        <NewBookForm
          onSuccess={() => {
            setShowForm(false);
            fetchBooks({pageSize, pageNum, selectedCategories: []}).then((data) => setBooks(data.books));
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

        {editingBook && (
        <EditBookForm
            book={editingBook}
            onSuccess={() => {
            setEditingBook(null);
            fetchBooks({ pageSize, pageNum, selectedCategories: [] }).then((data) =>
                setBooks(data.books)
            );
            }}
            onCancel={() => setEditingBook(null)}
        />
        )}

  
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
            <th>Classification</th>
            <th>Category</th>
            <th>Page Count</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.bookId}>
              <td>{b.bookId}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.publisher}</td>
              <td>{b.isbn}</td>
              <td>{b.classification}</td>
              <td>{b.category}</td>
              <td>{b.pageCount}</td>
              <td>${b.price.toFixed(2)}</td>
              <td>
              <button
                className="btn btn-sm btn-primary me-2"
                onClick={() => setEditingBook(b)}
                >
                Edit
                </button>

                <button
                className="btn btn-sm btn-danger"
                onClick={() => {
                    deleteBook(b.bookId)
                    .then(() => {
                        // Refresh the book list after delete
                        fetchBooks({ pageSize, pageNum, selectedCategories: [] }).then((data) =>
                        setBooks(data.books)
                        );
                    })
                    .catch((err) => console.error(err));
                }}
                >
                Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      <Paginator
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </div>
  );
}

export default AdminBooksPage;
