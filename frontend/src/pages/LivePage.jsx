import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import socket from '../socket/socket';
import '../styles/live_style.css'; 
import { useUser } from '../context/UserContext';

export const LivePage = () => {
    const navigate = useNavigate(); // Hook to navigate between routes
    const location = useLocation(); // Hook to access the current location object
    const scrollRef = useRef(null); // Ref is used to access the DOM element
    const [autoScroll, setAutoScroll] = useState(false); // State to control auto-scrolling
    const { song } = location.state || {}; // Destructure song from location state
    const { user } = useUser(); // Get user from context

  
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
        }
      }, []);
  
    useEffect(() => {
        // this function will be called when the component mounts
        // and will scroll to the bottom of the lyrics box
      let scrollInterval;
      if (autoScroll && scrollRef.current) {
        scrollInterval = setInterval(() => {
          if (
            scrollRef.current.scrollTop + scrollRef.current.clientHeight >=
            scrollRef.current.scrollHeight
          ) {
            // Reset scroll to the top when reaching the bottom
            scrollRef.current.scrollTop = 0;
          } else {
            // Scroll down incrementally
            scrollRef.current.scrollTop += 1;
          }
        }, 50); // interval speed
      }
      return () => clearInterval(scrollInterval);
    }, [autoScroll]);

    useEffect(() => {
      socket.on('song_selected', (data) => {
        // Save the song and navigate to live
        navigate('/live', { state: { song: data } });
      });
    
      return () => socket.off('song_selected');
    }, []);
  
  
  useEffect(() => {// Listen for quit signal from admin
    socket.on('quit_session', () => {
        if (user.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/player');
          }
    });
    return () => {
      socket.off('quit_session'); // Clean up the event listener on component unmount
    };
  }, []); // Empty dependency array means this effect runs once on mount

  const handleQuit = () => {
    socket.emit('quit_session');
  };

  const isSinger = user.instrument.includes('vocals');

  return (
    <div className="live-container">
    <h1 className="live-title">{song.title} - {song.artist}</h1>

    <div ref={scrollRef} className="lyrics-box">
      <p className="lyric-line">
        {song.lyrics_and_chords.map((word, i) => (
          <span key={i} className="lyric-word">
            {" "+ word.lyrics }
            {
              !isSinger && word.chords && (<span className="chord"> ({word.chords})</span>)
            }
          </span>
        ))}
      </p>
    </div>


    <button
        onClick={() => setAutoScroll(!autoScroll)}
        className="toggle-button"
    >
        {autoScroll ? '🛑 Stop Scroll' : '⬇️ Start Scroll'}
    </button>

    {user.role === 'admin' && (
        <button onClick={handleQuit} className="quit-button">
        Quit
        </button>
    )}
    </div>

  );
};

export default LivePage;