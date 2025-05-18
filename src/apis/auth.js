import axios from '../lib/axios';

export const login = async (loginRequest) => {
  const response = await axios.post('/auth/login', loginRequest);
  return response.data;
};
