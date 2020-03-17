const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  match: {
    type: Boolean
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("matches", MatchSchema);
