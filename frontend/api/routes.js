import API from './axios';

export const getRoutes = (data) => API.get('/routes', data );