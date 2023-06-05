const { DataTypes } = require('sequelize');
const { db } = require('./../database/config');

const Repairs = db.define('repairs', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
    // enum: ["pending", "completed", "cancelled"],
  },
});

module.exports = Repairs;
