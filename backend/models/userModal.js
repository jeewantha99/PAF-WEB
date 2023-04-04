const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//create user modal
const userSchema = mongoose.Schema(
  {
    fname: { type: "String", required: true },
    lname: { type: "String", required: true },
    email: { type: "String", required: true },
    userName: { type: "String", required: true, default: "user_123" },
    password: { type: "String", required: true },
    followers: { type: "number", required: true, default: 0 },
    following: { type: "number", required: true, default: 0 },
    postsCount: { type: "number", required: true, default: 0 },
    about: {
      type: "String",
      required: true,
      default: "Bio",
    },
    pic: {
      type: "String",
      require: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestapms: true,
  }
);

//password mating function
userSchema.methods.matchPassword = async function (enteredPassword) {
  //compare user give password encrypted password
  return await bcrypt.compare(enteredPassword, this.password);
};

//encrypting password using bcryptjs before saving data to database
userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  } else {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
