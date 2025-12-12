const express = require("express");
const router = express.Router();
const { getEventInfo } = require("../controllers/eventController");

router.get("/", getEventInfo);

module.exports = router;
