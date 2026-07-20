import API from './axios';

export const getRoutes = (data) => await API.get('/routes', data );