import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import { AuthContext } from '../context/authContext';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    signOut(auth);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Code Editor</h1>
      {user ? (
        <div>
          <span style={{ marginRight: '10px' }}>{user.displayName}</span>
          <button className="login-button" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button className="login-button" onClick={() => navigate('/login')}>Login</button>
      )}
    </nav>
  );
}