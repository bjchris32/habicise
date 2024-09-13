import React from 'react';
import { Typography } from '@mui/material';
import SignUpForm from '../components/SignUpForm'
import { useNavigate } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSave = async (userId?: string) => {
    // TODO: redirect to user's habit summary
    navigate('/');
  };

  return (
    <div>
      <Typography variant="h2">Sign Up Page</Typography>
      <SignUpForm onSave={handleSave}/>
    </div>
  );
};

export default SignUpPage;
