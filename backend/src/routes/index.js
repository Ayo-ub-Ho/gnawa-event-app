const express = require("express");
const router = express.Router();

const artistRoutes = require("./artistRoutes");
const bookingRoutes = require("./bookingRoutes");
const eventRoutes = require("./eventRoutes");

// Mount routes
router.use("/artists", artistRoutes);
router.use("/bookings", bookingRoutes);
router.use("/event", eventRoutes);

module.exports = router;
