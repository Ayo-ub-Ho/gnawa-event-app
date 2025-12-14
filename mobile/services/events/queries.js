import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
export const useGetEvent = () => {
  return useQuery({
    queryKey: ["event"],
    queryFn: async () => {
      const response = await api.get("/event");
      return response.data.data;
    },
  });
};
