import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/signup_style.css';

function SignupPage() {
  const [formData, setFormData] = useState({
    // this is the data we will send to the backend
    // usestate hook - to manage the state of the form data
    username: '',
    password: '',
    instrument: '',
    role: 'admin' // default role for admin signup
  });

  const navigate = useNavigate(); // this hook will help us navigate to different pages
  const [usernameError, setUsernameError] = useState(''); // state to manage username error messages

  const handleChange = (e) => {
    // this function will handle the change in the input fields and update the state accordingly
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));

    if (e.target.name === 'username') {
      setUsernameError(''); // Clear error when typing
    }
  };

  const handleSubmit = async (e) => {
    // this function will handle the form submission and send the data to the backend
    // it will also handle the response from the backend and redirect the user to the appropriate page
    e.preventDefault();

    const username = formData.username.trim();
    const hasLetter = /[a-zA-Z]/.test(username);
    const hasSpecialChars = /[^a-zA-Z0-9\s]/.test(username);

    // Validate username
    if (!username) {
      setUsernameError('Username must contain at least one letter.');
      setFormData(prev => ({ ...prev, username: '' })); // Clear username
      return;
    }
    else if (!hasLetter) {
      setUsernameError('Username must contain at least one letter or number.');
      setFormData(prev => ({ ...prev, username: '' })); // Clear username
      return;
    }
    else if (hasSpecialChars) {
      setUsernameError('Username cannot contain special characters.');
      setFormData(prev => ({ ...prev, username: '' })); // Clear username
      return;
    }

    try {
      await api.post('/admin/signup', formData);
      // Redirect to login page after successful signup
      navigate('/admin/login');
    } catch (error) {
     
      if (error.response) {
        console.error("Signup failed:", error.response.data);
        alert(error.response.data.message || "Signup failed.");
      
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("No response from server.");
      
      } else {
        console.error("Unexpected error:", error.message);
        alert("Unexpected error: " + error.message);
      }
    }
  };

  return (
    <div className="signup-container">
      <div className='signup-header'>
        <h2>Sign Up to JaMoveo Maestro</h2>
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
        {usernameError && <div className="error-message">{usernameError}</div>}
        {/* Display username errors messages */}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select
          name="instrument"
          value={formData.instrument}
          onChange={handleChange}
          required
        >
          <option value="">Select Instrument</option>
          <option value="drums">🥁 Drums</option>
          <option value="guitar">🎸 Guitar</option>
          <option value="bass">🎶 Bass</option>
          <option value="saxophone">🎷 Saxophone</option>
          <option value="keyboard">🎹 Keyboard</option>
          <option value="vocals">🎤 Vocals</option>
        </select>

        <input
          type="text"
          name="admin"
          placeholder="Admin"
          value="Admin"
          readOnly
          style={{ color: 'grey' }}
        />   
        <button type="submit">Let's Jam!</button>
         
      </form>
      <div className="signup-footer">
        <p>Already have an account? <a href="/">Log in</a></p>
        <p>Not an admin? <a href="/signup">Sign up here</a></p>
      </div>
    </div>
  );
}

export default SignupPage;