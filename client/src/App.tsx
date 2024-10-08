import { useContext }  from 'react';
import './App.css';

import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';

import { Route, Routes } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

import { AuthContext } from './contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from './services/authentications-services'

import bannerImage from './banner.jpeg';

function App() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext); // Directly use useContext
  if (!authContext) {
    throw new Error('LoginForm must be used within an AuthProvider');
  }
  const { isLoggedIn, logout } = authContext;

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => navigate('/')}>
            Habicise
          </Typography>
          {isLoggedIn ? (
            <Button color="inherit" onClick={ async () => {
              await logoutUser();
              logout();
              navigate('/')
            }}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate('/signup')}>
                Signup
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: 4,
          textAlign: 'center',
          color: '#ffffff', // Set text color to white for better readability
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Add text shadow for better contrast
        }}
      >
        <Typography variant="h3" sx={{ mb: 2, textAlign: 'center' }}>
          Habicise
          <Typography variant="body1" sx={{ textAlign: 'center', mb: 2 }}>
            Cultivate your new habit in streaks like doing exercise
          </Typography>
        </Typography>
      </Box>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
