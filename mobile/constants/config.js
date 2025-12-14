const API_BASE_URL = __DEV__
  ? "http://192.168.1.143:5000/api"
  : "https://your-production-api.com/api";

export const CONFIG = {
  API_BASE_URL,
  ENDPOINTS: {
    EVENT: "/event",
    ARTISTS: "/artists",
    BOOKINGS: "/bookings",
    BOOKING_BY_CODE: (code) => `/bookings/code/${code}`,
    BOOKING_BY_EMAIL: (email) => `/bookings/email/${email}`,
  },
};
