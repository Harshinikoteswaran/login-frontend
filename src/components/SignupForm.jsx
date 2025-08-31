import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = ({ switchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
    setConfirmError('');
    setMessage('');
  };

  const checkEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSignup = async () => {
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
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
    if (!confirmPassword) {
      setConfirmError('Please confirm your password');
      return;
    }
    if (password !== confirmPassword) {
      setConfirmError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/signup', {
        email: email,
        password: password
      });
      
      setMessage('Account created! You can now login.');
      setTimeout(() => switchToLogin(), 2000);
      
    } catch (error) {
      if (error.response?.status === 409) {
        setMessage('User already exists. Please login instead.');
        setTimeout(() => switchToLogin(), 2000);
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="container">
      <div className="box">
        <h2 className="title">Sign Up</h2>

        {message && (
          <div className={message.includes('created') ? 'success' : 'error-message'}>
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

        <div className="input-group">
          <label className="label">Confirm Password:</label>
          <input
            type="password"
            className="input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
          />
          {confirmError && <div className="error">{confirmError}</div>}
        </div>

        <button className="button" onClick={handleSignup}>
          Create Account
        </button>

        <div className="switch-text">
          Already have an account?{' '}
          <span className="switch-link" onClick={switchToLogin}>
            Login here
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;