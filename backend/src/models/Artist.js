const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Artist = sequelize.define(
  "Artist",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Gnawa",
    },
    photo_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    performance_time: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Format: HH:MM - HH:MM (e.g., 20:00 - 21:00)",
    },
    performance_order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    is_headliner: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "artists",
    timestamps: true,
    underscored: true,
  }
);

module.exports = Artist;
