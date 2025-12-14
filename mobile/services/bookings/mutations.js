import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (bookingData) => {
      const response = await api.post("/bookings", bookingData);
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate queries
      queryClient.invalidateQueries(["event"]);
    },
  });
};
