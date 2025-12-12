const sequelize = require("../config/database");
const Artist = require("./Artist");
const Booking = require("./Booking");
const EventInfo = require("./EventInfo");

// Define associations here if needed
// Example:
// EventInfo.hasMany(Booking, { foreignKey: 'event_id', as: 'bookings' });
// Booking.belongsTo(EventInfo, { foreignKey: 'event_id', as: 'event' });

module.exports = {
  sequelize,
  Artist,
  Booking,
  EventInfo,
};
