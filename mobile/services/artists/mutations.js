import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: () => api.post("/bookings").then((res) => res.data),
  });
};
