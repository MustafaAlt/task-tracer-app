import React, { useState } from 'react';
import { userService } from '../services/api';
import './Login.css';

const Login = ({ onLoginSuccess, onGoBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await userService.login(username, password);
      // Başarılı girişten sonra App.js'teki fonksiyonu çağır
      onLoginSuccess(response.data); 
    } catch (error) {
      setMessage('Giriş başarısız. Kullanıcı adı veya şifre hatalı.');
      console.error('Giriş hatası:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Giriş Yap</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Kullanıcı Adı:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Şifre:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Giriş Yap</button>
      </form>
      {message && <p className="message">{message}</p>}
      <button onClick={onGoBack} className="back-btn">Geri Dön</button>
    </div>
  );
};

export default Login;