import React from 'react';
// import CameraComponent from './camera';
import '../App.css';
import Testcamera from './testcamera';

const Header = () => {
  return (
    <div>
      <header className="header">
        <h1>GESTURE BOOK</h1>
        <div className="camera">
          {/* <CameraComponent /> */}
          <Testcamera />
        </div>
      </header>
    </div>
  );
};

export default Header;
