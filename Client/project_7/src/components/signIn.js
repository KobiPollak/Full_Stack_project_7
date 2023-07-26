import * as React from "react";
import axios from "axios";
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
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();

  const [manager, setManager] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!email || !password) {
      alert("Please fill in all the required fields.");
      return;
    }

    async function fetchUserData() {
      axios
        .post("http://localhost:3100/users/login", {
          email: email,
          password: password,
        })
        .then((user) => {
          console.log(user.data);
          localStorage.setItem(`${user.data.email}`, user.data.accessToken);
          navigate(`/application/${user.data.id}`);
        })
        .catch((err) => alert(err));
    }

    async function fetchManagerData() {
      axios
        .post("http://localhost:3100/manager/login", {
          email: email,
          password: password,
        })
        .then((user) => {
          console.log(user.data);
          localStorage.setItem(`${user.data.email}`, user.data.accessToken);
          navigate(`/m-application/${user.data.id}`);
        })
        .catch((err) => alert(err));
    }
    if (manager) {
      fetchManagerData();
    } else {
      fetchUserData();
    }
  };

  const handleNavigation = (type) => {
    if (type === "signUp") {
      navigate("/signUp");
    } else {
      navigate();
    }
  };

  const handleManagementCheckboxClick = () => {
    setManager(!manager);
  };

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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
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
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="management"
                  color="primary"
                  onClick={handleManagementCheckboxClick}
                />
              }
              label="management?"
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
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link
                  style={{ cursor: "pointer" }}
                  onClick={() => handleNavigation("signUp")}
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
