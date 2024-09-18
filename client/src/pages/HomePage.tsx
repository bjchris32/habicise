import React, { useState, useEffect, useContext }  from 'react';
import { Container, Box, Card, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { AuthContext } from '../contexts/AuthContext';
import SignUpForm from '../components/SignUpForm'
import LoginForm from '../components/LoginForm'
import HabitsWidget from '../components/HabitsWidget'

const HomePage: React.FC = () => {
  const authContext = useContext(AuthContext); // Directly use useContext
  if (!authContext) {
    throw new Error('LoginForm must be used within an AuthProvider');
  }
  const { isLoggedIn, login } = authContext;

  return (
    <Container maxWidth={false}>
      <Box
        width="100%"
        bgcolor="lightblue"
        alignItems="center"
        justifyContent="center"
        display="flex"
        flexDirection="column"
        sx={{ my: 10 }}>
        <Typography variant="h3" sx={{ mb: 2, textAlign: 'center' }}>
          Habicise
          <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center', mb: 4 }}>
            Cultivate your new habit in streaks like doing exercise
          </Typography>
        </Typography>
        {!isLoggedIn ? (
          <Grid container spacing={2} columns={16}>
            <Grid size={8}>
              <Card sx={{ p: 4 }}>
                <Typography variant="h5" align="center" gutterBottom>
                  Sign Up
                </Typography>
                <SignUpForm onSave={login}/>
              </Card>
            </Grid>
            <Grid size={8}>
              <Card sx={{ p: 4 }}>
                <Typography variant="h5" align="center" gutterBottom>
                  Login
                </Typography>
                <LoginForm onSave={login}/>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <>
            <Typography variant="h5" align="center" sx={{ mt: 4 }}>
              Welcome!
            </Typography>
            <HabitsWidget/>
          </>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;
