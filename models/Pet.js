const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PetSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  location: {
    type: String
  }
});

module.exports = Pet = mongoose.model("pets", PetSchema);
