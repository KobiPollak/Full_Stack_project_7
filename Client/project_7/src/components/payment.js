import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  CssBaseline,
} from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import Avatar from '@mui/material/Avatar';

import Grid from '@mui/material/Grid';

import Autocomplete from '@mui/lab/Autocomplete';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const cardTypes = [
  { label: 'Visa', id: 'visa' },
  { label: 'MasterCard', id: 'mastercard' },
  { label: 'American Express', id: 'amex' },
  { label: 'Discover', id: 'discover' },
  { label: 'JCB', id: 'jcb' },
];

const PaymentPage = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const { id } = useParams();

  const navigate = useNavigate();
  const defaultTheme = createTheme();

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Create a new Date object
    const currentDate = new Date();

    // Get the month name using toLocaleString()
    const monthName = currentDate.toLocaleString('en-US', { month: 'long' });

    // Get the year
    const year = currentDate.getFullYear();

    // Format the month and year as "Month Year" (e.g., "July 2023")
    const formattedMonth = `${monthName} ${year}`;

    console.log(formattedMonth);
    // Extract the values from the form inputs
    const cardType = event.target['card-type-input'].value;
    const cardHolderName = event.target['card-holder-name'].value;
    const expirationYear = event.target['expiration-year'].value;
    const expirationMonth = event.target['expiration-month'].value;
    const cardNumber = event.target['card-number'].value;
    const cvv = event.target['cvv'].value;
    const amount = event.target['amount'].value;

    // The 'selectedValue' state already contains the selected reason for payments
    const reason = selectedValue;
    async function fetchUserData() {
      axios
        .post('http://localhost:3100/users/payment', {
          id: id,
          cardNumber: cardNumber,
          cardType: cardType,
          cardHolderName: cardHolderName,
          expirationYear: expirationYear,
          expirationMonth: expirationMonth,
          cvv: cvv,
          amount: amount,
          reason: reason,
          formattedMonth: formattedMonth,
        })
        .then((user) => {
          navigate(`/application/${id}/goodPayment`);
        })
        .catch((err) => alert(err));
    }
    fetchUserData();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        spacing={0}
        // direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          //   minHeight: '100vh',
          padding: '0 25%', // Set left and right padding to 25%
        }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PaymentIcon />
          </Avatar>
          <form onSubmit={handleSubmit}>
            <Autocomplete
              id="card-type"
              options={cardTypes}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                {...params}
                label="Card Type"
                fullWidth
                required
                inputProps={{
                  ...params.inputProps,
                  id: 'card-type-input',
                }}
                />
                )}
                />
    
                <TextField
                  id="card-number"
                  label="Card Number"
                  fullWidth
                  required
                />
    
                <TextField
                  id="card-holder-name"
                  label="Card Holder Name"
                  fullWidth
                  required
                />
    
                <TextField
                id="expiration-year"
                label="Expiration Year"
                fullWidth
                required
                type="number" // Set the type as "number" to accept only numbers
                inputProps={{
                  maxLength: 4, // Limit input to 4 characters for year
                  inputMode: 'numeric',
                  min: 1, // Set the minimum value to 1
                  max: 9999, // Set the maximum value to 9999
                }}
              />
  
              <TextField
               id="expiration-month"
               label="Expiration Month"
               fullWidth
               required
               type="number" // Set the type as "number" to accept only numbers
               inputProps={{
                 maxLength: 2, // Limit input to 2 characters for month
                 inputMode: 'numeric',
                 min: 1, // Set the minimum value to 1
                 max: 12, // Set the maximum value to 12
               }}
             />
 
             <TextField
                id="cvv"
                label="CVV"
                fullWidth
                required
              />
  
              <TextField
               id="amount"
               label="Amount to Pay"
               fullWidth
               required
               type="number" // Set the type as "number" to accept only numbers
               inputProps={{
                 inputMode: 'numeric', // Enforce numeric input on mobile devices that support it
               }}
             />
 
             <FormControl
               fullWidth
               variant="outlined"
             >
               <InputLabel>Reason for payments</InputLabel>
               <Select
                 value={selectedValue}
                 onChange={handleSelectChange}
                 label="Reason for payments"
               >
                 <MenuItem value="">None</MenuItem>
                 <MenuItem value="extra payment">extra payment</MenuItem>
                 <MenuItem value="basepayment">basepayment</MenuItem>
               </Select>
             </FormControl>
 
             <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                id="submit-payment-btn"
              >
                   Submit Payment
            </Button>
            </form>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default PaymentPage;