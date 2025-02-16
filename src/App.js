
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/NavigationBar/NavBar";
import BookList from "./Components/BookList/BookList";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BookList />} /> 
        <Route path="/books" element={<BookList />} /> 
      </Routes>
    </Router>
   
  );
}

export default App;

