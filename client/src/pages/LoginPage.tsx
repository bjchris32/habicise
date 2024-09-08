import React from 'react';
import { Typography } from '@mui/material';
import LoginForm from '../components/LoginForm'
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSave = async () => {
    navigate('/');
  };

  return (
    <div>
      <Typography variant="h2">Log In Page</Typography>
      <LoginForm onSave={handleSave}/>
    </div>
  );
};

export default LoginPage;
