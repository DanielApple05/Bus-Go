import { createContext, useContext, useState } from 'react';

const BookingContext = createContext(null);

const initialState = {
  tripType: "one-way",

  // Outbound journey
  from: "",
  to: "",
  date: "",
  bus: null,
  seatNumber: null,

  // Return journey
  returnDate: "",
  returnBus: null,
  returnSeatNumber: null,

  passenger: null,
  booking: null,
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