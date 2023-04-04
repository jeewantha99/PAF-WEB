
//importing all controller functions
const express = require("express");
const router = express.Router();
const {
  addPost,
  getAllPosts,
  addLike,
  getUserPosts,
} = require("../controllers/postControllers");

const { protect } = require("../middleware/authMiddleware");

//routing all end points
router.route("/").post(protect, addPost);
router.route("/getAllPosts").post(protect,getAllPosts);
router.route("/addLike").post(addLike);
router.route("/getUserPosts").post(protect,getUserPosts);

module.exports = router;
