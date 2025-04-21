import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { PropertyProvider } from './context/PropertyContext';
import { AdProvider } from './context/AdContext';
import { CardStyleProvider } from './context/CardStyleContext';

const App = () => {
  return (
    <PropertyProvider>
      <AdProvider>
        <CardStyleProvider>
          <Router>
            <Routes />
          </Router>
        </CardStyleProvider>
      </AdProvider>
    </PropertyProvider>
  );
};

export default App;