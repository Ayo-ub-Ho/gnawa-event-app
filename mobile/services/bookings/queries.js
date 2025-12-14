import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
export const useGetBookingsByEmail = (email) => {
  return useQuery({
    queryKey: ["bookings"],
    enabled: !!email,
    queryFn: async () => {
      const response = await api.get("/bookings/email/" + email);
      return response.data.data;
    },
  });
};

export const useGetBookingsByCode = (code) => {
  return useQuery({
    queryKey: ["bookings/code"],
    enabled: !!code,
    queryFn: async () => {
      const response = await api.get("/bookings/code/" + code);
      return response.data.data;
    },
  });
};
