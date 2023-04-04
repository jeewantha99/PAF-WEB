const mongoose = require("mongoose");

//creating [post] modal
const postSchema = mongoose.Schema(
  {
    userId: { type: "String", required: true },
    userName: { type: "String", required: true },
    image: {
      type: "String",
      required: true,
      default:
        "https://res.cloudinary.com/cake-lounge/image/upload/v1674741130/lraidgl0eyu80yhxgeup.png",
    },
    userPic: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    caption: { type: "String" },
    likes: { type: 'number', default: "0" },
    timeCreated: { type: Date, required: true, default: new Date() },
    
  },
  {
    timestapms: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;