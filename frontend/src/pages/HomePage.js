import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import Feed from "../components/Feed";
import SideMenu from "../components/SideMenu";
import StatusBar from "../components/StatusBar";
import "./HomePage.css";
import Search from "./../components/Search";
import { UserState } from "./../context/UserProvider";
import VisitorProfile from "../components/VisitorProfile";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

const HomePage = () => {
  const { selectedUser, setSelectedUser } = UserState();
  const [item3Display, setItem3Display] = useState("block");
  const [item2Size, setItem2Size] = useState(6);
  const [verifyState, setVerifyState] = useState(false);
  const [loginData, setLoginData] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [_id, set_Id] = useState(loginData._id);

  const history = useHistory();

  useEffect(() => {
    viewUser();
    verifyUser();
  }, [selectedUser, verifyState]);

  const viewUser = () => {
    if (selectedUser) {
      setItem3Display("none");
      setItem2Size(9);
    } else {
      setItem3Display("block");
      setItem2Size(6);
    }
  };

  const verifyUser = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${loginData.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/user/getSingleUser",
        {
          _id,
        },
        config
      );
      console.log(data);
      console.log("User verified with JWT token");
      setVerifyState(true);
    } catch (error) {
      console.log(error.response.data.error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.error,
      });
      localStorage.removeItem("userInfo");
      history.push("/");
    }
  };
  if (!verifyState) {
    return <div>Verifying user.....</div>;
  } else {
    return (
      <div>
        <Grid container component="main" sx={{ maxHeight: "70vh" }}>
          <Grid item xs={2} sm={2} md={3}>
            <SideMenu data={"home"} />
          </Grid>
          <Grid item xs={6} sm={6} md={item2Size} className="main_content">
            {selectedUser ? (
              <div>
                <VisitorProfile data={selectedUser} />
              </div>
            ) : (
              <div>
                <Search />
                <StatusBar />
                <Feed />
              </div>
            )}
          </Grid>
          <Grid
            item
            xs={4}
            sm={4}
            md={3}
            sx={{ backgroundColor: "whitesmoke", display: item3Display }}
          >
            <Avatar
              alt="Remy Sharp"
              src="https://res.cloudinary.com/cake-lounge/image/upload/v1674887301/surge_image_xveqpt.png"
              sx={{marginLeft:"100px",marginTop:"100px", width:'100px',height:'100px'}}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default HomePage;
