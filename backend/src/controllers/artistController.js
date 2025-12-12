const { EventInfo } = require("../models");

exports.getEventInfo = async (req, res, next) => {
  try {
    const event = await EventInfo.findOne({
      order: [["created_at", "DESC"]],
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event information not found",
      });
    }

    res.json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

// ============================================
// 12. backend/src/controllers/artistController.js
// ============================================
const { Artist } = require("../models");

exports.getAllArtists = async (req, res, next) => {
  try {
    const artists = await Artist.findAll({
      order: [
        ["is_headliner", "DESC"],
        ["performance_order", "ASC"],
      ],
    });

    res.json({
      success: true,
      count: artists.length,
      data: artists,
    });
  } catch (error) {
    next(error);
  }
};

exports.getArtistById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findByPk(id);

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: "Artist not found",
      });
    }

    res.json({
      success: true,
      data: artist,
    });
  } catch (error) {
    next(error);
  }
};

exports.createArtist = async (req, res, next) => {
  try {
    const {
      name,
      bio,
      genre,
      photo_url,
      performance_time,
      performance_order,
      is_headliner,
    } = req.body;

    // Validation
    if (!name || !bio) {
      return res.status(400).json({
        success: false,
        message: "Name and bio are required",
      });
    }

    const artist = await Artist.create({
      name,
      bio,
      genre: genre || "Gnawa",
      photo_url,
      performance_time,
      performance_order: performance_order || 0,
      is_headliner: is_headliner || false,
    });

    res.status(201).json({
      success: true,
      data: artist,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateArtist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findByPk(id);

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: "Artist not found",
      });
    }

    await artist.update(req.body);

    res.json({
      success: true,
      data: artist,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteArtist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findByPk(id);

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: "Artist not found",
      });
    }

    await artist.destroy();

    res.json({
      success: true,
      message: "Artist deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
