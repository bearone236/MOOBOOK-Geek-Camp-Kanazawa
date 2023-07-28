import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Books from './pages/books';
import Book from './pages/book';
import Home from './pages/home';
import Header from './pages/header';

function App() {
  return (
    <div>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/book/:bookId" element={<Book />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
