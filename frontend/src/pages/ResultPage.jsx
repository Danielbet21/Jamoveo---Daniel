import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CardSong from '../components/CardSong';
import api from '../services/api';
import '../styles/result_style.css';

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('query');

  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await api.get('/result', {
          params: { search_term: searchTerm },
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
    navigate('/live', { state: { song } });
  };

  const handleBack = () => {
    navigate('/admin');
  };

  return (
    <div className="result-container">
      <div className="message-container">
        <h2 className="title-msg">Your choice maestro</h2>
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
    </div>
  );
};

export default ResultPage;
