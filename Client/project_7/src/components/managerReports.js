import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
} from '@mui/material';
import axios from 'axios';

const MReports = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  axios.defaults.headers.common['authorization'] =
    localStorage.getItem('token');

  const [selectedOption, setSelectedOption] = useState('');
  const [selectedPropertyOption, setSelectedPropertyOption] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [PropertyOptions, setPropertyOptions] = useState([]);
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3100/manager/${id}/allProperties`)
      .then((response) => {
        setPropertyOptions(response.data);
      });
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handlePropertyOptionChange = (event) => {
    setSelectedPropertyOption(event.target.value);
  };

  const handleFormSubmit = () => {
    axios
    .get(`http://localhost:3100/manager/reportsData/${id}`, {
        params: {
          property_id: selectedPropertyOption,
          status: 'Open',
          type: selectedOption,
        },
      })
      .then((response) => {
        setReportData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleStatusChange = (reportId, status) => {
    axios
      .put(`http://localhost:3100/manager/updateReportStatus/${reportId}`, {
        status: status,
      })
      .then((response) => {
        // Handle the response if needed
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    handleFormSubmit();
  };

  const options = [
    { value: 'maintenance', label: 'Maintenance fault' },
    { value: 'cleaning', label: 'Cleaning fault' },
    { value: 'special', label: 'Special request' },
  ];

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Reports</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={12}
          >
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
                <MenuItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              label="Choose Property ID"
              variant="outlined"
              value={selectedPropertyOption}
              onChange={handlePropertyOptionChange}
            >
              {PropertyOptions.map((option) => (
                <MenuItem
                  key={option.id}
                  value={option.id}
                >
                  {option.id}, {option.city}, {option.address}
                </MenuItem>
              ))}
            </TextField>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFormSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Container>

      {reportData.length > 0 && (
        <Container maxWidth="md">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Property ID</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Date Reported</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Image Path</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportData.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.property_id}</TableCell>
                    <TableCell>{report.description}</TableCell>
                    <TableCell>{report.date_reported}</TableCell>
                    <TableCell>
                      <Select
                        value={report.status}
                        onChange={(event) =>
                          handleStatusChange(report.id, event.target.value)
                        }
                      >
                        <MenuItem value="Open">Open</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Closed">Closed</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>{report.location}</TableCell>
                    <TableCell>{report.image_path}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
           {/* <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateStatus}
          >
            Update Status
          </Button> */}
        </Container>
      )}
    </div>
  );
};

export default MReports;