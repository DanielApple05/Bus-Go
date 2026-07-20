import API from './axios';

export const getAvailability = async (from, to, date) => {
  const { data } = await API.get('/availability', { params: { from, to, date } });
  return data;
};