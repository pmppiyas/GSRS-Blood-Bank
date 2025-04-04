import { useQuery } from "@tanstack/react-query";

import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUsers = () => {
  // Tanstack
  const axiosSecure = useAxiosSecure();
  const auth = useAuth();
  const { user } = auth;
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get("users");
      return response.data;
    },
  });
  return { users, refetch };
};

export default useUsers;
