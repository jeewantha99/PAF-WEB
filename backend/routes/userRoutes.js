const express = require("express");
const router = express.Router();

//importing all controller functions
const {
  registerUser,
  authUser,
  getSingleUser,
  updateUser,
  deleteUser,
  searchUser,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

//routing all end points
router.route("/").post(registerUser).get(protect);
router.route("/login").post(authUser);
router.route("/getSingleUser").post(protect, getSingleUser);
router.route("/userUpdate").post(protect,updateUser);
router.route("/deleteUser").post(protect, deleteUser);
router.route("/searchUser").get(protect,searchUser);

module.exports = router;
