import React, { useContext } from 'react';
import { Typography } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import HabitsWidget from '../components/HabitsWidget'

const HabitListPage: React.FC = () => {
  // TODO: check isLoggedIn before showing the habit list
  const authContext = useContext(AuthContext); // Directly use useContext
  if (!authContext) {
    throw new Error('LoginForm must be used within an AuthProvider');
  }
  const { isLoggedIn, login } = authContext;

  return (
    <div>
      <Typography variant="h2">Habit list</Typography>
      <HabitsWidget userId='mockUserId'/>
    </div>
  );
};

export default HabitListPage;
