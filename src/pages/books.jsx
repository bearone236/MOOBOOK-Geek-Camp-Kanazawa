import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../App.css';
import { Link } from 'react-router-dom';

const baseURL = 'https://sheetdb.io/api/v1/ug4cixwkfzp9t';

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: 'block', background: 'black', right: '0px' }} onClick={onClick} />;
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: 'block', background: 'black', left: '0px' }} onClick={onClick} />;
};

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setBooks(response.data);
    });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '100px',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="books">
      <Slider {...settings}>
        {books.map((book) => (
          <div key={book.id} className="slider-item">
            <h2>{book.title}</h2>
            <Link
              to={{
                pathname: `/book/${book.bookId}`,
                state: { bookData: book },
              }}
            >
              <img src={`${process.env.PUBLIC_URL}/images/${book.bookId}.png`} alt={book.title} width="35%" />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Books;
