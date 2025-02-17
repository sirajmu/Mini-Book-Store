import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/ReadAllBooks").then((response) => {
      setBooks(response.data);
    });
  }, []);

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:3000/DeleteBook?bookID=${bookId}`);
      setBooks(books.filter((book) => book.book_id !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleEdit = (book) => {
    navigate("/admin/add-book", { state: { book } });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Book List</h2>
      <div className="row justify-content-center">
        {books.map((book) => (
          <div key={book.book_id} className="col-md-4 d-flex justify-content-center">
            <div className="card shadow-lg rounded-lg overflow-hidden" style={{ width: "18rem", margin: "1rem auto" }}>
              <Card 
                title={book.title} 
                author={book.author} 
                image={book.image_url} 
              />
              <div className="card-body d-flex justify-content-between">
                <button className="btn btn-warning w-45" onClick={() => handleEdit(book)}>Edit</button>
                <button className="btn btn-danger w-45" onClick={() => handleDelete(book.book_id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;



