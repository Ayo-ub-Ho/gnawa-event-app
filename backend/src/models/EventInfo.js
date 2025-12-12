const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const EventInfo = sequelize.define(
  "EventInfo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    event_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    venue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 500,
      validate: {
        min: 1,
      },
    },
    available_tickets: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 500,
      validate: {
        min: 0,
      },
    },
    ticket_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 150.0,
      validate: {
        min: 0,
      },
    },
    banner_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "event_info",
    timestamps: true,
    underscored: true,
  }
);

module.exports = EventInfo;
