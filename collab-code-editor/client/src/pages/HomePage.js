// src/pages/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to Collaborative Code Editor</h1>
      <button onClick={() => navigate('/editor')}>
        Go to Editor's Page
      </button>
    </div>
  );
};

export default HomePage;