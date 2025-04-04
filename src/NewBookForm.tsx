import { useState } from 'react';
import { Book } from './types/Book'; // Adjust path as needed

interface NewBookFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewBookForm = ({ onSuccess, onCancel }: NewBookFormProps) => {
  const [formData, setFormData] = useState<Book>({
    bookId: 0,
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    classification: '',
    category: '',
    pageCount: 0,
    price: 0,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'number' ? Number(value) : value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:5000/api/Book/Add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add book');
      }

      setMessage('Book added successfully!');
      setFormData({
        bookId: 0,
        title: '',
        author: '',
        publisher: '',
        isbn: '',
        classification: '',
        category: '',
        pageCount: 0,
        price: 0,
      });

      onSuccess();
    } catch (err) {
      console.error(err);
      setMessage('Error adding book. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2>Add New Book</h2>

      {[
        { label: 'Title', name: 'title' },
        { label: 'Author', name: 'author' },
        { label: 'Publisher', name: 'publisher' },
        { label: 'ISBN', name: 'isbn' },
        { label: 'Classification', name: 'classification' },
        { label: 'Category', name: 'category' }
      ].map(field => (
        <div key={field.name} className="mb-3">
          <label className="form-label">{field.label}</label>
          <input
            type="text"
            name={field.name}
            value={(formData as any)[field.name]}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
      ))}

      <div className="mb-3">
        <label className="form-label">Page Count</label>
        <input
          type="number"
          name="pageCount"
          value={formData.pageCount}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Price ($)</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="form-control"
          step="0.01"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary me-2">Submit</button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>

      {message && <p className="mt-3">{message}</p>}
    </form>
  );
};

export default NewBookForm;
