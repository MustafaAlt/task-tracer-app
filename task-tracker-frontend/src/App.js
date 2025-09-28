import React, { useState } from 'react';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import TaskList from './components/TaskList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('main'); // 'main', 'login', 'register'

  const handleLoginSuccess = (loggedInUser) => {
    setIsLoggedIn(true);
    setUser(loggedInUser);
  };

  const renderContent = () => {
    if (isLoggedIn) {
      // Kullanıcı giriş yapmışsa görev listesini göster
      return <TaskList user={user} />;
    }

    if (currentView === 'login') {
      // 'Giriş Yap' tuşuna basıldıysa giriş formunu göster
      return <Login onLoginSuccess={handleLoginSuccess} onGoBack={() => setCurrentView('main')} />;
    }

    if (currentView === 'register') {
      // 'Kayıt Ol' tuşuna basıldıysa kayıt formunu göster
      return <Register onLoginSuccess={handleLoginSuccess} onGoBack={() => setCurrentView('main')} />;
    }

    // Varsayılan olarak ana ekranı ve tuşları göster
    return (
      <div className="auth-buttons-container">
        <button onClick={() => setCurrentView('login')} className="auth-btn">
          Giriş Yap
        </button>
        <button onClick={() => setCurrentView('register')} className="auth-btn">
          Kayıt Ol
        </button>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Görev Takip Uygulaması</h1>
      </header>
      <main>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;