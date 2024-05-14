const partyModel = require("../models/partyModel");

//Create Party
const createPartyController = async (req, res) => {
  try {
    const { name, description } = req.body;
    //Validate
    if (!name || !description) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    const party = await partyModel({
      name,
      description,
      postedBy: req.auth._id,
    }).save();
    res.status(201).send({
      success: true,
      message: "Party Created Succesfully",
      party,
    });
    console.log(req);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Party APi",
      error,
    });
  }
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
    const { name, description } = req.body;
    //find party
    const party = await partyModel.findById({ _id: req.params.id });
    //validation
    if (!name || !description) {
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
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Party Updated Successfully",
      updatedParty,
      
    })
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
