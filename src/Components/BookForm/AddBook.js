import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AddBook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingBook = location.state?.book || null; // Get book from state if editing

  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  // Prefill form if editing a book
  useEffect(() => {
    if (editingBook) {
      setBookTitle(editingBook.title);
      setBookAuthor(editingBook.author);
      setImageUrl(editingBook.image_url || "");
    }
  }, [editingBook]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!bookTitle.trim() || !bookAuthor.trim()) {
      setError("Please provide both title and author.");
      return;
    }

    const bookData = {
      bookTitle: bookTitle.trim(),
      bookAuthor: bookAuthor.trim(),
      imageUrl: imageUrl.trim() || "https://via.placeholder.com/150",
    };

    try {
      let response, data;

      if (editingBook) {
        // Send PUT request to update book
        response = await fetch(`http://localhost:3000/EditBook?bookID=${editingBook.book_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookData),
        });
      } else {
        // Send POST request to create new book
        response = await fetch("http://localhost:3000/Create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookData),
        });
      }

      data = await response.json();

      if (response.ok) {
        alert(editingBook ? "Book updated successfully!" : "Book added successfully!");
        navigate("/"); // Redirect after adding/updating
      } else {
        setError(data.message || "Failed to save book");
      }
    } catch (error) {
      console.error("Error saving book:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>{editingBook ? "Edit Book" : "Add a New Book"}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Book Title</label>
          <input
            type="text"
            className="form-control"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            value={bookAuthor}
            onChange={(e) => setBookAuthor(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL (Optional)</label>
          <input
            type="text"
            className="form-control"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingBook ? "Update Book" : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
