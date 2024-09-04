import React, { useState, useEffect }  from 'react';
import './App.css';
import HabitList from './components/HabitList';
import HabitForm from './components/HabitForm';
import { IHabit, getHabits } from './services/habits';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function App() {
  const [habits, setHabits] = useState<IHabit[]>([]);

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleSave = async () => {
    fetchHabits();
  };

  const fetchHabits = async () => {
    const data = await getHabits();
    setHabits(data);
  };

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
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%" // Ensures the inner Box spans the full width of its parent
        >
          <HabitForm onSave={handleSave} />
          { habits.length > 0 ? <HabitList habits={habits} /> : null }
        </Box>
      </Box>
    </Container>
  );
}

export default App;
