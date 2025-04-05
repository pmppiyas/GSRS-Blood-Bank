import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://gsrsserver30.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

const useAxiosSecure = () => {
  return axiosInstance;
};

export default useAxiosSecure;
