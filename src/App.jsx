import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';

import Home from './Pages/Home';
import Login from './Pages/Login';
import SaveSlip from './Pages/SaveSlip';
import SlipDetails from './Pages/SlipDetails';
import SlipHistory from './Pages/SlipHistory';

function App() {
  return (
    <Router>
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/save-slip" element={<SaveSlip />} />
          <Route path="/slip-history" element={<SlipHistory />} />
          <Route path="/slip-details" element={<SlipDetails />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
