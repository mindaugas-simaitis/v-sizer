import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './Navigation';
import SizeConverter from './SizeConverter';
import ProfileBuilder from './ProfileBuilder';

const App: React.FC = () => {
  return (
    <Router>
      <div className='App'>
        <Navigation />
        <Routes>
          <Route path='/' element={<SizeConverter />} />
          <Route path='/profile-builder' element={<ProfileBuilder />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
