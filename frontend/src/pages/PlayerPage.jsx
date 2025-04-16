import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../socket/socket';
import '../styles/player_style.css';
import LogoutButton from '../components/LogoutButton';
import babyImage from '../assets/baby_dav.png';


const PlayerPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    socket.on('song_selected', (songData) => {
      navigate('/live', { state: { song: songData } }); // Pass the song
    });

    return () => {
      socket.off('song_selected');
    };
  }, [navigate]);

  return (
    <div className="message-container">
      <p className="text-message">Waiting for next song...</p>
      <div>
     <LogoutButton />
      </div>
      <div className='baby-dev'>
        <p className="text-message-baby">If something looks a little off… please remember: I’m still a baby dev</p>
        <img src={babyImage} alt="Baby Dav" className="baby-dev-image" />
        </div>
    </div>
    
  );
};

export default PlayerPage;