import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/admin_style.css';
import LogoutButton from '../components/LogoutButton';

const AdminPage = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => { //check if user is logged in -> if not, redirect to login page
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
    }
  }, []);

    const handleSearch = () => {
        //handle search use query to navigate to results page
        if (query.trim()) {
        navigate(`/result?query=${encodeURIComponent(query)}`);
        }
  };

  /*onChange is used to update the state of the input field */
  /*onKeyDown is used to handle the enter key press */
  return (
    <div className="title-container">
      <h1 className="title">Search any song...</h1>
      <input
        className="input-field"
        type="text"
        placeholder="Enter song or artist..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => event.key === 'Enter' && handleSearch()}
      />
      <button
        className="button"
        onClick={handleSearch}
      >
        Let's Moveo!
      </button>
      <LogoutButton />  
    </div>
  );
};
export default AdminPage;