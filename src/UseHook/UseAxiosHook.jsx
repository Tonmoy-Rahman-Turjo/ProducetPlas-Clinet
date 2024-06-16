import axios from 'axios';

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000'
});

// Custom hook to return the Axios instance
const useAxiosHook = () => {
  return axiosInstance;
};

export default useAxiosHook;