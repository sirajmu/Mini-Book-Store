import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      const response = await fetch("http://localhost:3000/Create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Book added successfully!");
        navigate("/"); // Redirect to home page after adding book
      } else {
        setError(data.message || "Failed to add book");
      }
    } catch (error) {
      console.error("Error adding book:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add a New Book</h2>
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
        <button type="submit" className="btn btn-primary">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;