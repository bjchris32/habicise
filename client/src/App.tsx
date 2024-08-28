import React, { useState, useEffect }  from 'react';
import './App.css';
import HabitList from './components/HabitList';
import HabitForm from './components/HabitForm';
import { IHabit, getHabits } from './services/habits';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

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
    <Container maxWidth="md">
      <Box sx={{ my: 10 }}>
        <HabitForm onSave={handleSave}/>
        <HabitList habits={habits}/>
      </Box>
    </Container>
  );
}

export default App;
