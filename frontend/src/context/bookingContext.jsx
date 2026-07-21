import { createContext, useContext, useState } from 'react';

const BookingContext = createContext(null);

const initialState = {
  tripType: 'one-way',
  from: '',
  to: '',
  date: '',
  returnDate: '',
  bus: null,
  seatNumber: null,
  passenger: null,
  booking: null, // pending booking returned by POST /booking
};

export const BookingProvider = ({ children }) => {
  const [booking, setBookingState] = useState(initialState);

  const updateBooking = (updates) =>
    setBookingState((prev) => ({ ...prev, ...updates }));

  const resetBooking = () => setBookingState(initialState);

  return (
    <BookingContext.Provider value={{ booking, updateBooking, resetBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
};