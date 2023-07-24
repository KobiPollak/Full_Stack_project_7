    import React from 'react';
    import { TextField, Button, Container } from '@mui/material';
    import Autocomplete from '@mui/lab/Autocomplete';

    const cardTypes = [
    { label: 'Visa', id: 'visa' },
    { label: 'MasterCard', id: 'mastercard' },
    { label: 'American Express', id: 'amex' },
    { label: 'Discover', id: 'discover' },
    { label: 'JCB', id: 'jcb' },
    ];

    const PaymentPage = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle payment logic here
        alert('Payment submitted!');
    };

    return (
        <Container maxWidth="sm">
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
            id="expiration-date"
            label="Expiration Date"
            fullWidth
            required
            />
            <TextField
            id="cvv"
            label="CVV"
            fullWidth
            required
            />

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
        </Container>
    );
    };

    export default PaymentPage;
