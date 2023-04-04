const asyncHandler = require("express-async-handler");
const Post = require("../models/postModal"); //importing post modal
const User = require("../models/userModal"); //importing user modal

//adding post function
const addPost = asyncHandler(async (req, res) => {
  const { userId, image, userPic, userName, caption, timeCreated } = req.body; //getting post data to constant variable

  if (!userId || !userName || !image || !userPic) {
    //backend validation for required data
    res.send(400);
    throw new error("Please enter all the fields!!!");
  }

  //get user details
  const user = await User.findById({ _id: userId });
  var count = ++user.postsCount;
  // count = ++count

  //increment user post count by 1
  const updateUser = await User.findByIdAndUpdate(
    userId,
    {
      postsCount: count,
    },
    {
      new: true,
    }
  );

  //creating new post in database
  const post = await Post.create({
    userId,
    userName,
    image,
    userPic,
    caption,
    timeCreated,
  });

  //checking user post count is updated
  if (!updateUser) {
    console.log("Failed increment post count !!!".red.bold);
    res.status(400).json({
      error: "Failed to increment post count for user !!!",
    });
    throw new error("Failed to increment post count for user !!!");
  }

  //response send to frontend by json format
  if (post && updateUser) {
    console.log("Posted!!!".green.bold);
    res.status(201).json({
      _id: post._id,
      userId: post.userId,
      userName: post.userName,
      image: post.image,
      userPic: post.userPic,
      caption: post.caption,
      likes: post.likes,
      timeCreated: post.timeCreated,
      postCount: updateUser.postsCount,
    });
  } else {
    console.log("Failed add post !!!".red.bold);
    //send error message
    res.status(400).json({
      error: "Failed to add post !!!",
    });
    throw new error("Failed to add post !!!");
  }
});

//getting all posts
const getAllPosts = asyncHandler(async (req, res) => {
  //getting all posts from backend and index them by created time and likes count
  const posts = await Post.find().sort({ timeCreated: -1, likes: -1 });

  if (posts) {
    console.log("Posts fetched!!!".green.bold);
    //send data to frontend in json format
    res.status(201).json({
      postList: posts,
    });
    // console.log(posts);
  } else {
    console.log("Failed add post !!!".red.bold);
    //send error message to frontend
    res.status(400).json({
      error: "Failed to fetch post !!!",
    });
    throw new error("Failed to fetch post !!!");
  }
});

//add like to the post
const addLike = asyncHandler(async (req, res) => {
  //getting post body data
  const { postId } = req.body;
  var { likes } = req.body;

  //find post in database and add like
  const addlikes = await Post.findByIdAndUpdate(
    postId,
    {
      likes: likes,
    },
    {
      new: true,
    }
  );

  //send success response to frontend
  if (addlikes) {
    res.status(201).json({
      status: "like added",
      likes: addlikes.likes,
    });

    console.log(addLike);
  } else {
    //send error response to frontend
    res.status(400).json({
      error: "Fail to add like",
      likes: likes,
    });
    throw new error("Fail to add like !!!").red.bold;
  }
});

//get post by each user
const getUserPosts = asyncHandler(async (req, res) => {
  //get body data
  const { _id } = req.body;

  //backend validation for body data received
  if (!_id) {
    res.send(400).json({
      error: "User id not reveived",
    });
    throw new error("Please enter all the fields!!!");
  }

  //getting posts from database by passing user id
  const posts = await Post.find({ userId: { $in: _id } });

  //send respose to frontend
  if (posts) {
    res.send(posts);
    console.log(posts);
  } else {
    //send error message to frontend
    console.log("Invalid userId for fetch product".red.bold);
    res.status(401).json({
      error: "Error find posts",
    });
    throw new error("Invalid userId for fetch product");
  }
});

//exporting all functions
module.exports = {
  addPost,
  getAllPosts,
  addLike,
  getUserPosts,
};
