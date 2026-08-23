// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './components/Home';
import PanamaItinerary from './components/PanamaItinerary';

function App() {
  return (
    <HashRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/travel" element={<PanamaItinerary />} />
      </Routes>
    </HashRouter >
  );
}

export default App;