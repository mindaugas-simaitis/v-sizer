import React from 'react';
import './MobileWrapper.css';

interface MobileWrapperProps {
  children: React.ReactNode;
}

const MobileWrapper: React.FC<MobileWrapperProps> = ({ children }) => {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div className='mobile-wrapper-container'>
      <div className='mobile-device'>
        <div className='mobile-notch-container'>
          <div className='mobile-notch'>
            <div className='notch-content'>
              <div className='notch-camera'></div>
              <div className='notch-speaker'></div>
            </div>
          </div>
        </div>
        <div className='mobile-status-bar'>
          <div className='status-left'>
            <span className='time'>{currentTime}</span>
          </div>
          <div className='status-right'>
            <div className='signal-icon'>
              <div className='signal-bar'></div>
              <div className='signal-bar'></div>
              <div className='signal-bar'></div>
              <div className='signal-bar'></div>
            </div>
            <div className='wifi-icon'>
              <div className='wifi-circle'></div>
              <div className='wifi-circle'></div>
              <div className='wifi-circle'></div>
            </div>
            <div className='battery-icon'>
              <div className='battery-level'></div>
            </div>
          </div>
        </div>
        <div className='mobile-content'>{children}</div>
        <div className='mobile-nav'>
          <div className='nav-item active'>
            <svg viewBox='0 0 24 24' className='nav-icon'>
              <path d='M12 3L4 9v12h16V9l-8-6z' />
            </svg>
            <span>Home</span>
          </div>
          <div className='nav-item'>
            <svg viewBox='0 0 24 24' className='nav-icon'>
              <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
            </svg>
            <span>Search</span>
          </div>
          <div className='nav-item'>
            <svg viewBox='0 0 24 24' className='nav-icon'>
              <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' />
            </svg>
            <span>Sell</span>
          </div>
          <div className='nav-item'>
            <svg viewBox='0 0 24 24' className='nav-icon'>
              <path d='M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z' />
            </svg>
            <span>Inbox</span>
          </div>
          <div className='nav-item'>
            <svg viewBox='0 0 24 24' className='nav-icon'>
              <path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
            </svg>
            <span>Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileWrapper;
