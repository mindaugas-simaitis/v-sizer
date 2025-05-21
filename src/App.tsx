import React from 'react';
import './App.css';
import SizeConverter from './components/SizeConverter';
import MobileWrapper from './components/MobileWrapper';

function App() {
  return (
    <div className='App'>
      <img
        src='https://marketplace-web-assets.vinted.com/assets/web-logo/default/logo.svg'
        alt='Vinted'
        className='corner-logo'
      />
      <MobileWrapper>
        <SizeConverter />
      </MobileWrapper>
    </div>
  );
}

export default App;
