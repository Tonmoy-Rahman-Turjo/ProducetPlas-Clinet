import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:5000'
  baseURL: 'https://elevent-serversite.vercel.app/'
});

const useAxiosHook = () => {
  return axiosInstance;
};

export default useAxiosHook;