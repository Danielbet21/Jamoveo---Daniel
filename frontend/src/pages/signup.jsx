import React, { useState } from 'react';
import axios from 'axios';

function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    instrument: ''
  });

  const [usernameError, setUsernameError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));

    if (e.target.name === 'username') {
      setUsernameError(''); // Clear error when typing
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = formData.username.trim();
    const hasLetter = /[a-zA-Z]/.test(username);
    const hasSpecialChars = /[^a-zA-Z0-9\s]/.test(username);

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
      await axios.post('http://localhost:5000/api/signup', formData);
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
          <option value="drums"> Drums</option>
          <option value="guitar"> Guitar</option>
          <option value="bass"> Bass</option>
          <option value="saxophone"> Saxophone</option>
          <option value="keyboard"> Keyboard</option>
          <option value="vocals"> Vocals</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default SignupPage;