const jwt = require("jsonwebtoken");
const User = require("../models/userModal");
const asyncHandler = require("express-async-handler");

//user identification by jwt token
const protect = asyncHandler(async (req, res, next) => {
  let token;

  //check if token is available
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //split token
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //send response removing password
      req.user = await User.findById(decoded.id).select("-password");

      //moving next function in order
      next();
    } catch (error) {
      //send error message
      res.status(401).json({
        error:"Your're Not authoruized to the access this"
      });
      throw new Error("Not authorized, token failed");
    }
  }

  //send error message if token is not available
  if (!token) {
    res.status(401).json({
      error: "Not authorized, no token",
    });
    throw new Error("Not authorized, no token");
  }
});

//export the function
module.exports = { protect };
