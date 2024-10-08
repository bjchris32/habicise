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
  const { isLoggedIn, userBasicInfo, login } = authContext;

  return (
    <Container maxWidth={false} disableGutters>
      <Box
        width="100%"
        justifyContent="center"
        display="flex"
        flexDirection="column"
      >
        {!isLoggedIn ? (
          <Grid
            container
            spacing={2}
            >
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ p: 4 }} style={{ height: '80%' }}>
                <Typography variant="h5" align="center" gutterBottom>
                  Login
                </Typography>
                <LoginForm onSave={login}/>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6}}>
              <Card sx={{ p: 4 }} style={{ height: '80%' }}>
                <Typography variant="h5" align="center" gutterBottom>
                  Sign Up
                </Typography>
                <SignUpForm onSave={login}/>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <>
            <Typography variant="h5" align="center" sx={{ m: 4 }}>
              Welcome! {userBasicInfo?.name}
            </Typography>
            <HabitsWidget/>
          </>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;
