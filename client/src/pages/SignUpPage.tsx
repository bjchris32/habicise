import React from 'react';
import { Typography } from '@mui/material';
import SignUpForm from '../components/SignUpForm'

const SignUpPage: React.FC = () => {
  return (
    <div>
      <Typography variant="h2">Sign Up Page</Typography>
      <SignUpForm/>
    </div>
  );
};

export default SignUpPage;
