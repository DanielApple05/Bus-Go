import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import Index from './pages/index';
import BusRoutes from './pages/routes';
import AvailableBuses from './pages/buses';
import BookingSummary from './pages/bookingSumary';
import SeatSelection from './pages/seatSelection';



const App = () => {
  return (
    <BookingProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/routes" element={<BusRoutes />} />
        <Route path="/buses" element={<AvailableBuses />} />
        <Route path="/booking" element={<BookingSummary />} />
        <Route path="/seat" element={<SeatSelection />} />
      </Routes>
    </BookingProvider>
  );
}

export default App;

