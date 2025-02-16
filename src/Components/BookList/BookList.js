import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Card/Card";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/ReadAllBooks").then((response) => {
      setBooks(response.data);
    });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Book List</h2>
      <div className="row justify-content-center">
        {books.map((book) => (
          <div key={book.book_id} className="col-md-4 d-flex justify-content-center">
            <Card title={book.title} author={book.author} image={book.image_url} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;


