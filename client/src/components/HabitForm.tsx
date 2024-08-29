import React, { useState } from 'react';
import { IHabit, createHabit } from '../services/habits';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface HabitFormProps {
  onSave: () => void;
}

const HabitForm: React.FC<HabitFormProps> = ({ onSave }) => {
  const [habit, setHabit] = useState<IHabit>({ name: '' });
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHabit((prevHabit) => ({ ...prevHabit, [name]: value }));
    if (e.target.value.trim() !== '') {
      setError(false);  // Reset error if input is not empty
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (habit.name.trim() === '') {
      setError(true);  // Show error if input is empty
      return
    }
    await createHabit(habit);
    setHabit({ name: '' });
    onSave();
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',      // Flexbox container
        alignItems: 'center',
        gap: 1               // Space between elements
      }}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h4" component="h1" sx={{ mb: 2 }} >
        Create your habit here:
      </Typography>
      <TextField
        required
        label="New Habit Name"
        name="name"
        value={habit.name}
        onChange={handleChange}
        error={error}
        helperText={error ? 'Habit name is required' : ''}  // Show error message
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

export default HabitForm;
