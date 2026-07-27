import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/bookingContext';
import { AuthProvider } from './context/authContext';
import Index from './pages/index';
import BusRoutes from './pages/routes';
import AvailableBuses from './pages/buses';
import BookingSummary from './pages/bookingSumary';
import SeatSelection from './pages/seatSelection';
import HireABus from './pages/hireABus';
import MyBookings from './pages/myBooking';
import ComingSoon from './pages/comingSoon';
import Confirmation from './pages/confirmation';



const App = () => {
  return (
    <AuthProvider >
    <BookingProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/routes" element={<BusRoutes />} />
        <Route path="/buses" element={<AvailableBuses />} />
        <Route path="/summary" element={<BookingSummary />} />
        <Route path="/select-seat" element={<SeatSelection />} />
        <Route path="/hire-bus" element={<HireABus />} />
        <Route path="/booking" element={<MyBookings />} />
         <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/confirmation" element={<Confirmation/>} />
      </Routes>
    </BookingProvider>
    </AuthProvider > 
  );
}

export default App;

