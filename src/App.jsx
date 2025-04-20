import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { PropertyProvider } from './context/PropertyContext';

const App = () => {
  return (
    <PropertyProvider>
      <Router>
        <Routes />
      </Router>
    </PropertyProvider>
  );
};

export default App;