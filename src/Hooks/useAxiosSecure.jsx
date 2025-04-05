import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://gsrsserver30-7meev48zm-pmppiyas-projects.vercel.app",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const useAxiosSecure = () => {
  return axiosInstance;
};

export default useAxiosSecure;
