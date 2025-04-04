import { useEffect, useState } from "react";
import "./CategoryFilter.css"

function CategoryFilter ({selectedCategories,onCheckboxChange,}:{selectedCategories: string[]; onCheckboxChange:(categories: string[]) => void;})
{
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
            const response = await fetch("https://localhost:5000/api/book/GetBookCategories");
            const data = await response.json();
            console.log("Fetched Categories: ", data)
            setCategories(data);
            }
            catch (error){
                console.error('Error fetching categories', error)
            }
        }
        fetchCategories();
    }, [])

    function handleCheckboxChange ({target}: {target: HTMLInputElement}){
        const updatedCategories = selectedCategories.includes(target.value) ? selectedCategories.filter(x => x !== target.value) : [...selectedCategories, target.value];
        onCheckboxChange(updatedCategories);
    }


    return (
        <div className="category-filter">
            <h5>Category</h5>
            <div className="category-filter">
                {categories.map((c) => (
                    <div key={c} className="category-item">
                        <input 
                        type="checkbox" 
                        id={c} value={c}
                        onChange={handleCheckboxChange}
                        />
                        <label htmlFor={c}>{c}</label>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default CategoryFilter