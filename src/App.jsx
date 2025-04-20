import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { PropertyProvider } from './context/PropertyContext';
import { AdProvider } from './context/AdContext';

const App = () => {
  return (
    <PropertyProvider>
      <AdProvider>
        <Router>
          <Routes />
        </Router>
      </AdProvider>
    </PropertyProvider>
  );
};

export default App;