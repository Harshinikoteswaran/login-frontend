import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [loggedInUser, setLoggedInUser] = useState('');

  const handleLogin = (email) => {
    setLoggedInUser(email);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setLoggedInUser('');
    setCurrentView('login');
  };

  const switchToSignup = () => {
    setCurrentView('signup');
  };

  const switchToLogin = () => {
    setCurrentView('login');
  };

  return (
    <Router>
      <div className="App">
        {currentView === 'login' && (
          <LoginForm onLogin={handleLogin} switchToSignup={switchToSignup} />
        )}
        {currentView === 'signup' && (
          <SignupForm switchToLogin={switchToLogin} />
        )}
        {currentView === 'dashboard' && (
          <Dashboard userEmail={loggedInUser} onLogout={handleLogout} />
        )}
      </div>
    </Router>
  );
}

export default App;