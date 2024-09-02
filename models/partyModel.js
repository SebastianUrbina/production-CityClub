const mongoose = require("mongoose");

//schema
const partySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name to the event"],
    },
    description: {
      type: String,
      required: [true, "Please add a description of the party"],
    },
    address: {
      type: String,
      required: [true, "Please add a address of the party"],
    },
    date: {
      type: String,
      required: [true, "Please add a date of the party"],
    },
    image: {
      type: String,      
    },
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Party", partySchema);
