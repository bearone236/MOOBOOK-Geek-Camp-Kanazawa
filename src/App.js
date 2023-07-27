import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Books from './pages/books';
import Book from './pages/book';
import Home from './pages/home';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Books />} />
          <Route path="/book/:id" element={<Book />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
