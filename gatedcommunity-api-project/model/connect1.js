const mongoose = require("mongoose");

const roomsInventory = new mongoose.Schema({
  TenantId: {type: Number, required: true,},
  RoomType: {type: String, required: true,},
  Price: {type: Number, default: 0,},
  Date: {type: Date, required: true, },
  Address :{type: String, required: true,},
  Status: { type: String, required: true,},
  Adults: {type: Number, default: 2,},
  Childrens: {type: Number, default: 2,},
  MobileNumber: {type: Number, required: 1234567890,},
  Email: {type: String, required: true,},
  Rating: {type: Number, min: 0, max: 5,},
  Timing: {type: Number, default: 0,},
  BedType: {type: String, required: true,}
});

module.exports = mongoose.model('roomsInventory', roomsInventory);
