const mongoose = require("mongoose");
const timeSchema = new mongoose.Schema({
  by: { type: String, default: "sumedh" },
  currentTime: { type: String },
});

const Time = mongoose.model("time", timeSchema);

module.exports = { Time };
