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
} from '@mui/material';
import axios from 'axios';

const MPayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  axios.defaults.headers.common['authorization'] =
    localStorage.getItem('token');

  const [selectedOption, setSelectedOption] = useState('');
  const [selectedPropertyOption, setSelectedPropertyOption] = useState('');
  const [PropertyOptions, setPropertyOptions] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');

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
      .get(`http://localhost:3100/manager/reportsPayment/${id}`, {
        params: {
          property_id: selectedPropertyOption,
          date: selectedDate ? selectedDate.toISOString() : null,
          type: selectedOption,
          start_year: startYear,
          end_year: endYear,
        },
      })
      .then((response) => {
        setReportData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const options = [
    { value: 'Rent payment', label: 'Rent payment' },
    { value: 'extra payment', label: 'Extra payment' },
  ];

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Payments</Typography>
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
            md={4}
          >
            <TextField
              label="Start Year"
              variant="outlined"
              value={startYear}
              type="number"
              inputProps={{
                maxLength: 4,
                inputMode: 'numeric',
                min: 2020,
                max: 9999,
              }}
              onChange={(e) => setStartYear(e.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            {/* Add other TextFields here with the desired width */}
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            {/* Add other TextFields here with the desired width */}
          </Grid>
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
          <Grid
            item
            xs={12}
          >
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Payment ID</TableCell>
                    <TableCell>Tenant ID</TableCell>
                    <TableCell>Month</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell>Card Type</TableCell>
                    <TableCell>Card Number</TableCell>
                    <TableCell>Card Holder Name</TableCell>
                    <TableCell>Expiration Month</TableCell>
                    <TableCell>Expiration Year</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reportData.map((payment) => (
                    <TableRow key={payment.payment_id}>
                      <TableCell>{payment.payment_id}</TableCell>
                      <TableCell>{payment.tenant_id}</TableCell>
                      <TableCell>{payment.month}</TableCell>
                      <TableCell>{payment.reason}</TableCell>
                      <TableCell>{payment.card_type}</TableCell>
                      <TableCell>{payment.card_number}</TableCell>
                      <TableCell>{payment.card_holder_name}</TableCell>
                      <TableCell>{payment.expiration_month}</TableCell>
                      <TableCell>{payment.expiration_year}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default MPayment;