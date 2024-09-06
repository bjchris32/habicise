import React from 'react';
import { Typography } from '@mui/material';
import SignUpForm from '../components/SignUpForm'

const SignUpPage: React.FC = () => {
  const handleSave = async () => {
    console.log("sign up the user");
  };

  return (
    <div>
      <Typography variant="h2">Sign Up Page</Typography>
      <SignUpForm onSave={handleSave}/>
    </div>
  );
};

export default SignUpPage;
