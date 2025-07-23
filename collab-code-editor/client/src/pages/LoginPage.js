// src/pages/LoginPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase/firebase.config';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Send user data to backend
      await axios.post('http://localhost:8000/api/google-auth/save-user', {
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL
});


      navigate('/editor');
    } catch (error) {
      alert("Login failed!");
      console.error(error);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Login to Continue</h2>
      <button onClick={handleLogin} style={{ padding: '10px 20px', marginTop: '1rem' }}>
        Login with Google
      </button>
    </div>
  );
};

export default LoginPage;