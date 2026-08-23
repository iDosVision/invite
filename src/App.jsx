// App.jsx
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home';
import PanamaItinerary from './components/PanamaItinerary';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/travel" element={<PanamaItinerary />} />
      </Routes>
    </HashRouter>
  );
}

export default App;