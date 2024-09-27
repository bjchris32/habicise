import React, { useState } from 'react';
import { IHabit, createHabit } from '../services/habits-services';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useMediaQuery, useTheme } from '@mui/material';

interface HabitFormProps {
  onSave: () => void;
}

const HabitForm: React.FC<HabitFormProps> = ({ onSave }) => {
  const [habit, setHabit] = useState<IHabit>({ name: '' });
  const [error, setError] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
        display: 'flex',
        flexDirection: isSmallScreen ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        width: { xs: '90%', sm: '75%' }
      }}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h5">
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
        fullWidth={isSmallScreen} // Make the text field take full width on small screens
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth={isSmallScreen} // Make the button take full width on small screens
      >
        Save
      </Button>
    </Box>
  );
};

export default HabitForm;
