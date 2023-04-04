import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
import "./Profile.css";
import SettingsIcon from "@mui/icons-material/Settings";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Swal from "sweetalert2";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import validator from "validator";
import LinearProgress from "@mui/material/LinearProgress";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useHistory } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";

function Profile() {
  const [spacing, setSpacing] = React.useState(2);
  const [postList, setPostList] = React.useState([]);
  const [editState, setEditState] = React.useState(false);
  const history = useHistory();

  const [loginData, setLoginData] = React.useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [_id, setUserId] = React.useState(loginData._id);
  const [fname, setFirstName] = React.useState(loginData.fname);
  const [lname, setLastName] = React.useState(loginData.lname);
  const [email, setEmail] = React.useState(loginData.email);
  const [about, setAbout] = React.useState(loginData.about);
  const [pic, setPic] = React.useState(loginData.pic);
  const [open, setOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [progress, setProgress] = React.useState("none");
  const [updateOpen, setUpdateOpen] = React.useState(false);
  const [updateFailOpen, setUpdateFailOpen] = React.useState(false);
  const [updateProgress, setUpdateProgress] = React.useState("none");
  const [updateBtnOpacity, setUpdateBtnOpacity] = React.useState(1);

  const fileInput = React.useRef();

  useEffect(() => {
    setUserId(loginData._id);
    getUserPosts();
  }, []);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const changeState = () => {
    setEditState(false);
    
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setErrorOpen(false);
    setUpdateFailOpen(false);
    setUpdateOpen(false);
  };

  const postDetails = (pic) => {
    setProgress("block");

    if (pic === undefined) {
      console.log("Plese upload an image!!!");
    }
    if (pic.type === "image/jpeg" || "image.png") {
      const data = new FormData();

      data.append("file", pic);

      data.append("upload_preset", "userImages");

      data.append("cloud_name", "cake-lounge");

      fetch("https://api.cloudinary.com/v1_1/cake-lounge/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())

        .then((data) => {
          //const imageUrl = data.url.toString();
          setPic(data.url.toString());

          loginData.pic = data.url.toString();
          //console.log(data.url.toString());
          console.log(pic);
          setProgress("none");
          setOpen(true);
        })
        .catch((err) => {
          console.log(err);
          setProgress("none");
          setErrorOpen(true);
        });
    } else {
      setProgress("none");
      console.log("Plese upload an image!!!");
    }
  };

  const doUpdate = async (event) => {
    setUpdateProgress("block");
    setUpdateBtnOpacity(0.5);
    var isSuccess = true;
    if (!fname || !lname || !about) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please do any update",
        footer: '<a href="">Why do I have this issue?</a>',
      });
      isSuccess = false;
      setUpdateBtnOpacity(1);
      setUpdateProgress("none");
    }
    if (!validator.isEmail(email)) {
      isSuccess = false;
      Swal.fire({
        title: "Error!",
        text: "Please enter valid email !!!",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "red",
      });
      setUpdateBtnOpacity(1);
      setUpdateProgress("none");
    }

    if (isSuccess) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${loginData.token}`,
          },
        };
        const { data } = await axios.post(
          "http://localhost:5000/api/user/userUpdate",
          {
            _id,
            fname,
            lname,
            email,
            about,
            pic,
          },
          config
        );
        console.log(data.fname);
        localStorage.setItem("userInfo", JSON.stringify(data));
        setUpdateProgress("none");
        setUpdateOpen(true);
        setUpdateBtnOpacity(1);
      } catch (error) {
        setUpdateProgress("none");
        setUpdateFailOpen(true);
        setUpdateBtnOpacity(1);
        console.log(error.response.data.error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.error,
        });
      }
    }
  };

  const deleteProfile = async (event) => {
    setUpdateProgress("block");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${loginData.token}`,
            },
          };
          const { data } = await axios.post(
            "/api/user/deleteUser",
            {
              _id,
            },
            config
          );
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User has been deleted",
            showConfirmButton: false,
            timer: 1500,
          });
          setUpdateProgress("none");
          localStorage.removeItem("userInfo");
          history.push("/");
        } catch (error) {
          setUpdateProgress("none");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.error,
          });
        }
      } else {
        setUpdateProgress("none");
      }
    });
  };

  const getUserPosts = async()=>{
     try {
       const config = {
         headers: {
           "Content-type": "application/json",
           Authorization: `Bearer ${loginData.token}`,
         },
       };
       const { data } = await axios.post(
        "/api/post/getUserPosts",
        {
          _id,
        }, 
        config
        );
        setPostList(data)
       console.log(data.array);
     } catch (error) {
       console.log(error.response.data.error);
       Swal.fire({
         icon: "error",
         title: "Oops...",
         text: error.response.data.error,
       });
     }
  }

  if (!loginData) {
    return (
      <Stack spacing={1}>
        {/* For variant="text", adjust the height via font-size */}
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        {/* For other variants, adjust the size with `width` and `height` */}
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />

        <Skeleton variant="rectangular" width={210} height={118} />
      </Stack>
    );
  } else if (editState && loginData) {
    return (
      <div className="edit_form">
        <input
          ref={fileInput}
          type="file"
          style={{ display: "none" }}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />

        <Box sx={{ maxWidth: "50%", marginTop: "50px", marginLeft: "200px" }}>
          <Tooltip title="Close" placement="top-end">
            <IconButton sx={{ marginLeft: "35vw" }} onClick={changeState}>
              <ClearIcon sx={{ display: "flex" }} />
            </IconButton>
          </Tooltip>

          <Typography variant="h6" gutterBottom>
            Edit profile
          </Typography>
          <Avatar
            src={loginData.pic ? loginData.pic : pic}
            alt="profile"
            sx={{
              width: "150px",
              height: "150px",
              marginLeft: "165px",
            }}
          />
          <Tooltip title="Change or add profile image">
            <Button color="success" onClick={() => fileInput.current.click()}>
              Change
            </Button>
          </Tooltip>

          <Box sx={{ width: "100%", display: progress }}>
            <LinearProgress />
          </Box>

          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              severity="success"
              sx={{ width: "100%" }}
              onClose={handleClose}
            >
              Image uploaded!
            </Alert>
          </Snackbar>

          <Snackbar
            open={errorOpen}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              severity="error"
              sx={{ width: "100%" }}
              onClose={handleClose}
            >
              Image not uploaded!
            </Alert>
          </Snackbar>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                defaultValue={fname}
                autoComplete="given-name"
                variant="standard"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                defaultValue={lname}
                autoComplete="family-name"
                variant="standard"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                variant="standard"
                defaultValue={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="about"
                label="About"
                multiline
                rows={3}
                maxRows={6}
                variant="standard"
                name="about"
                defaultValue={about}
                autoComplete="family-name"
                onChange={(e) => setAbout(e.target.value)}
              />
            </Grid>
          </Grid>

          <Box sx={{ width: "100%", display: updateProgress }}>
            <LinearProgress />
          </Box>

          <Grid item xs={12} sx={{ marginTop: "50px", marginBottom: "50px" }}>
            <Snackbar
              open={updateOpen}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert
                severity="success"
                sx={{ width: "100%" }}
                onClose={handleClose}
              >
                Profile updated
              </Alert>
            </Snackbar>

            <Snackbar
              open={updateFailOpen}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert
                severity="error"
                sx={{ width: "100%" }}
                onClose={handleClose}
              >
                Update failed
              </Alert>
            </Snackbar>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Tooltip title="Delete profile" placement="top-end">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={deleteProfile}
                    sx={{ marginRight: "60px" }}
                  >
                    Delete Account
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item xs={6}>
                <Tooltip title="Update profile" placement="top-end">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={doUpdate}
                    sx={{ opacity: updateBtnOpacity, marginLeft: "40px" }}
                  >
                    Update Changes
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  } else if (loginData) {
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
                src={loginData.pic}
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
            <div className="profilepage_username">{loginData.userName}</div>
            <Tooltip title="Edit profile" placement="top-end">
              <Button
                variant="outlined"
                startIcon={<SettingsIcon />}
                sx={{ marginTop: "-50px" }}
                onClick={(e) => setEditState(true)}
              >
                Edit profile
              </Button>
            </Tooltip>

            <div className="analytics">
              <div className="post_count">{loginData.postsCount}</div>
              <span>Posts</span>
              <div className="followers_count">{loginData.followers} </div>
              <span>Followers</span>
              <div className="following_count">{loginData.following} </div>
              <span>Following</span>
            </div>
            <br></br>

            <div className="profile_details">
              <div className="profilepage_name">
                <p>{loginData.fname + " " + loginData.lname}</p>
              </div>
              <div className="about">
                <p>{loginData.about}</p>
              </div>
            </div>
          </Grid>
        </Grid>

        <Divider variant="middle" sx={{ marginTop: 10 }} />
        <br></br>

        <Grid item xs={12} className="post_section">
          <Grid container justifyContent="center" spacing={spacing}>
            {postList.map((value) => (
              <Grid key={value} item>
                <Card sx={{ maxWidth: 200 }}>
                  <CardMedia
                    component="img"
                    height="194"
                    image={value.image}
                    alt="Paella dish"
                  />

                  <Divider variant="middle" />
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
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
  } else {
    <div>
      <h3>Loading........</h3>
    </div>;
  }
}

export default Profile;
