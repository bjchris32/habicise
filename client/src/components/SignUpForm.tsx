import React, { useState } from 'react';
import { IAuthInput, registerUser } from '../services/authentications-services';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface SignUpFormProps {
//   onSave: () => void;
}

// const SignUpForm: React.FC<SignUpFormProps> = ({ onSave }) => {
const SignUpForm: React.FC<SignUpFormProps> = () => {
  const initialState = { name: '', email: '', password: '' };
  const [auth, setAuth] = useState<IAuthInput>(initialState);
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuth((prevAuth) => ({ ...prevAuth, [name]: value }));
    if (e.target.value.trim() !== '') {
      setError(false);  // Reset error if input is not empty
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("auth = ", auth);
    await registerUser(auth);
    setAuth(initialState);
    // onSave();
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
        // error={error}
        helperText={error ? 'User Name is required' : ''}
      />
      <TextField
        required
        label="Email"
        name="email"
        value={auth.email}
        onChange={handleChange}
        // error={error}
        helperText={error ? 'Email is required' : ''}
      />
      <TextField
        required
        label="Password"
        name="password"
        value={auth.password}
        onChange={handleChange}
        // error={error}
        helperText={error ? 'Password is required' : ''}
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
