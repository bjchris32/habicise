import React, { useState } from 'react';
import { IHabit, createHabit, updateHabit } from '../services/habits';

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
    if (habit._id) {
      await updateHabit(habit._id, habit);
    } else {
      await createHabit(habit);
    }
    setHabit({ name: '' });
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={habit.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default HabitForm;
