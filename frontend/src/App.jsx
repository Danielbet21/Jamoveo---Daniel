import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SignupAdminPage from './pages/SignupAdminPage';
import PlayerPage from './pages/PlayerPage';
import AdminPage from './pages/AdminPage';
import ResultPage from './pages/ResultPage';
import LivePage from './pages/LivePage';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/signup" element={<SignupAdminPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/player" element={<PlayerPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/live" element={<LivePage />} />
      </Routes>
    </Router>
  </UserProvider>
  );
}

export default App;