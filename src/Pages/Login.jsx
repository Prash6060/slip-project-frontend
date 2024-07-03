import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext'; // Import AuthContext
import '../style/Login.css'; // Import custom CSS file for Login page styling
import LoginImg from '../images/login-img.jpg'; // Import image using ES6 import syntax

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Use useAuth hook to access login function
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Add classes to trigger animations after component mounts
    const heading = document.querySelector('.login-form h1');
    const inputs = document.querySelectorAll('.login-form .form-control');
    const button = document.querySelector('.login-form button');
    const image = document.querySelector('.login-image');

    heading.classList.add('fade-in');
    inputs.forEach(input => input.classList.add('slide-in'));
    button.classList.add('slide-in');
    image.classList.add('zoom-in');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://slip-project-backend.onrender.com/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token); // Assuming the server sends back a token
        navigate('/');
      } else {
        const errorData = await response.json();
        setError(errorData.msg || 'Login failed'); // Handle specific error messages from server
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Error logging in. Please try again.'); // Generic error message for unexpected errors
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-form">
          <h1 className="text-center fs-4">SIGN IN TO YOUR ACCOUNT</h1>
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-dark btn-block">
              Login
            </button>
          </form>
        </div>
      </div>
      <div className="login-image-container">
        <img src={LoginImg} alt="Login" className="login-image" />
      </div>
    </div>
  );
};

export default Login;
