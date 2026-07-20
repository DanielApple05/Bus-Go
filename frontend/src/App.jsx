import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from './pages/index';
import BusRoutes from './pages/busRoutes';
import AvailableBuses from './pages/availableBuses';
import BookingSummary from './pages/bookingSumary';



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/busRoutes" element={<BusRoutes />} />
      <Route path="/availableBuses" element={<AvailableBuses />} />
      <Route path="/booking" element={<BookingSummary />} />
    </Routes>
  );
}

export default App;

