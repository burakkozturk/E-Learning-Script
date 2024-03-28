import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './LoginForm.css';
import '../Register/RegisterForm'
// Font Awesome ikonlarını import edin
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      login(username, password);
      navigate('/');
    } catch (error) {
      console.error("Login hatası:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-section">
        <form onSubmit={handleSubmit} className="login-form">

          <h1>LOG IN</h1>
          <div className="input-icon username">
            <FontAwesomeIcon icon={faUser} /> {/* Kullanıcı adı ikonu */}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-icon password">
            <FontAwesomeIcon icon={faLock} /> {/* Şifre ikonu */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Log In</button>
          <Link to="/register"><a>Don't have an account? Register</a></Link>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
