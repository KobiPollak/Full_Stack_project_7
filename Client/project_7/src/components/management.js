import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  MenuItem,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Management = () => {
  const { id } = useParams();
  const [newItem, setNewItem] = useState({
    // Initialize state for the form fields
    full_name: "",
    phone: "",
    email: "",
    apartment: "",
    password: "",
  });
  const [userToDelete, setUserToDelete] = useState({ user_id: "" });
  const [propertyOptions, setPropertyOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  axios.defaults.headers.common["authorization"] =
    localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`http://localhost:3100/manager/${id}/allProperties`)
      .then((response) => {
        console.log(response.data);
        setPropertyOptions(response.data);
      });
  }, []);

  const handleSelection = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleInputChange = (e) => {
    setNewItem((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddItem = async () => {
    newItem["property_id"] = selectedOption;
    console.log(newItem);
    try {
      await axios.post("http://localhost:3100/manager/logUpNew", newItem);
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3100/manager/${userToDelete.user_id}/${selectedOption}`
      );
      // fetchData(); // Refresh the data after deleting an item
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" gutterBottom>
        Database Management
      </Typography>
      <Typography variant="h5" gutterBottom>
        Add Data:
      </Typography>
      <Typography variant="h7" gutterBottom>
        Add Tenant:
      </Typography>
      <TextField
        fullWidth
        select
        label="Choose Property ID"
        variant="outlined"
        value={selectedOption}
        onChange={handleSelection}
      >
        {propertyOptions.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.id}, {option.city}, {option.address}
          </MenuItem>
        ))}
      </TextField>
      <Grid item xs={12} sm={6}>
        <TextField
          name="full_name"
          label="Name"
          value={newItem.full_name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          name="phone"
          label="Phone"
          value={newItem.phone}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          name="email"
          label="Email"
          value={newItem.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          name="apartment"
          label="Apartment"
          value={newItem.apartment}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          name="password"
          label="Password"
          value={newItem.password}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddItem}
        fullWidth
      >
        Add
      </Button>
      <Typography variant="h7" gutterBottom>
        delete Tenant:
      </Typography>
      <TextField
        fullWidth
        select
        label="Choose Property ID"
        variant="outlined"
        value={selectedOption}
        onChange={handleSelection}
      >
        {propertyOptions.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.id}, {option.city}, {option.address}
          </MenuItem>
        ))}
      </TextField>
      <Grid item xs={12} sm={6}>
        <TextField
          name="user_id"
          label="user_id"
          value={userToDelete.user_id}
          onChange={(e) => setUserToDelete(e.target.value)}
          fullWidth
          margin="normal"
        />
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={handleDelete}
        fullWidth
      >
        Delete
      </Button>
    </Container>
  );
};

export default Management;