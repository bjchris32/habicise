import React, { useState, useEffect }  from 'react';
import HabitList from './HabitList';
import HabitForm from './HabitForm';
import { IHabit, getHabits } from '../services/habits-services';
import { Box } from '@mui/material';

const HabitsWidget: React.FC = () => {
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
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%" // Ensures the inner Box spans the full width of its parent
    >
      <HabitForm onSave={handleSave} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ mr: 2, width: { xs: '90%', sm: '75%' } }}
      >
        { habits.length > 0 ? <HabitList habits={habits} /> : null }
      </Box>
    </Box>
  )

}

export default HabitsWidget;
