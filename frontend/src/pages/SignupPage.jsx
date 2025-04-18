import React, { useState } from 'react';
import api from '../services/api';
import '../styles/signup_style.css';

function SignupPage() {
  const [formData, setFormData] = useState({
    // this is the data we will send to the backend
    // usestate hook - to manage the state of the form data
    username: '',
    password: '',
    instrument: ''
  });

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
      await api.post('/signup', formData);
      alert("Signup successful! You can now log in.");
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
        <h2>Sign Up to JaMoveo</h2>
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
        {/* Display username error message */}
        {usernameError && <div className="error-message">{usernameError}</div>}

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
        <button type="submit">Let's Jam!</button>
      </form>
      <div className="signup-footer">
        <p>Already have an account? <a href="/">Log in</a></p>
        <p>Are you an admin? <a href="/admin/signup">Sign up here</a></p>
      </div>
    </div>
  );
}

export default SignupPage;