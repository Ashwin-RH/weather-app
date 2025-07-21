import React from 'react';
import Weather from './components/Weather';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div className='bg-gradient-to-br from-orange-400 to-indigo-800'>
      
      <Weather />
      <Toaster position="top-center" />
    </div>
  );
};

export default App;
