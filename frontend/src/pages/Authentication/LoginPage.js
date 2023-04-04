import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import validator from "validator";
import Swal from "sweetalert2";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ReCAPTCHA from "react-google-recaptcha";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const theme = createTheme();

function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [capcha, setCapcha] = useState(false);
  const [open, setOpen] = useState(false);

  const history = useHistory();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async (event) => {
    var isSuccess = true;
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!capcha) {
      setOpen(true);
    }

    if (!validator.isEmail(data.get("email"))) {
      isSuccess = false;
      Swal.fire({
        title: "Error!",
        text: "Please enter valid email !!!",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "red",
      });
    }

    if (!data.get("password")) {
      isSuccess = false;
      Swal.fire({
        title: "Error!",
        text: "Please enter password !!!",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "red",
      });
    }

    if (isSuccess && capcha) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "/api/user/login",
          {
            email,
            password,
          },

          config
        );
        console.log(data);

        localStorage.setItem("userInfo", JSON.stringify(data));
        console.log(data.token);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login success",
          showConfirmButton: false,
          timer: 1500,
        });

        history.push("/home");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.error,
          footer: '<a href="">Why do I have this issue?</a>',
        });

        console.log(`Error occured ${error.response.data.message}`);
        console.log(error.response);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={6}
          md={7}
          component={Paper}
          elevation={6}
          square
          sx={{
            backgroundImage:
              "url(https://res.cloudinary.com/cake-lounge/image/upload/v1674501708/surge-global-featured_qyqzmi.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              Re-capcha failed!!!
            </Alert>
          </Snackbar>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                variant="standard"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                sx={{ width: "100%", marginTop: "40px" }}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
                name="password"
                variant="standard"
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <ReCAPTCHA
                sitekey="6Le_xTAkAAAAAMO9nWeylTQma2TBlFrUzDb9GXmw"
                style={{ marginTop: "20px" }}
                onChange={(e) => setCapcha(true)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs sx={{ marginRight: "150px" }}>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          xs={false}
          sm={6}
          md={5}
          sx={{
            backgroundColor: "white",
          }}
        >
          <h1 style={{ fontWeight: "bold", marginTop: "200px" }} id="banner_id">
            Surge SE Internship
          </h1>
          <h2
            style={{
              fontWeight: "lighter",
              marginRight: "160px",
              marginTop: "-20px",
            }}
          >
            March 2023
          </h2>
          <h1 style={{ fontWeight: "bold", marginRight: "50px" }} id="banner_name">
            Sahan Randika
          </h1>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default LoginPage;
