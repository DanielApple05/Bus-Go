import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import Index from './pages/index';
import BusRoutes from './pages/buses';
import AvailableBuses from './pages/availableBuses';
import BookingSummary from './pages/bookingSumary';
import SeatSelection from './pages/seatSelection';



const App = () => {
  return (
    <BookingProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/buses" element={<BusRoutes />} />
        <Route path="/availableBuses" element={<AvailableBuses />} />
        <Route path="/booking" element={<BookingSummary />} />
        <Route path="/seat" element={<SeatSelection />} />
      </Routes>
    </BookingProvider>
  );
}

export default App;

