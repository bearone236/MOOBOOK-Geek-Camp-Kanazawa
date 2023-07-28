import React from 'react';
import CameraComponent from './camera';
import '../App.css';

const Header = () => {
  return (
    <div>
      <header className="header">
        <h1>GESTURE BOOK</h1>
        <div className="camera">
          <CameraComponent />
        </div>
      </header>
    </div>
  );
};

export default Header;
