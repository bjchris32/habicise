import React, { useState } from 'react';
import { IUserLoginRequest, IUserLoginResponse, loginUser } from '../services/authentications-services';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface LoginFormProps {
  onSave: (userId?: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSave }) => {
  const initialState = { email: '', password: '' };
  const initialError = { email: false, password: false };
  const [auth, setAuth] = useState<IUserLoginRequest>(initialState);
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
    if (auth.email.trim() === '') {
      setError((prevError) => ({ ...prevError, email: true }));
      return
    }
    if (auth.password.trim() === '') {
      setError((prevError) => ({ ...prevError, password: true }));
      return
    }

    const loginResponse: IUserLoginResponse = await loginUser(auth);
    setAuth(initialState);
    onSave(loginResponse._id);
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
      <Box flexGrow={1} />
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
