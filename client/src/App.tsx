import { useContext }  from 'react';
import './App.css';

import { AppBar, Toolbar, Typography, Button } from '@mui/material';

import { Route, Routes } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import HabitListPage from './pages/HabitListPage';

import { AuthContext } from './contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from './services/authentications-services'

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

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/:userId/habits" element={<HabitListPage />} />
      </Routes>
    </>
  );
}

export default App;
