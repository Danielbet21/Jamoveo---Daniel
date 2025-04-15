import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {

  const [formData, setFormData] = useState({
    // this is the data we will send to the backend
    // usestate hook - to manage the state of the form data
    username: '',
    password: ''
  });
  const navigate = useNavigate(); // useNavigate hook - navigate to different routes in the app

  const [loginError, setLoginError] = useState(''); // state to manage login error messages

    
  const handleChange = (e) => {
    // this function will handle the change in the input fields and update the state accordingly
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setLoginError('');
  };

  const handleSubmit = async (e) => {
    // this function will handle the form submission and send the data to the backend
    // it will also handle the response from the backend and redirect the user to the appropriate page
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      const { redirect } = response.data;
      navigate(redirect); // Redirect to the specified URL
      alert("Redirecting to: " + redirect);
    } catch (error) {
      if (error.response) {
        console.error("Login failed:", error.response.data);
        setLoginError(error.response.data.message || "Login failed.");
      } else {
        console.error("Unexpected error:", error.message);
        setLoginError("Unexpected error occurred.");
      }
    }
  };

  return (
    <div className="signup-container">
      <div className='signup-header'>
        <h2>Login to JaMoveo</h2>
      </div>

      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {loginError && <div className="error-message">{loginError}</div>}
        <button type="submit">Jam In!</button>
      </form>
      <div className="signup-footer">
        <p>Don't have an account? <a href="/signup">Sign up</a></p>
      </div>
    </div>
   
  );
}

export default LoginPage;
