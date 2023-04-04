import React from 'react'
import Box from "@mui/material/Box";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import { Avatar } from "@mui/material";
import './SideMenu.css'
import HomeIcon from "@mui/icons-material/Home";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MarkChatUnreadOutlinedIcon from "@mui/icons-material/MarkChatUnreadOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Link from "@mui/material/Link";
import { useEffect } from 'react';
import { useState } from 'react';
import LogoutIcon from "@mui/icons-material/Logout";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import CreatePost from './CreatePost';
import Swal from 'sweetalert2';
import { useHistory } from "react-router-dom";




function SideMenu(props) {

    const [home, setHome] = useState();
    const [notification, setNotification] = useState();
    const [message, setMessage] = useState();
    const [create, setCreate] = useState();
    const [profile, setProfile] = useState();
    const [user, setUser] = useState(
      JSON.parse(localStorage.getItem("userInfo"))
    );
    const [open, setOpen] = useState(false);
    const history = useHistory();

    const handleOpen = () => {
      setOpen(true);
      props.data = "create";
    };

    const handleClose = () => {
      setOpen(false);
    };

    useEffect(() => {
        if (props.data === "profile") {
        navigationHelper();
        }
    }, [])

    const navigationHelper = () => {

      if (props.data === "home") {
        setHome("bold");
      } else if (props.data === "profile") {
        setProfile("bold");
      } else if (props.data === "notification") {
        setNotification("bold");
      } else if (props.data === "messages") {
        setMessage("bold");
      } else if (props.data === "create") {
        setCreate("bold");
      }
    };

    const StyledBadge = styled(Badge)(({ theme }) => ({
      "& .MuiBadge-badge": {
        backgroundColor: "#44b700",
        color: "#44b700",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          animation: "ripple 1.2s infinite ease-in-out",
          border: "1px solid currentColor",
          content: '""',
        },
      },
      "@keyframes ripple": {
        "0%": {
          transform: "scale(.8)",
          opacity: 1,
        },
        "100%": {
          transform: "scale(2.4)",
          opacity: 0,
        },
      },
    }));

    const logOutSession = ()=>{
      Swal.fire({
        title: "Are you sure?",
        text: "You need to login again with credentials",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Logout !",
      }).then((result) => {
        if (result.isConfirmed) {
          let timerInterval;
          Swal.fire({
            title: "Please wait!",
            html: "Loggin out....",
            timer: 1000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              const b = Swal.getHtmlContainer().querySelector("b");
              timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft();
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              localStorage.removeItem("userInfo");
              history.push("/");
            }
          });
        }
      });
      
    }
    

    

  return (
    <div className="side_menu">
      <br></br>
      <br></br>
      <br></br>

      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
      >
        <Avatar
          alt="Profile"
          fontSize="large"
          src={user.pic}
          sx={{ width: 80, height: 80 }}
        />
      </StyledBadge>

      <div className="profile_name">{user.fname + " " + user.lname}</div>
      <br></br>
      <div className="profile_username">{user.userName}</div>

      <Box
        sx={{ width: 420, maxWidth: "100%", marginTop: "20px", border: "none" }}
      >
        <MenuList>
          <Link
            href="/home"
            variant="body2"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem className="home" sx={{ backgroundColor: home }}>
              <div className="menu_item">
                <HomeIcon fontSize="large" />
                <div className="menu_text">Home</div>
              </div>
            </MenuItem>
          </Link>

          <Link
            href="/profile"
            variant="body2"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem
              className="notifications"
              sx={{ backgroundColor: notification }}
            >
              <div className="menu_item">
                <Badge badgeContent={4} color="error">
                  <FavoriteBorderIcon fontSize="large" />
                </Badge>
                <div className="menu_text">Notifications</div>
              </div>
            </MenuItem>
          </Link>

          <Link
            href="/messages"
            variant="body2"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem className="messages" sx={{ backgroundColor: message }}>
              <div className="menu_item">
                <Badge badgeContent={2} color="error">
                  <MarkChatUnreadOutlinedIcon fontSize="large" />
                </Badge>
                <div className="menu_text">Messages</div>
              </div>
            </MenuItem>
          </Link>

          <Link
            variant="body2"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem
              className="create"
              sx={{ backgroundColor: create }}
              onClick={handleOpen}
            >
              <div className="menu_item">
                <AddCircleOutlineOutlinedIcon fontSize="large" />
                <div className="menu_text">Create</div>
              </div>
            </MenuItem>
            <CreatePost open={open} onClose={handleClose} />
          </Link>

          <Link
            href="/profile"
            variant="body2"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem className="profile" sx={{ fontWeight: profile }}>
              <div className="menu_item">
                <Avatar fontSize="small" src={user.pic} />
                <div className="menu_text">Profile</div>
              </div>
            </MenuItem>
          </Link>
          <br></br>
          <MenuItem className="create" onClick={logOutSession}>
            <div className="menu_item">
              <LogoutIcon fontSize="large" sx={{ color: "red" }} />
              <div className="menu_text">Logout</div>
            </div>
          </MenuItem>
        </MenuList>
      </Box>
    </div>
  );
}

export default SideMenu