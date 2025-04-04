import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryFilter from "../CategoryFilter";
import BookList from "../BookList";

function BooksPage () {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const navigate = useNavigate();

    return(
        <div className = "container">
        <div className = "row">
          <h5>The Online Book Store</h5>
        </div>
        <div className = "row">
          <div className="col-md-3">
            <CategoryFilter selectedCategories={selectedCategories} onCheckboxChange={setSelectedCategories} />
          </div>
          <div className="col-md-9">
            <BookList selectedCategories={selectedCategories}/>
          </div>
        </div>
      </div>

    );
}

export default BooksPage;