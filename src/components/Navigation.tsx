import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className='navigation'>
      <div className='nav-left'>
        <div className='nav-brand'>Size Guide</div>
      </div>
      <div className='nav-links'>
        <Link
          to='/'
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          Size Converter
        </Link>
        <Link
          to='/profile-builder'
          className={`nav-link ${
            location.pathname === '/profile-builder' ? 'active' : ''
          }`}
        >
          Profile Builder
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
