import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileScreen.css';
import screen1 from '../assets/screen1.PNG';

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();

  const handlePersonalizationClick = () => {
    navigate('/v-sizer');
  };

  return (
    <div className='profile-screen'>
      <img src={screen1} alt='Profile Screen' className='background-image' />
      <button
        className='personalization-button'
        onClick={handlePersonalizationClick}
        aria-label='Go to Size Guide'
      />
    </div>
  );
};

export default ProfileScreen;
