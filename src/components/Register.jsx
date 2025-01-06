import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CollapseItem from "./CollapseItem";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      Created by Cherair Nadir
      {" © "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //console.log(data)
    //email/Phone/cpassword/password
    const email = data.get("email");
    const Phone = data.get("Phone");
    const password = data.get("password");
    const cpassword = data.get("cpassword");
    if (email.length >=1 && Phone.length >=1 && password.length >=1 && cpassword.length >=1 && password === cpassword) {
      localStorage.setItem("token", "Hello World");
      navigate("/");
    } else {
      setErr("Please Enter Correct Informations");
    }
  };


  const Login = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              validate="true"
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
                autoFocus
              />
                <TextField
                margin="normal"
                required
                fullWidth
                id="Phone"
                label="Phone Number"
                name="Phone"
                autoComplete="Phone"
                autoFocus
              />

              
              <FormControl sx={{ mt: 2, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <FormControl sx={{ mt: 2, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  name="cpassword"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="cPassword"
                  autoComplete="Phone"
                autoFocus
                />
              </FormControl>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <a href="#" onClick={Login} role="button" tabIndex="0">
                Login
              </a>
            </Box>
            {err === "" ? "" : (<CollapseItem err={err} />)}
          </Box>
          <Copyright sx={{ mt: 4, mb: 2 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}
