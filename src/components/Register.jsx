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
import { URL } from "../constants/Constants";

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Create a FormData object to send files and other fields
    const formData = new FormData();
    formData.append("nom", data.get("nom"));
    formData.append("prenom", data.get("prenom"));
    formData.append("telephone", data.get("Phone"));
    formData.append("email", data.get("email"));
    formData.append("willaya", data.get("willaya"));
    formData.append("category", data.get("category"));
    formData.append("password", data.get("password"));
    formData.append("file", data.get("file")); // Append the file

    // Validate password confirmation
    if (data.get("password") !== data.get("cpassword")) {
      setErr("Passwords do not match");
      return;
    }

    try {
      // Send the form data to the backend
      const response = await fetch(URL+"/api/auth/register", {
        method: "POST",
        body: formData, // No need to set Content-Type header for FormData
      });

      const result = await response.json();

      if (response.ok) {
        // Registration successful
        localStorage.setItem("token", result.token);
        navigate("/"); // Navigate to the home page
      } else {
        // Handle errors from the backend
        setErr(result.errors ? result.errors[0].msg : "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setErr("Server error");
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
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="nom"
                label="Name"
                name="nom"
                autoComplete="name"
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                id="prenom"
                label="Prenom"
                name="prenom"
                autoComplete="prenom"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="Phone"
                label="Phone Number"
                name="Phone"
                autoComplete="phone"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="willaya"
                label="Willaya"
                name="willaya"
                autoComplete="willaya"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="category"
                label="Category"
                name="category"
                autoComplete="category"
              />
              <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
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
              <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="cpassword">Confirm Password</InputLabel>
                <OutlinedInput
                  id="cpassword"
                  type={showPassword ? "text" : "password"}
                  name="cpassword"
                  required
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
                  label="Confirm Password"
                />
              </FormControl>
              <input
                type="file"
                id="file"
                name="file"
                accept="image/*"
                style={{ marginTop: 16, marginBottom: 16 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <a href="#" onClick={Login} role="button" tabIndex="0">
                Login
              </a>
            </Box>
            {err && <CollapseItem err={err} />}
          </Box>
          <Copyright sx={{ mt: 4, mb: 2 }} />
        </Container>
      </ThemeProvider>
    </>
  ); 
}