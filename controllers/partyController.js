const partyModel = require("../models/partyModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

//Create Party

const createPartyController = async (req, res) => {
  // Use multer middleware to handle the file upload
  upload.single("file")(req, res, async function (err) {
    if (err) {
      return res.status(500).send({
        success: false,
        message: "File upload failed",
        error: err.message,
      });
    }

    try {
      const { name, description, address, date } = req.body;
      // Validate input fields
      if (!name || !description || !address || !date) {
        return res.status(400).send({
          success: false,
          message: "Please provide all fields",
        });
      }

      // Create the party document
      const party = new partyModel({
        name,
        description,
        address,
        date,
        image: req.file ? req.file.path : null,
        postedBy: req.auth._id,
      });
      await party.save();

      res.status(201).send({
        success: true,
        message: "Party created successfully",
        party,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in creating party",
        error,
      });
    }
  });
};

// GET ALL PARTIES
const getAllPartiesController = async (req, res) => {
  try {
    const parties = await partyModel
      .find()
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All Parties",
      parties,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in GET ALL POST API",
      error,
    });
  }
};

//Get user Parties
const getUserPartiesController = async (req, res) => {
  try {
    const userParties = await partyModel.find({ postedBy: req.auth._id });
    res.status(200).send({
      success: true,
      message: "User Parties",
      userParties,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      succes: false,
      message: "Error in User Parties API",
      error,
    });
  }
};

//Delete Party
const deletePartyController = async (req, res) => {
  try {
    const { id } = req.params;
    await partyModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: "The Party Has been deleted!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Party API",
      error,
    });
  }
};

//Update Party
const updatePartyController = async (req, res) => {
  try {
    const { name, description, address, date } = req.body;
    //find party
    const party = await partyModel.findById({ _id: req.params.id });
    //validation
    if (!name || !description || !address || !date) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Party Name or Description",
      });
    }
    const updatedParty = await partyModel.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        name: name || party?.name,
        description: description || party?.description,
        address: address || party?.address,
        date: date || party?.date,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Party Updated Successfully",
      updatedParty,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update party api",
      error,
    });
  }
};

module.exports = {
  createPartyController,
  getAllPartiesController,
  getUserPartiesController,
  deletePartyController,
  updatePartyController,
};
