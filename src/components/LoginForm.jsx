import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLogin, switchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
    setMessage('');
  };

  const checkEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleLogin = async () => {
    clearErrors();
    
    if (!email) {
      setEmailError('Please enter your email');
      return;
    }
    if (!checkEmail(email)) {
      setEmailError('Please enter a valid email');
      return;
    }
    if (!password) {
      setPasswordError('Please enter your password');
      return;
    }

    try {
      const response = await axios.post('https://login-backend-1-6sci.onrender.com/api/login', {
        email: email,
        password: password
      });
      
      setMessage('Login successful!');
      onLogin(email);
      
    } catch (error) {
      if (error.response?.status === 404) {
        setMessage('User not found. Please sign up first.');
      } else if (error.response?.status === 401) {
        setPasswordError('Wrong password. Please try again.');
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="container">
      <div className="box">
        <h2 className="title">Login</h2>

        {message && (
          <div className={message.includes('successful') ? 'success' : 'error-message'}>
            {message}
          </div>
        )}

        <div className="input-group">
          <label className="label">Email:</label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          {emailError && <div className="error">{emailError}</div>}
        </div>

        <div className="input-group">
          <label className="label">Password:</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          {passwordError && <div className="error">{passwordError}</div>}
        </div>

        <button className="button" onClick={handleLogin}>
          Login
        </button>

        <div className="switch-text">
          Don't have an account?{' '}
          <span className="switch-link" onClick={switchToSignup}>
            Sign up here
          </span>
        </div>

        <div style={{marginTop: '20px', padding: '10px', background: '#f0f0f0', borderRadius: '5px', fontSize: '14px'}}>
          <strong>Try these demo credentials:</strong><br/>
          Email: demo@example.com<br/>
          Password: password123
        </div>
      </div>
    </div>
  );
};

export default LoginForm;