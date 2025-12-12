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
