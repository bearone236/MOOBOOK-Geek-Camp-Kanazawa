import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../index.css';

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, background: 'black', right: '0px' }} onClick={onClick} />;
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, background: 'black', left: '0px' }} onClick={onClick} />;
};

const Book = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '100px',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const items = [
    { title: 'book1', img: `${process.env.PUBLIC_URL}/pdfImages/1001-1.png` },
    { title: 'book2', img: `${process.env.PUBLIC_URL}/pdfImages/1001-6.png` },
    { title: 'book3', img: `${process.env.PUBLIC_URL}/pdfImages/1001-5.png` },
    { title: 'book4', img: `${process.env.PUBLIC_URL}/pdfImages/1001-4.png` },
    { title: 'book5', img: `${process.env.PUBLIC_URL}/pdfImages/1001-3.png` },
    { title: 'book6', img: `${process.env.PUBLIC_URL}/pdfImages/1001-2.png` },
  ];

  return (
    <div className="Book">
      <div>
        <Slider {...settings}>
          {items &&
            items.map((item) => {
              return (
                <div className="pdf-images">
                  <img src={item.img} width="75%" className="pdf-image" alt="items-images" />
                </div>
              );
            })}
        </Slider>
      </div>
    </div>
  );
};

export default Book;
