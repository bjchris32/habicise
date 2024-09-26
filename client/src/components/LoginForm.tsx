import React, { useState } from 'react';
import { IUserLoginRequest, loginUser } from '../services/authentications-services';
import { Button, Box, TextField, Typography } from '@mui/material';

interface LoginFormProps {
  onSave: (userId?: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSave }) => {
  const initialState = { email: '', password: '' };
  const initialError = { email: false, password: false };
  const [auth, setAuth] = useState<IUserLoginRequest>(initialState);
  const [error, setError] = useState(initialError);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuth((prevAuth) => ({ ...prevAuth, [name]: value }));
    if (e.target.value.trim() !== '') {
      setError(initialError);  // Reset error if input is not empty
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    if (auth.email.trim() === '') {
      setError((prevError) => ({ ...prevError, email: true }));
      return
    }
    if (auth.password.trim() === '') {
      setError((prevError) => ({ ...prevError, password: true }));
      return
    }

    try {
      const { _id } = await loginUser(auth);
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
      display="flex"
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
        label="Email"
        name="email"
        value={auth.email}
        onChange={handleChange}
        error={error.email}
        helperText={error.email ? 'Email is required' : ''}
      />
      <TextField
        type="password"
        variant="standard"
        required
        fullWidth
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
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
