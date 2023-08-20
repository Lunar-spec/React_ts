import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const FirstPage: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [errors, setErrors] = useState<{ name?: string; phoneNumber?: string; email?: string }>({});

    const validatePhoneNumber = (phone: string) => /^\d{10}$/.test(phone);

    const validateEmail = (email: string) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = {};

        if (!name) {
            setErrors({ ...validationErrors, name: 'Enter a Name' })
            return
        }
        if (!validatePhoneNumber(phoneNumber)) {
            setErrors({ ...validationErrors, phoneNumber: 'Invalid Phone Number' })
            return
        }

        if (!validateEmail(email)) {
            setErrors({ ...validationErrors, email: 'Invalid email format.' });
            return;
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const userDetails = { name, phoneNumber, email };
        // localStorage.removeItem('userDetails')
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        // window.location.reload()
        navigate('/data');
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '70px' }}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <h1 style={{ textAlign: 'center' }}>Enter Your Details</h1>
                <form onSubmit={handleFormSubmit}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.name}
                        helperText={errors.name}
                        required
                    />
                    <TextField
                        label="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber}
                        required
                    />
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email}
                        required
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default FirstPage;
