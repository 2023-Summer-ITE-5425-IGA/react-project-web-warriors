import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import decode from "jwt-decode";

import { SERVER_PORT } from "../config";

// imports for mui
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [validationError, setValidationError] = useState("");

  const { name, email, password, password2 } = formData;

  const onChange = (e : any) => {
    setValidationError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(e.target.value);
    // console.log(formData);
    // console.log("password is " + password);
    // console.log("password2 is " + e.target.value);
    // console.log("validation error is " + validationError);

    //check length of password to be atleast 6 characters long 
    //important: using e.target.value from form submission instead of password(formData.password) Why?
    //its because setFormData is asynchronous which only gets updated after the end of onChange function execution
    // this means if password is 123456, formData.password stores 12345 (not the latest value) in comparison to e.target.value storing 123456
    if (e.target.name==="password" && e.target.value.length < 6) {
      setValidationError("Password should be at least 6 characters long!");
      return;
    }
    //for the 2nd password field as well, since we need to check for length when this is updated as well
    if (e.target.name==="password2" && e.target.value.length < 6) {
      setValidationError("Password should be at least 6 characters long!");
      return;
    }
    
    // check both passwords match
    if (e.target.name==="password2" && e.target.value !== password) {
      setValidationError("Passwords must match!");
      return;
    }

  };

  const onSubmit = async (e : any) => {
    e.preventDefault();
    
    console.log("validate error on submit function " + validationError);
    //don't let the user submit the registration form if there is any validation error
    if (validationError!=="") {return};

    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let data = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `http://localhost:${SERVER_PORT}/api/user`,
        data,
        config
      );
      localStorage.setItem("token", response.data.token);
      let decodeddata = decode(response.data.token);
      console.log(decodeddata);
      //Store something in localstorage so that we can use it in the login page to indicate successful registration
      localStorage.setItem("isJustRegistered", "true");
      // Redirect to '/flowers' after successful registration
      navigate("/login");
    } catch (e) {
      console.log("error ", e);
    }
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
          <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  label="Name"
                  name="name"
                  value={name}
                  onChange={(e) => onChange(e)}
                  required
                  autoFocus
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => onChange(e)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={(e) => onChange(e)}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            {validationError && (
              <Typography variant="body2" color="error" align="center">
                {validationError}
              </Typography>
            )}
            <Button
              type="submit"
              onSubmit={(e) => onSubmit(e)}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
          <p>
            Already have an account? <NavLink to="/login">Sign In</NavLink>
          </p>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
