import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import axios from 'axios';
import Skeleton from "@mui/material/Skeleton";
import Swal from 'sweetalert2';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

function CreatePost(props) {

  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const fileInput = React.useRef();
  const [prePost, setPrePost] = useState("block");
  const [postContent, setPostContent] = useState("none");
  const [image, setImage] = useState();
  const [userId, setUserId] = useState(userData._id);
  const [userName, setUserName] = useState(
    userData.fname + " " + userData.lname
  );
  const [userPic, setUserPic] = useState(userData.pic);
  const [caption, setCaption] = useState();
  const [timeCreated, setTimeCreated] = useState(new Date());
  const [postBtnDisplay, setPostBtnDisplay] = useState('block');
  const [loadingDisplay, setLoadingDisplay] = useState('none');
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [failOpen, setFailOpen] = React.useState(false);
  const date = new Date();


  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #dfdfdf",
    boxShadow: 24,
    borderRadius: "16px",
    p: 4,
    minHeight: "60vh",
    minWidth: "25vw",
  };


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessOpen(false);
    setFailOpen(false);
  };

  useEffect(() => {
    setPrePost("block");
    setPostContent("none");
  }, [props.onClose]);

  const removeImage = (event) => {
    setImage(null);
    setPostContent("none");
    setPrePost("block");
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const postDetails = (image) => {
    if (image === undefined) {
      console.log("Plese upload an image!!!");
    }
    if (image.type === "image/jpeg" || "image.png") {
      const data = new FormData();

      data.append("file", image);

      data.append("upload_preset", "userImages");

      data.append("cloud_name", "cake-lounge");

      fetch("https://api.cloudinary.com/v1_1/cake-lounge/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())

        .then((data) => {
          //const imageUrl = data.url.toString();
          setImage(data.url.toString());

          //console.log(data.url.toString());
          image = data.url.toString();
          console.log(image);
          setPrePost("none");
          setPostContent("block");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Plese upload an image!!!");
    }
  };

  const postImage = async(event) => {
    setPostBtnDisplay('none');
    setLoadingDisplay('block');
    console.log(
      userId,
      userName,
      image,
      userPic,
      caption,
      timeCreated
    );
    try {
        const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userData.token}`,
        },
        };
        const { data } = await axios.post(
          "/api/post",
          {
            userId,
            userName,
            image,
            userPic,
            caption,
            timeCreated,
          },
          config
        );
        console.log(data);
        setPostBtnDisplay("block");
        setLoadingDisplay("none");
        setSuccessOpen(true);
        props.onClose();
        
    } catch (error) {
        console.log(error.response.data.error);
        setPostBtnDisplay("block");
        setLoadingDisplay("none");
        setFailOpen(true);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.error,
        });
    }
  };

  if(!userData){
    return (
      <div>
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
        <Skeleton
          animation="wave"
          height={10}
          width="80%"
          style={{ marginBottom: 6 }}
        />
        <Skeleton animation="wave" height={10} width="40%" />
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={10} width="80%" />
      </div>
    );

  }
  else{
  return (
    <div>
      <input
        ref={fileInput}
        type="file"
        style={{ display: "none" }}
        accept="image/*"
        onChange={(e) => postDetails(e.target.files[0])}
      />
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ marginLeft: "130px", marginTop: "-20px" }}>
            Create a new post
          </div>

          <Divider sx={{ width: "100%" }} />
          <div className="pre_create_post_body" style={{ display: prePost }}>
            <Avatar
              alt="Image"
              src="https://res.cloudinary.com/cake-lounge/image/upload/v1674740101/image_insta_obphdp.png"
              sx={{
                marginTop: "110px",
                minWidth: "100px",
                minHeight: "100px",
                marginLeft: "130px",
              }}
            />
            <div style={{ marginLeft: "110px" }}>What's on your mind?</div>
            <Tooltip title="Click to open">
              <Button
                color="success"
                onClick={() => fileInput.current.click()}
                sx={{ marginLeft: "80px", marginTop: "20px" }}
              >
                Select from computer
              </Button>
            </Tooltip>
          </div>

          <div
            className="post_content"
            style={{ display: postContent, marginTop: "30px" }}
          >
            <Card sx={{ width: "100%" }}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" src={userData.pic}></Avatar>
                }
                title={userData.fname + " " + userData.lname}
                subheader={
                  date.getFullYear() +
                  "/" +
                  date.getMonth() +
                  1 +
                  "/" +
                  date.getDate()
                }
              />
              <CardMedia
                component="img"
                height="194"
                image={image}
                alt="Upload image"
              />
              <CardContent>
                <TextField
                  id="standard-basic"
                  placeholder="Type something"
                  variant="standard"
                  multiline
                  rows={2}
                  maxRows={6}
                  onChange={(e) => setCaption(e.target.value)}
                  sx={{ width: "100%" }}
                />
              </CardContent>
              <CardActions disableSpacing>
                <Tooltip title="remove photo" placement="top-end">
                  <IconButton aria-label="share" sx={{ marginLeft: "20px" }}>
                    <RemoveCircleOutlineIcon
                      sx={{ color: "red" }}
                      onClick={removeImage}
                    />
                  </IconButton>
                </Tooltip>
                <CircularProgress
                  sx={{ marginLeft: "250px", display: loadingDisplay }}
                />
                <Button
                  sx={{
                    marginLeft: "250px",
                    border: "1px solid blue",
                    display: postBtnDisplay,
                  }}
                  onClick={postImage}
                >
                  Post
                </Button>
              </CardActions>
            </Card>
          </div>
        </Box>
      </Modal>
      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Post uploaded!
        </Alert>
      </Snackbar>
      <Snackbar open={failOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Fail to upload post!
        </Alert>
      </Snackbar>
    </div>
  );
}
}

export default CreatePost;
