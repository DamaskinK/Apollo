import { LogOut } from 'lucide-react';
import './Header.css';
import { useNotification } from '../context/NotificationContext';

import shapeSvg from '../assets/shape.svg';
import logoPng from '../assets/Logo.png';
import starSvg from '../assets/Star.svg';
import searchSvg from '../assets/Search.svg';

interface User {
  name: string;
  role: string;
}

interface HeaderProps {
  onLogoClick?: () => void;
  onLoginClick?: () => void;
  isLoggedIn?: boolean;
  user?: User | null;
  onLogout?: () => void;
}

export default function Header({ onLogoClick, onLoginClick, isLoggedIn = false, user, onLogout }: HeaderProps) {
  const { showNotification } = useNotification();

  const handleLogin = () => {
    if (onLoginClick) {
      onLoginClick();
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      showNotification('Logged Out', 'You have been successfully logged out');
    }
  };

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    }
  };

  return (
    <header className="header">
      {/* Logo Section */}
      <div className="logo-section">
        <div className="logo-container" onClick={handleLogoClick}>
          <div className="logo-image-wrapper">
            <img
              src={logoPng}
              alt="Apollo Logo"
              className="logo-image"
            />
          </div>
          <div className="logo-text">
            <p>Apollo</p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <div className="search-input-container">
          <div className="search-icon-wrapper">
            <img src={searchSvg} alt="Search" className="search-icon" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="search-input"
          />
        </div>
      </div>

      {/* Auth Section */}
      <div className="auth-section">
        {isLoggedIn && user ? (
          <div className="user-profile">
            <div className="user-avatar">
              <img src={shapeSvg} alt="User Avatar" />
            </div>
            <div className="user-info">
              <p className="user-name">{user.name}</p>
              <p className="user-role">{user.role}</p>
            </div>
            <button className="logout-button" onClick={handleLogout} aria-label="Log out">
              <LogOut size={24} />
            </button>
          </div>
        ) : (
          <button className="login-button" onClick={handleLogin}>
            <div className="star-icon-wrapper">
              <img src={starSvg} alt="Star" className="star-icon" />
            </div>
            <span className="login-text">
              Log in
            </span>
          </button>
        )}
      </div>
    </header>
  );
}