import { Avatar } from '@mui/material';
import React, { useState, useEffect } from "react";
import './Post.css'
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NearMeIcon from "@mui/icons-material/NearMe";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from 'axios';
import Tooltip from "@mui/material/Tooltip";


export default function Post(props) {

  var [likes, setLikes] = useState(props.data.likes);
  const [likestate, setLikeState] = useState(false);
  const[postId, setPostId] = useState();

useEffect(() => {
  updateLikeCount(postId);
}, [likes]);


  const addLike = (postId)=>{

  setPostId(postId);

    if(likestate){
      setLikeState(false);
      setLikes(likes-1);
    }
    else{
      setLikeState(true);
      setLikes(likes + 1);
    }
      
  }

  const updateLikeCount = async(postId)=>{
    
    try {

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/post/addLike",
        {
          postId,
          likes,
        },
        config
      );
        console.log(data);
    } catch (error) {
      console.log(error.response.data.error);
    }

  }

  return (
    <div className="post_container">
      {/* Header */}
      <div className="post_header">
        <Avatar className="user_image" src={props.data.userPic} />
        <div className="userDetails">
          <div className="post_username">{props.data.userName}</div>
          <div className="post_date">{props.data.timeCreated}</div>
        </div>
      </div>

      {/* Image */}
      <div className="post_image">
        <img
          src={props.data.image}
          alt="Post"
          width="615px"
          min-height="100%"
        ></img>
      </div>

      {/* Options */}
      <div>
        <div className="optins_container">
          <Tooltip title="Add like" placement="top">
            <IconButton
              className="post_react_image"
              onClick={() => {
                addLike(props.data._id);
              }}
            >
              {likestate ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Show comments" placement="top">
            <IconButton className="post_react_image">
              <ChatBubbleOutlineIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Message" placement="top">
            <IconButton className="post_react_image">
              <NearMeIcon />
            </IconButton>
          </Tooltip>

          <div
            style={{ fontWeight: "bold", display: "flex", marginLeft: "35px" }}
          >
            {likes}{" "}
            <div
              style={{
                fontWeight:'lighter',
                display: "flex",
                marginLeft: "5px",
              }}
            >
              Likes
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: "20px",
              marginTop: "10px",
              width: "500px",
            }}
          >
            {props.data.caption}
          </div>
        </div>
      </div>

      {/* Comment */}
      <div>
        <TextField
          id="standard-basic"
          label="Add a comment"
          variant="standard"
          sx={{
            height: "56px",
            width: "608px",
          }}
        />
      </div>
    </div>
  );
}
