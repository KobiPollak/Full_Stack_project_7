import React, { useState } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  Grid,
  MenuItem,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import axios from "axios";
// import { makeStyles } from "@mui/styles";

const Reports = () => {
  const { id } = useParams();
  //   const classes = useStyles();
  //   const theme = createTheme({
  //     fileInput: {
  //       display: "none", // Hide the default file input
  //     },
  //     dropArea: {
  //       border: "2px dashed #ccc",
  //       borderRadius: 1,
  //       padding: 2,
  //       textAlign: "center",
  //       cursor: "pointer",
  //     },
  //   });

  const [selectedOption, setSelectedOption] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (event) => {
    if (event.target.name === "location") {
      setLocation(event.target.value);
    } else if (event.target.name === "description") {
      setDescription(event.target.value);
    }
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setSelectedImage(event.dataTransfer.files[0]);
  };

  const handleGenerateReport = () => {
    // Handle the logic to generate the report with the selectedOption, input1Value, input2Value, and selectedImage
    // const formData = new FormData();
    // formData.append("image", selectedImage);
    // formData.append("additionalData", {
    //   id: id,
    //   location: location,
    //   description: description,
    //   type: selectedOption,
    // });
    // const data = {
    //   image: selectedImage,
    //   id: id,
    //   location: location,
    //   description: description,
    //   type: selectedOption,
    // };
    // console.log(data);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result.split(",")[1];
      const data = {
        image: base64Image,
        id: id,
        location: location,
        description: description,
        type: selectedOption,
      };
      // Send the base64-encoded image to the server
      axios
        .post("http://localhost:3100/users/report", data)
        .then((response) => {
          // Handle the response from the server if needed
          console.log(response.data);
        });
    };
    reader.readAsDataURL(selectedImage);
    // axios.post("http://localhost:3100/users/report", data).then((response) => {
    //   console.log(response.data);
    // });

    console.log("Generating report...");
  };

  const options = [
    { value: "maintenance", label: "Maintenance fault" },
    { value: "cleaning", label: "Cleaning fault" },
    { value: "special", label: "Special request" },
  ];

  return (
    <div>
      <AppBar position="static"></AppBar>
      <Typography variant="h6">Reports</Typography>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* Dropdown to choose from a list */}
            <TextField
              fullWidth
              select
              label="Choose from a list"
              variant="outlined"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            {/* More input fields for additional information */}
            <TextField
              fullWidth
              label="Location"
              name="location"
              variant="outlined"
              value={location}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              variant="outlined"
              value={description}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            {/* Drag and drop area for the image */}
            <div onDragOver={handleDragOver} onDrop={handleDrop}>
              Drag & drop an image here or{" "}
              <label htmlFor="image-upload">choose a file</label>
              <input
                type="file"
                accept="image/*"
                id="image-upload"
                onChange={handleImageChange}
              />
            </div>
          </Grid>
        </Grid>
        <Button
          style={{ marginTop: "10px" }}
          size="large"
          variant="contained"
          color="primary"
          onClick={handleGenerateReport}
        >
          Generate Report
        </Button>
      </Container>
    </div>
  );
};

export default Reports;
