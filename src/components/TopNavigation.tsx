import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './TopNavigation.css';

const TopNavigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className='top-navigation'>
      <Link
        to='/settings'
        className={`nav-link ${
          location.pathname === '/settings' ? 'active' : ''
        }`}
      >
        Settings
      </Link>
      <Link
        to='/shop'
        className={`nav-link ${location.pathname === '/shop' ? 'active' : ''}`}
      >
        Shop
      </Link>
    </nav>
  );
};

export default TopNavigation;
