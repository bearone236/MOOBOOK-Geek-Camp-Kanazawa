import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Home = () => {
  return (
    <div className="home">
      {/* <div className="homeMenu" id="operation_button">
        <p>操作説明</p>
      </div> */}
      <div className="homeMenu" id="start_button">
        <Link to={{ pathname: '/books' }} style={{ textDecoration: 'none' }}>
          <p>START</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
