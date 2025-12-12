const express = require("express");
const router = express.Router();
const {
  getAllArtists,
  getArtistById,
  createArtist,
  updateArtist,
  deleteArtist,
} = require("../controllers/artistController");

// Public routes
router.get("/", getAllArtists);
router.get("/:id", getArtistById);

// Admin routes (no auth for now - add later if needed)
router.post("/", createArtist);
router.put("/:id", updateArtist);
router.delete("/:id", deleteArtist);

module.exports = router;
