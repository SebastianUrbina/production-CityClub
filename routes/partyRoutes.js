const express = require("express");
const { requireSignIn } = require("../controllers/userController");
const {
  createPartyController,
  getAllPartiesController,
  getUserPartiesController,
  deletePartyController,
  updatePartyController,
} = require("../controllers/partyController");

//Router Object
const router = express.Router();

//CREATE PARTY || PARTY
router.post("/create-party", requireSignIn, createPartyController);

//GET ALL PARTIES
router.get("/get-all-parties", getAllPartiesController);

//GET USER PARTIES
router.get("/get-user-parties", requireSignIn, getUserPartiesController);

//DELETE PARTY
router.delete("/delete-party/:id", requireSignIn, deletePartyController);

//router PARTY
router.put("/update-party/:id", requireSignIn, updatePartyController);



//Export
module.exports = router;
