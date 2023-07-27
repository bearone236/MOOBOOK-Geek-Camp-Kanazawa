import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Books from "./pages/books";
import Book from "./pages/book";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/book/:id" element={<Book />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
