import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useBookingStore = create(
  persist(
    (set, get) => ({
      // State
      userEmail: null,
      currentBooking: null,
      myBookings: [],

      // Actions
      setUserEmail: (email) => {
        set({ userEmail: email });
      },

      setCurrentBooking: (booking) => {
        set({ currentBooking: booking });
      },

      setMyBookings: (bookings) => {
        set({ myBookings: bookings });
      },

      addBooking: (booking) => {
        set((state) => ({
          myBookings: [booking, ...state.myBookings],
        }));
      },

      clearBookings: () => {
        set({ myBookings: [], currentBooking: null });
      },
    }),
    {
      name: "booking-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        userEmail: state.userEmail,
        myBookings: state.myBookings,
        currentBooking: state.currentBooking,
      }),
    }
  )
);
