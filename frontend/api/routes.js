import API from './axios';

export const getRoutes = async () => {
  const { data } = await API.get('/routes');
  return data;
};

export const getCities = async () => {
  const { data } = await API.get('/routes/cities');
  return data;
};