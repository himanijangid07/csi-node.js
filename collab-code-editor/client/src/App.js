// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditorPage from './pages/EditorPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/authContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path='/login' element={<LoginPage/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;