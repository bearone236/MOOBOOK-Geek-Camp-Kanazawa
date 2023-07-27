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
        <div>
          <button onClick={handleBackClick}>Go Back</button>
          <h2>{book.title}</h2>
          <iframe
            title="Book PDF"
            src={`${process.env.PUBLIC_URL}/pdfs/${book.bookId}.pdf`}
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
