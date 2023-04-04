import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
import "./Profile.css";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import Tooltip from "@mui/material/Tooltip";
import ClearIcon from "@mui/icons-material/Clear";
import { UserState } from './../context/UserProvider';
import SettingsIcon from "@mui/icons-material/Settings";
import Button from "@mui/material/Button";


export default function VisitorProfile(props) {
  const [spacing, setSpacing] = React.useState(2);
  const { selectedUser, setSelectedUser } = UserState();

  const clearSearch = ()=>{
    setSelectedUser(null);
  }
  return (
    <div className="profile_main">
      <Grid container component="main" sx={{ maxHeight: "70vh" }}>
        <Grid item xs={2} sm={2} md={4}>
          <Box
            sx={{
              width: "100%",
              marginTop: "50px",
              border: "none",
              marginLeft: "150px",
            }}
          >
            <Avatar
              src={props.data.pic}
              alt="profile"
              sx={{
                width: "150px",
                height: "150px",
                marginTop: 12,
                marginLeft: 8,
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={6} sm={6} md={8} sx={{ marginLeft: "-80px" }}>
          <div className="profilepage_username">{props.data.userName}</div>
          
            <Tooltip title="Close" placement="top-end">
              <IconButton sx={{ marginLeft: "35vw" }} onClick={clearSearch}>
                <ClearIcon sx={{ display: "flex" }} />
              </IconButton>
          </Tooltip>

          <div className="analytics">
            <div className="post_count">{props.data.postsCount}</div>
            <span>Posts</span>
            <div className="followers_count">{props.data.followers} </div>
            <span>Followers</span>
            <div className="following_count">{props.data.following} </div>
            <span>Following</span>
          </div>
          <br></br>

          <div className="profile_details">
            <div className="profilepage_name">
              <p>{props.data.fname + " " + props.data.lname}</p>
            </div>
            <div className="about">
              <p>{props.data.about}</p>
            </div>
          </div>
        </Grid>
      </Grid>

      <Divider variant="middle" sx={{ marginTop: 10 }} />
      <br></br>

      <Grid item xs={12} className="post_section">
        <Grid container justifyContent="center" spacing={spacing}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((value) => (
            <Grid key={value} item>
              <Card sx={{ maxWidth: 300 }}>
                <CardMedia
                  component="img"
                  height="194"
                  image="https://res.cloudinary.com/cake-lounge/image/upload/v1663143045/WilludaInn/samantha-gades-fIHozNWfcvs-unsplash_l6xerk.jpg"
                  alt="Paella dish"
                />

                <Divider variant="middle" />
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <br></br>
      <br></br>
    </div>
  );
}
