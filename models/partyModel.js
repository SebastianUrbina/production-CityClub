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
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Party", partySchema);
