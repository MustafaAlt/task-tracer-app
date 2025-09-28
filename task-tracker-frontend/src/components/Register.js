import React, { useState } from 'react';
import { userService } from '../services/api';
import './Register.css';

const Register = ({ onLoginSuccess, onGoBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER'); // Yeni rol state'i
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // API'ye gönderilecek objeye 'role' alanını ekliyoruz
      const newUser = { username, password, role };
      const response = await userService.register(newUser);
      
      onLoginSuccess(response.data);
    } catch (error) {
      setMessage('Kayıt başarısız. Bu kullanıcı adı zaten alınmış olabilir.');
      console.error('Kayıt hatası:', error);
    }
  };

  return (
    <div className="register-container">
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleRegister}>
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
        
        {/* Yeni rol seçim alanı */}
        <div>
          <label>Rol:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="USER">Kullanıcı</option>
            <option value="ADMIN">Yönetici</option>
          </select>
        </div>

        <button type="submit">Kayıt Ol</button>
      </form>
      {message && <p className="message">{message}</p>}
      <button onClick={onGoBack} className="back-btn">Geri Dön</button>
    </div>
  );
};

export default Register;