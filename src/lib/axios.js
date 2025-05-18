import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://hejdev1.goqual.com:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
