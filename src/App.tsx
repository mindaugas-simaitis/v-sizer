import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileScreen from './components/ProfileScreen';
import SizeConverter from './components/SizeConverter';
import MobileWrapper from './components/MobileWrapper';
import './App.css';

const App: React.FC = () => {
  return (
    <div className='App'>
      <img
        src='https://marketplace-web-assets.vinted.com/assets/web-logo/default/logo.svg'
        alt='Vinted'
        className='corner-logo'
      />
      <MobileWrapper>
        <Router>
          <Routes>
            <Route path='/' element={<ProfileScreen />} />
            <Route path='/v-sizer' element={<SizeConverter />} />
          </Routes>
        </Router>
      </MobileWrapper>
    </div>
  );
};

export default App;
