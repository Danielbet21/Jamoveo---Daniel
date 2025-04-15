import React, { useState } from 'react';
import axios from 'axios';

function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    instrument: ''
  });

    const handleChange = (e) => {
    // this function handles the change of the input fields and updates the state accordingly
    // e.t arget.name is the name of the input field (username, password, instrument)
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/signup', formData);
      alert("Signup successful! You can now log in.");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again.");
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
          <option value="bass">🎸 Bass</option> 
          <option value="saxophone">🎷 Saxophone</option>
          <option value="keyboard">🎹 Keyboard</option>
          <option value="vocals">🎤 Vocals</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default SignupPage;
