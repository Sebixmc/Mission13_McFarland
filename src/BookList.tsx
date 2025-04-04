import { SetStateAction, useEffect, useState } from "react";
import { Book } from "./types/Book";
import { useNavigate } from "react-router-dom";
import { useCart } from "./contexts/CartContext"; // adjust path as needed
import { fetchBooks } from "./api/booksAPI";
import { Paginator } from "./components/Pagination"




function BookList({selectedCategories}: {selectedCategories: string[]}) {

    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { cart } = useCart();
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
   

    
    useEffect(() => {
        const loadBooks = async () => {
            try {
            setLoading(true)
            const data = await fetchBooks({ pageSize, pageNum, selectedCategories: [] });
            setBooks(data.books);
            setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
            } catch (error) {
            console.error("Failed to load books", error);
            } finally {
                setLoading(false);
            }
        };
        
        loadBooks();
        }, [pageSize, pageNum, selectedCategories]);

    if (loading) return <p> Loading books...</p>;
    if (error) return <p className='text-red-500'> Error: {error}</p>;

    return (
        <>
        <div id="bookCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
  <div className="carousel-inner rounded shadow">
    <div className="carousel-item active">
      <img src="/images/book1.jpeg" className="d-block w-100" alt="Book 1" />
    </div>
    <div className="carousel-item">
      <img src="/images/book2.jpeg" className="d-block w-100" alt="Book 2" />
    </div>
    <div className="carousel-item">
      <img src="/images/book3.jpeg" className="d-block w-100" alt="Book 3" />
    </div>
  </div>

  <button className="carousel-control-prev" type="button" data-bs-target="#bookCarousel" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#bookCarousel" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

        <p>🛒 Cart: {cartCount} items</p>
        <div className="row">
            {books.map((b) => (
                <div key={b.bookId} className="col-md-4 mb-4">
                <div id="bookCard" className="card h-100">
                    <div className="card-body">
                    <h5 className="card-title">{b.title}</h5>
                    <ul className="list-unstyled">
                        <li>Author: {b.author}</li>
                        <li>Publisher: {b.publisher}</li>
                        <li>ISBN: {b.isbn}</li>
                        <li>Classification: {b.classification}</li>
                        <li>Category: {b.category}</li>
                        <li>Page Count: {b.pageCount}</li>
                        <li>Price: ${b.price.toFixed(2)}</li>
                    </ul>
                    <button
                        className="btn btn-success mt-2"
                        onClick={() => {
                        addToCart(b);
                        navigate('/cart');
                        }}
                    >
                        Add to Cart
                    </button>
                    </div>
                </div>
               
                </div>
            ))}
            </div>
        <Paginator
                currentPage={pageNum}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPageNum}
                onPageSizeChange={(newSize)=> {
                    setPageSize(newSize);
                    setPageNum(1);
                }}/>


        </>
    );

}

export default BookList;