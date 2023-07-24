import React, { useState } from 'react';
import './Login.css'; // Import your CSS file for styling
import App from './MainApp'; // Import the App component

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // You can implement the login logic here (e.g., send data to the server for authentication)
    // For simplicity, we'll assume login is successful if both username and password are non-empty
    if (username && password) {
      setIsLoggedIn(true);
    }
  };

  if (isLoggedIn) {
    // Show the main application content if logged in
    return <App />;
  }

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <div className="input-container">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
