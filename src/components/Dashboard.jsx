import React from 'react';

const Dashboard = ({ userEmail, onLogout }) => {
  return (
    <div className="container">
      <div className="box welcome-box">
        <h2 className="title">Welcome! 🎉</h2>
        <p>You are successfully logged in</p>
        <div className="user-email">{userEmail}</div>
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;