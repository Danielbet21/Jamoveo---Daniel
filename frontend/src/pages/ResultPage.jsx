import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CardSong from '../components/CardSong';
import api from '../services/api';
import '../styles/result_style.css';
import { useUser } from '../context/UserContext';
import socket from '../socket/socket';
import LogoutButton from '../components/LogoutButton';


const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('query');

  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => { // Check if user is logged in -> else redirect to login page
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get('/result', {
          params: { search_term: searchTerm },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResults(response.data.results);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.response?.data?.message || 'Failed to fetch results');
      }
    };

    if (searchTerm) {
      fetchResults();
    }
  }, [searchTerm]);

  const handleSongSelect = (song) => {
    socket.emit('select_song', song); // sends song to backend
    navigate('/live', { state: { song } });
  };
  const handleBack = () => {
    navigate('/admin'); // Navigate back to the admin page
  };

  return (
    <div className="result-container">
      <div className="message-container">
        <h2 className="title-msg">Search any song...</h2>
        <button onClick={handleBack}>Search again</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="grid-container">
        {results.map((song, idx) => (
          <div
            key={idx}
            onClick={() => handleSongSelect(song)}
            className="grid-item"
          >
            <CardSong
              title={song.title}
              artist={song.artist}
              lyrics_and_chords={song.lyrics_and_chords}
            />
            
          </div>
        ))}
      </div>
        <LogoutButton />
    </div>
  );
};

export default ResultPage;
