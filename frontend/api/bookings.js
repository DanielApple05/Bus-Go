import API from './axios';

export const createBooking = async (payload) => {
  const { data } = await API.post('/booking', payload);
  return data;
};

export const confirmBooking = async (payload) => {
  const { data } = await API.post('/confirm-booking', payload);
  return data;
};