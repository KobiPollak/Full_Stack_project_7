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
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  Modal,
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
  const [selectedStatusOption, setSelectedStatusOption] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);

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

  const handleStatusOptionChange = (event) => {
    setSelectedStatusOption(event.target.value);
  };

  const handleFormSubmit = () => {
    axios
      .get(`http://localhost:3100/manager/reportsData/${id}`, {
        params: {
          property_id: selectedPropertyOption,
          status: selectedStatusOption,
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

  async function handleStatusChange(reportId, status) {
    await axios
      .put(`http://localhost:3100/manager/updateReportStatus/${reportId}`, {
        status: status,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    handleFormSubmit();
  }

  const options = [
    { value: 'maintenance', label: 'Maintenance fault' },
    { value: 'cleaning', label: 'Cleaning fault' },
    { value: 'special', label: 'Special request' },
  ];

  const status_option = [
    { value: 'Open', label: 'Open' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Closed', label: 'Closed' },
  ];

  const handleOpenModal = (report) => {
    setSelectedReport(report);
  };

  const handleCloseModal = () => {
    setSelectedReport(null);
  };

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
            <TextField
              fullWidth
              select
              label="Choose from a list"
              variant="outlined"
              value={selectedOption}
              onChange={handleOptionChange}
              style={{ width: '100%' }} // Set a fixed width for the text field
            >
              {options.map((option) => (
                <MenuItem
                  style={{ width: '100%' }}
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
              style={{ width: '100%' }} // Set a fixed width for the text field
            >
              {PropertyOptions.map((option) => (
                <MenuItem
                  style={{ width: '100%' }}
                  key={option.id}
                  value={option.id}
                >
                  {option.id}, {option.city}, {option.address}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              label="Status"
              value={selectedStatusOption}
              onChange={handleStatusOptionChange}
              variant="outlined"
              style={{ width: '100%' }} // Set a fixed width for the text field
            >
              {status_option.map((option) => (
                <MenuItem
                  style={{ width: '100%' }}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFormSubmit}
              style={{ width: '100%' }} // Set a fixed width for the button
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Container>

      {reportData.length > 0 && (
        <Container maxWidth="md">
          <TableContainer
            component={Paper}
            style={{ maxHeight: '400px', overflowY: 'auto' }}
          >
            <Table style={{ tableLayout: 'fixed' }}>
              <TableHead>
                <TableRow>
                  <TableCell>Property ID</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Date Reported</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Image</TableCell>
                  {/* Change the header to 'Image' */}
                </TableRow>
              </TableHead>
              <TableBody>
                {reportData.map((report) => (
                  <TableRow key={report.fault_id}>
                    <TableCell>{report.property_id}</TableCell>
                    <TableCell>{report.description}</TableCell>
                    <TableCell>{report.date_reported}</TableCell>
                    <TableCell>
                      <Select
                        value={report.status}
                        onChange={(event) =>
                          handleStatusChange(
                            report.fault_id,
                            event.target.value
                          )
                        }
                      >
                        {status_option.map((option) => (
                          <MenuItem
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>{report.location}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleOpenModal(report)}>
                        View Image
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      )}

      {/* Modal Dialog to display the image */}
      <Modal
        open={!!selectedReport}
        onClose={handleCloseModal}
      >
        <div>
          {selectedReport && selectedReport.image && (
            <img
              src={selectedReport.image}
              alt="Report"
              style={{ maxWidth: '100%' }}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default MReports;