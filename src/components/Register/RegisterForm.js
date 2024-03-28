import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css'; // Özel CSS stilinizi burada belirtin
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

function RegisterForm() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kullanıcı kayıt işlemini gerçekleştir
    const user = {
      name: name,
      username: username,
      password: password,
    };

    try {
      const response = await fetch('https://mbat4seniors-8ed6b159bacd.herokuapp.com/auth/addNewUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Kayıt Başarılı:", data);
        // Kayıt başarılıysa, kullanıcıyı giriş sayfasına yönlendir
        navigate('/login');
      } else {
        // Sunucu tarafından bir hata mesajı gönderilirse bu mesajı göster
        console.error("Kayıt başarısız.");
      }
    } catch (error) {
      console.error("Kayıt sırasında hata oluştu:", error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-section">
        <form onSubmit={handleSubmit} className="register-form">
          <h1>REGISTER</h1>
          <div className="input-icon">
            <FontAwesomeIcon icon={faUser} />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-icon">
            <FontAwesomeIcon icon={faUser} />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-icon">
            <FontAwesomeIcon icon={faLock} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
          <a href="/login">Already have an account? Log in</a>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
