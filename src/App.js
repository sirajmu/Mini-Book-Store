
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/NavigationBar/NavBar";
import BookList from "./Components/BookList/BookList";
import AddBook from "./Components/BookForm/AddBook";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BookList />} /> 
        <Route path="/books" element={<BookList />} /> 
        <Route path="/admin/add-book" element={<AddBook />} />
      </Routes>
    </Router>
   
  );
}

export default App;

