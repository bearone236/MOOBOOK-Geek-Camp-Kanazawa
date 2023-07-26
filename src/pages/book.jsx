import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const baseURL = 'https://sheetdb.io/api/v1/ug4cixwkfzp9t';

const Book = () => {
  const [book, setBook] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${baseURL}/search`, {
        params: {
          bookId: id,
        },
      })
      .then((response) => {
        if (response.data.length > 0) {
          setBook(response.data[0]);
        }
      });
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div>
      {book && (
        <>
          <h2>{book.title}</h2>
          <img src={`${process.env.PUBLIC_URL}/images/${book.bookId}.png`} alt={book.title} />
          <p>{book.description}</p>
          <button onClick={handleBackClick}>Go Back</button>
        </>
      )}
    </div>
  );
};

export default Book;
