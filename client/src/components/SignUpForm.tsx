import React, { useState } from 'react';
import { IHabit, createHabit } from '../services/habits';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface SignUpFormProps {
//   onSave: () => void;
}

// const SignUpForm: React.FC<SignUpFormProps> = ({ onSave }) => {
const SignUpForm: React.FC<SignUpFormProps> = () => {

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',      // Flexbox container
        alignItems: 'center',
        gap: 1               // Space between elements
      }}
    //   onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <TextField
        required
        label="User Name"
        name="name"
        // value={habit.name}
        // onChange={handleChange}
        // error={error}
        // helperText={error ? 'Habit name is required' : ''}  // Show error message
      />
      <Button
        type="submit"
        variant="contained"
      >
        Save
      </Button>
    </Box>
  );
};

export default SignUpForm;
