import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../socket/socket';
import '../styles/player_style.css';

const PlayerPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('song_selected', (songData) => {
      console.log('🎵 Received song:', songData);
      navigate('/live', { state: { song: songData } }); // Pass the song
    });

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