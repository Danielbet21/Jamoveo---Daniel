import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function LoginPage() {

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { setUser } = useUser();
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  const isAdmin = location.pathname.includes('/admin');
  const loginUrl = isAdmin ? '/admin/login' : '/login';
  
  const handleChange = (e) => {
    // this function will handle the change in the input fields and update the state accordingly
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setLoginError('');
  };
  
  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      const response = await api.post(loginUrl, formData);
      const { redirect, user, token } = response.data;
  
      if (!user) {
        throw new Error("User object missing from response");
      }
  
      setUser(user); // update context
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      navigate(redirect);
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
        <h2>{isAdmin ? "Admin Login" : "Login to JaMoveo"}</h2>
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
        <button type="submit">{isAdmin ? "Enter Control Room" : "Jam In!"}</button>
      </form>

      {!isAdmin && (
        <div className="signup-footer">
          <p>Don't have an account? <a href="/signup">Sign up</a></p>
          <p>login as admin? <a href="/admin/login">Click here</a></p>
        </div>
      )}
      {isAdmin && (
        <div className="signup-footer">
          <p>Don't have an account? <a href="/admin/signup">Sign up</a></p>
          <p>login as user? <a href="/login">Click here</a></p>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
