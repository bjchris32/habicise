import React, { useState } from 'react';
import { IUserRegistrationRequest, registerUser } from '../services/authentications-services';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface SignUpFormProps {
  onSave: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSave }) => {
  const initialState = { name: '', email: '', password: '' };
  const initialError = { name: false, email: false, password: false };
  const [auth, setAuth] = useState<IUserRegistrationRequest>(initialState);
  const [error, setError] = useState(initialError);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuth((prevAuth) => ({ ...prevAuth, [name]: value }));
    if (e.target.value.trim() !== '') {
      setError(initialError);  // Reset error if input is not empty
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (auth.name.trim() === '') {
      setError((prevError) => ({ ...prevError, name: true }));
      return
    }
    if (auth.email.trim() === '') {
      setError((prevError) => ({ ...prevError, email: true }));
      return
    }
    if (auth.password.trim() === '') {
      setError((prevError) => ({ ...prevError, password: true }));
      return
    }
    await registerUser(auth);
    setAuth(initialState);
    onSave();
  };

  return (
    <Box
      component="form"
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
        label="User Name"
        name="name"
        value={auth.name}
        onChange={handleChange}
        error={error.name}
        helperText={error.name ? 'User Name is required' : ''}
      />
      <TextField
        required
        label="Email"
        name="email"
        value={auth.email}
        onChange={handleChange}
        error={error.email}
        helperText={error.email ? 'Email is required' : ''}
      />
      <TextField
        required
        label="Password"
        name="password"
        value={auth.password}
        onChange={handleChange}
        error={error.password}
        helperText={error.password ? 'Password is required' : ''}
      />
      <Button
        type="submit"
        variant="contained"
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUpForm;
