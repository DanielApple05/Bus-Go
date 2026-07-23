// api/buses.js
import API from './axios';

export const getBuses = async () => {
  const { data } = await API.get('/buses');
  return data;
};

export const getAvailability = async (from, to, date) => {
  const { data } = await API.get('/availability', { params: { from, to, date } });
  return data;
};