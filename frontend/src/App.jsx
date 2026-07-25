import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/bookingContext';
import Index from './pages/index';
import BusRoutes from './pages/routes';
import AvailableBuses from './pages/buses';
import BookingSummary from './pages/bookingSumary';
import SeatSelection from './pages/seatSelection';
import HireABus from './pages/hireABus';



const App = () => {
  return (
    <BookingProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/routes" element={<BusRoutes />} />
        <Route path="/buses" element={<AvailableBuses />} />
        <Route path="/summary" element={<BookingSummary />} />
        <Route path="/select-seat" element={<SeatSelection />} />
        <Route path="/hire-bus" element={<HireABus />} />
      </Routes>
    </BookingProvider>
  );
}

export default App;

