// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";

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

// import "../styles/login.css";

// const LogUp = () => {
//   const [formValue, setFormValues] = useState({
//     username: "",
//     password: "",
//     name: "",
//     email: "",
//     phone: "",
//     streetName: "",
//     hoseNumber: "",
//     apartment: "",
//   });
//   const [data, setData] = useState();
//   const navigate = useNavigate();

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormValues((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const handleNavigation = (event) => {
//     console.log(event.target.name);
//     if (event.target.name === "up") {
//       navigate("/register");
//     } else {
//       navigate("/login");
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const user = {
//       username: formValue.username,
//       password: formValue.password,
//       name: formValue.name,
//       email: formValue.email,
//       phone: formValue.phone,
//       address: formValue.address,
//       website: formValue.website,
//       company: formValue.company,
//     };

//     async function fetchData(user) {
//       console.log(user);
//       await fetch(`http://localhost:3070/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(user),
//       })
//         .then((response) => response.json())
//         .then((rUser) => {
//           if (rUser.length === 0) {
//             throw "username or password wrong. 000";
//           } else {
//             localStorage.setItem("user", JSON.stringify(rUser));
//             console.log("navigate");
//             navigate(`/application/${rUser.name}`);
//           }
//         })
//         .catch((err) => alert(err));
//     }
//     fetchData(user);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <form onSubmit={handleSubmit} className="form-box" style={{ top: "80%" }}>
//         <div class="btn-field">
//           <button
//             type="button"
//             id="signup"
//             name="up"
//             onClick={handleNavigation}
//           >
//             Sign Up
//           </button>
//           <button
//             type="button"
//             class="disable"
//             id="signin"
//             name="in"
//             onClick={handleNavigation}
//           >
//             Sign In
//           </button>
//         </div>
//         <label>
//           Name:
//           <input
//             type="text"
//             name="name"
//             className="input-field"
//             value={formValue.name}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Email:
//           <input
//             type="email"
//             name="email"
//             className="input-field"
//             value={formValue.email}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Phone:
//           <input
//             type="text"
//             name="phone"
//             className="input-field"
//             value={formValue.phone}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Address:
//           <input
//             type="text"
//             name="address"
//             className="input-field"
//             value={formValue.address}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Website:
//           <input
//             type="text"
//             name="website"
//             className="input-field"
//             value={formValue.website}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Company:
//           <input
//             type="text"
//             name="company"
//             className="input-field"
//             value={formValue.company}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Username:
//           <input
//             type="text"
//             required
//             name="username"
//             className="input-field"
//             value={formValue.username}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input
//             type="password"
//             required
//             name="password"
//             className="input-field"
//             value={formValue.password}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <div className="connect">
//           <button type="submit" className="connect">
//             Log in
//           </button>
//         </div>
//       </form>
//     </motion.div>
//   );
// };

// export default LogUp;

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const fullName = event.target.fullName.value;
    const phoneNumber = event.target.phoneNumber.value;
    const address = event.target.address.value;
    const city = event.target.city.value;
    const apartment = event.target.apartment.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(
      fullName,
      phoneNumber,
      address,
      city,
      apartment,
      email,
      password
    );
    if (
      !email ||
      !password ||
      !address ||
      !city ||
      !apartment ||
      !fullName ||
      !phoneNumber
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    async function fetchData() {
      axios
        .post("http://localhost:3100/users/logUp", {
          email: email,
          password: password,
          fullName: fullName,
          address: address,
          city: city,
          apartment: apartment,
          phoneNumber: phoneNumber,
        })
        .then((user) => {
          console.log(user.data);
          localStorage.setItem(`${user.data.id}`, user.data.accessToken);
          navigate(`/application/${user.data.id}`);
        })
        .catch((err) => console.log(err));
    }
    fetchData();

    // alert("submited");
    // const data = new FormData(event.currentTarget);
    // console.log(data);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    //   address: data.get("address"),
    // });
  };

  const handleNavigation = () => {
    navigate("/signIn");
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="full-name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phone-number"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="address"
                  name="address"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="apartment"
                  label="Apartment"
                  name="apartment"
                  autoComplete="apartment"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="city"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-start">
              <Grid item>
                <Link
                  style={{ cursor: "pointer" }}
                  onClick={handleNavigation}
                  variant="body2"
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
