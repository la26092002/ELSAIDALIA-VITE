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
import CollapseItem from "../../CollapseItem";
import { URL } from "../../../constants/Constants";


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

export default function Login() {
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
    const phone = data.get("phone");
    const password = data.get("password");

    try {
      const response = await fetch(URL+"/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          numberPhone: phone,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const result = await response.json();
      localStorage.setItem("tokenAdmin", result.token); // Assuming the API returns a token
      navigate("/admin");
    } catch (error) {
      setErr("Please enter correct email or password");
    }
  };

  const Register = (event) => {
    event.preventDefault();
    navigate("/register");
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
              Login Admin
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
                id="phone"
                label="Numero de Telephone"
                name="phone"
                autoComplete="phone"
                autoFocus
              />
              <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              
            </Box>
            {err === "" ? "" : <CollapseItem err={err} />}
          </Box>
          <Copyright sx={{ mt: 4, mb: 2 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}
