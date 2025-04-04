
import './App.css'
import AdminBooksPage from './pages/AdminBooksPage';
import BooksPage from './pages/BooksPage';
import CartPage from "./pages/CartPage";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {
  

  return (
    
    <>
    <Router>
      <Routes>
        <Route path='/' element={<BooksPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path="/adminbooks" element={<AdminBooksPage/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App
