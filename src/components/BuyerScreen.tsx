import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BuyerScreen.css';
import screen2 from '../assets/screen2.PNG';

const BuyerScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleSizeGuideClick = () => {
    navigate('/v-sizer');
  };

  return (
    <div className='buyer-screen'>
      <img src={screen2} alt='Buyer Screen' className='background-image' />
      <button
        className='size-guide-button'
        onClick={handleSizeGuideClick}
        aria-label='Go to Size Guide'
      />
    </div>
  );
};

export default BuyerScreen;
