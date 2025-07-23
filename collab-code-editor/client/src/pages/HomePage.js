// src/pages/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './HomePage.css'; // Import the CSS file

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-content">
        <h1>Welcome to Collaborative Code Editor</h1>
        <button className="home-button" onClick={() => navigate('/editor')}>
          Go to Editor's Page
        </button>
      </div>
    </div>
  );
};

export default HomePage;