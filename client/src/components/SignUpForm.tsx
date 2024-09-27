import React, { useState } from 'react';
import { IUserRegistrationRequest, registerUser } from '../services/authentications-services';
import { Button, Box, TextField, Typography } from '@mui/material';

interface SignUpFormProps {
  onSave: (userId?: string) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSave }) => {
  const initialState = { name: '', email: '', password: '' };
  const initialError = { name: false, email: false, password: false };
  const [auth, setAuth] = useState<IUserRegistrationRequest>(initialState);
  const [error, setError] = useState(initialError);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuth((prevAuth) => ({ ...prevAuth, [name]: value }));
    if (e.target.value.trim() !== '') {
      setError(initialError);  // Reset error if input is not empty
    }
  };

  const checkEmptyField = (field: keyof IUserRegistrationRequest) => {
    if (auth[field].trim() === '') {
      setError((prevError) => ({ ...prevError, [field]: true }));
      return true;
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    const fields: (keyof IUserRegistrationRequest)[] = ['name', 'email', 'password'];
    for (const field of fields) {
      if (checkEmptyField(field)) {
        return;
      }
    }

    try {
      const { _id } = await registerUser(auth);
      setAuth(initialState);
      onSave(_id);
    } catch(error: any) {
      setErrorMessage(error.response?.data?.message || 'Something went wrong!');
      return
    }
  };

  return (
    <Box
      component="form"
      flexDirection="column"
      width="100%"
      sx={{
        display: 'flex',      // Flexbox container
        alignItems: 'center',
        gap: 1               // Space between elements
      }}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <TextField
        required
        variant="standard"
        fullWidth
        label="User Name"
        name="name"
        value={auth.name}
        onChange={handleChange}
        error={error.name}
        helperText={error.name ? 'User Name is required' : ''}
      />
      <TextField
        required
        variant="standard"
        fullWidth
        label="Email"
        name="email"
        value={auth.email}
        onChange={handleChange}
        error={error.email}
        helperText={error.email ? 'Email is required' : ''}
      />
      <TextField
        fullWidth
        variant="standard"
        type="password"
        required
        label="Password"
        name="password"
        value={auth.password}
        onChange={handleChange}
        error={error.password}
        helperText={error.password ? 'Password is required' : ''}
      />
      {errorMessage && (
        <Box my={2}>
          <Typography color="error" variant="body2">
            {errorMessage}
          </Typography>
        </Box>
      )}
      <Button
        fullWidth
        type="submit"
        variant="contained"
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUpForm;
