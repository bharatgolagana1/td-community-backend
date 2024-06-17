const mongoose = require("mongoose");

const functionHallInventory = new mongoose.Schema({
  TenantId: {type: String, required: true,},
  FunctionHallName: {type: String, required: true,},
  FunctionType: {type: String, required: true,},
  Date: {type: Date, required: true },
  Status: { type: String, required: true, },
  Address : {type: String, required: true,},
  Capacity: {type: Number, required: true, },
  Price: {type: Number, required: true,},
  MobileNumber: {type: Number, required: 1234567890,},
  Email: {type: String, required: true,},
  Rating: {type: Number, min: 0, max: 5,},
  Timing:{type: Number, default: 0,},
  DiningHalls:{type: Number, default:0,}
});

module.exports = mongoose.model('functionHallInventory', functionHallInventory);