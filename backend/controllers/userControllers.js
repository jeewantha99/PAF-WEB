//importing modals and required files
const asyncHandler = require("express-async-handler");
const User = require("../models/userModal");
const { green } = require("colors");
const genarateToken = require("../config/genarateToken");

//user register function
const registerUser = asyncHandler(async (req, res) => {
  //getting body data
  const { fname, lname, email, userName, password } = req.body;

  //backend validation for body data
  if (!fname || !lname || !email || !userName || !password) {
    res.send(400);
    throw new error("Please enter all the fields!!!");
  }

  //find if user exist with email and user name
  const userExist = await User.findOne({ email });
  const userNameExist = await User.findOne({ userName });

  //sending error message if user exist
  if (userExist) {
    console.log("User already exist!!!".red.bold);
    res.status(400).json({
      error: "User already exist !!!",
    });
    throw new error("User already exist!!!");
  }
  //sending error message if user exist
  if (userNameExist) {
    console.log("User name already exist!!!".red.bold);
    res.status(400).json({
      error: "User name already exist !!!",
    });
    throw new error("User name already exist!!!");
  }

  //create new user in database
  const user = await User.create({
    fname,
    lname,
    email,
    userName,
    password,
  });

  //send response to frontend
  if (user) {
    console.log("Registered!!!".green.bold);
    res.status(201).json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      userName: user.userName,
      followers: user.followers,
      following: user.following,
      postCount: user.postCount,
      token: genarateToken(user._id),
    });
  } else {
    //send error message to frontend
    console.log("Failed to Register User !!!".red.bold);
    res.status(400).json({
      error: "Failed to Register User !!!",
    });
    throw new error("Failed to Register User !!!");
  }
});

//user authenticate
const authUser = asyncHandler(async (req, res) => {
  console.log("back end called".red.bold);

  //getting body data
  const { email, password } = req.body;

  //check if user available in database
  const user = await User.findOne({ email });
  if(!email){
    return res.status(400).send({ message: "Invalid Email" });
  }
  if (!(await user.matchPassword(password)))
    return res.status(400).send({ message: "Incorrect Password " });


  //if user available send response with matching password and genarate JWT token using user id
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      followers: user.followers,
      following: user.following,
      postsCount: user.postsCount,
      pic: user.pic,
      about: user.about,
      userName: user.userName,
      token: genarateToken(user._id),
    });
  } else {
    //send error message to frontend
    console.log("Invalid email or Password".red.bold);
    res.status(400).json({
      error: "Incorrect password !!!",
    });
    throw new error("Incorrect password !!!");
  }
});

//getting single user details
const getSingleUser = asyncHandler(async (req, res) => {
  //getting body data
  const { _id } = req.body;

  //find user in database
  const user = await User.findOne({ _id: _id });

  //send user data if user is available is db
  if (user) {
    res.json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      userName: user.userName,
      password: user.password,
      followers: user.followers,
      following: user.following,
      postsCount: user.postsCount,
      about: user.about,
      pic: user.pic,
    });
    console.log(user);
  } else {
    //send error message
    console.log("Error fetching user".red.bold);
    res.status(401).json({
      error: "cannot find user",
    });
    throw new error("Error fetching user");
  }
});

//user update
const updateUser = asyncHandler(async (req, res) => {
  //getting body data
  const { fname, lname, email, _id, pic, about } = req.body;

  //backend validation for required data
  if (!fname || !lname || !email || !_id) {
    res.send(400).json({
      error: "Please enter all the fields!!!",
    });
    throw new error("Please enter all the fields!!!");
  }

  //find user by id and update given data
  const updateUser = await User.findByIdAndUpdate(
    _id,
    {
      fname: fname,
      lname: lname,
      email: email,
      pic: pic,
      about: about,
    },
    {
      new: true,
    }
  );

  //send success response to frontend
  if (updateUser) {
    console.log("Updated!!!".green.bold);
    res.status(201).json({
      _id: updateUser._id,
      fname: updateUser.fname,
      lname: updateUser.lname,
      email: updateUser.email,
      userName: updateUser.userName,
      followers: updateUser.followers,
      following: updateUser.following,
      postsCount: updateUser.postsCount,
      pic: updateUser.pic,
      about: updateUser.about,
      token: genarateToken(updateUser._id),
    });

    console.log(updateUser);
  } else {
    //send fail response to frontend
    res.status(400).json({
      error: "Update Failed",
    });
    throw new error("User not updated !!!");
  }
});

//deleting user
const deleteUser = asyncHandler(async (req, res) => {
  //getting user id from body data
  const { _id } = req.body;

  //check if id is null
  if (!_id) {
    console.log("Id is null".red.bold);
    res.status(400).json({
      error: "User id is null",
    });
    throw new error("Error while deleting shop !!!");
  } else {
    try {
      //find user by id and delete fron database
      const user = await User.findOneAndDelete({ _id: _id });

      //send success response message to the frontend
      if (user) {
        res.status(201).json({
          _id: _id,
        });
        console.log("Account deleted".red.bold);
      }
    } catch (error) {
      //send error response message to the frontend
      res.status(400).json({
        error: "Fail to delete account !!!",
      });
      throw new error("Error while deleting shop !!!" + error.message);
    }
  }
});

//search user by keywords
const searchUser = asyncHandler(async (req, res) => {
  //getting keyword
  const keyword = req.query.search
    ? {
        $or: [
          { fname: { $regex: req.query.search, $options: "i" } }, //assign keyword find in user first name
          { lname: { $regex: req.query.search, $options: "i" } }, //assign keyword find in user last name
          { userName: { $regex: req.query.search, $options: "i" } }, //assign keyword find in user user name
        ],
      }
    : {};

  //find user in databse by keyword
  const user = await User.find(keyword);
  console.log(user);
  //send data to frontend
  res.send(user);
});

//exporting all fucntions
module.exports = {
  registerUser,
  authUser,
  getSingleUser,
  updateUser,
  deleteUser,
  searchUser,
};
