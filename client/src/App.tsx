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
    <Container maxWidth="lg">
      <Box sx={{ my: 10 }}>
        <Typography variant="h3" sx={{ mb: 2 }} >
          Habicise
          <Typography sx={{ color: 'text.secondary' }} >
            cultivate your new habit in streaks like doing exercise
          </Typography>
        </Typography>
        <HabitForm onSave={handleSave}/>
        <HabitList habits={habits}/>
      </Box>
    </Container>
  );
}

export default App;
