import React, { useState } from 'react';
import { IHabit, createHabit } from '../services/habits';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface HabitFormProps {
  onSave: () => void;
}

const HabitForm: React.FC<HabitFormProps> = ({ onSave }) => {
  const [habit, setHabit] = useState<IHabit>({ name: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHabit((prevHabit) => ({ ...prevHabit, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createHabit(habit);
    setHabit({ name: '' });
    onSave();
  };

  return (
    <>
    <Box
      component="form"
      sx={{
        gap: 1               // Space between elements
      }}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
        <TextField
          required
          label="name"
          value={habit.name}
          onChange={handleChange}
        />

      <Button
        type="submit"
        variant="contained"
      >
        Save
      </Button>
    </Box>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Add your new habit: </label>
      <input
        type="text"
        name="name"
        value={habit.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <Button type="submit" variant="contained">Save</Button>
    </form>
    </>

  );
};

export default HabitForm;
