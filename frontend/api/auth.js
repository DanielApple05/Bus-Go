import API from './axios';

export const registerUser = async (payload) => {
  try {
    const { data } = await API.post('/auth/register', payload);
    return data;
  } catch (err) {
    console.log('Register error message:', err.response?.data?.message);
    throw err;
  }
};

export const loginUser = async (payload) => {
  const { data } = await API.post('/auth/login', payload);
  return data;
};