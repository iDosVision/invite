// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './components/Home';
import PanamaItinerary from './components/PanamaItinerary';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/travel" element={<PanamaItinerary />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;