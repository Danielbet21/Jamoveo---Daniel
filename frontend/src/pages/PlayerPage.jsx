import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../socket/socket';
import '../styles/player_style.css';

const PlayerPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for "song_selected" event from admin
    socket.on('song_selected', (songData) => {
      // Optionally store song data in localStorage or context
      navigate('/live');
    });

    // Clean up socket event listener
    return () => {
      socket.off('song_selected');
    };
  }, [navigate]);

  return (
    <div className="message-container">
      <p className="text-message">Waiting for next song...</p>
    </div>
  );
};

export default PlayerPage;
