import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Book = () => {
  const [book, setBook] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    if (state && state.book) {
      setBook(state.book);
      console.log('Received book data: ', state.book);
    } else {
      console.log('No book data received.');
    }
  }, [state]);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div>
      {book && (
        <div>
          <button onClick={handleBackClick}>Go Back</button>
          <h2>{book.title}</h2>
          <iframe
            title="Book PDF"
            src={`${process.env.PUBLIC_URL}/pdfs/${book.id}.pdf`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', width: '100%', height: '100vh', border: 'none' }}
          />
        </div>
      )}
    </div>
  );
};

export default Book;
