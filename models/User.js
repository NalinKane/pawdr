const mongoose = require("mongoose");
const Pet = require("./Pet");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre("save", async function() {
  if (this.isModified("location")) {
    await Pet.updateMany({ location: this.location });
  }
});

module.exports = User = mongoose.model("users", UserSchema);
