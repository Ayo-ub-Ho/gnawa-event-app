const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookingByCode,
  getBookingsByEmail,
} = require("../controllers/bookingController");

router.post("/", createBooking);
router.get("/code/:code", getBookingByCode);
router.get("/email/:email", getBookingsByEmail);

module.exports = router;
