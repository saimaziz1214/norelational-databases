const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  skills: [String],
  address: {
    city: String,
    country: String,
  },
  avatar: String,
});

module.exports = mongoose.model("User", userSchema);