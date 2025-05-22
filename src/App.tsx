import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileScreen from './components/ProfileScreen';
import SizeConverter from './components/SizeConverter';
import BuyerScreen from './components/BuyerScreen';
import MobileWrapper from './components/MobileWrapper';
import TopNavigation from './components/TopNavigation';
import './App.css';

const App: React.FC = () => {
  return (
    <div className='App'>
      <img
        src='https://marketplace-web-assets.vinted.com/assets/web-logo/default/logo.svg'
        alt='Vinted'
        className='corner-logo'
      />
      <Router>
        <TopNavigation />
        <MobileWrapper>
          <Routes>
            <Route path='/' element={<ProfileScreen />} />
            <Route path='/v-sizer' element={<SizeConverter />} />
            <Route path='/settings' element={<ProfileScreen />} />
            <Route path='/shop' element={<BuyerScreen />} />
          </Routes>
        </MobileWrapper>
      </Router>
    </div>
  );
};

export default App;
