import React from 'react';
import { Typography } from '@mui/material';
import LoginForm from '../components/LoginForm'

const LoginPage: React.FC = () => {
  const handleSave = async () => {
    console.log("login the user");
  };

  return (
    <div>
      <Typography variant="h2">Log In Page</Typography>
      <LoginForm onSave={handleSave}/>
    </div>
  );
};

export default LoginPage;
