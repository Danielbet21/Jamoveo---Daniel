import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../styles/logout_style.css';

const LogoutButton = () => {
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Log-out
    </button>
  );
};

export default LogoutButton;