import React, { useState } from 'react';
import { IHabit } from '../services/habits';
import { ICommit, createCommit } from '../services/commits';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

interface CommitFormProps {
  onSave: (habitId: string) => void;
  habit: IHabit;
}

const CommitForm: React.FC<CommitFormProps> = ({ onSave, habit }) => {
  const [commit, setCommit] = useState<ICommit>({ description: '', length: 0 });
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCommit((prevCommit) => ({ ...prevCommit, [name]: value }));
    if (e.target.value.trim() !== '') {
      setError(false);  // Reset error if input is not empty
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (commit.description.trim() === '') {
      setError(true);  // Show error if input is empty
      return
    }

    if (!!habit._id) {
      await createCommit({...commit, habit: habit._id});
      setCommit({ description: '', length: 0 });
      onSave(habit._id);
    }
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
      <TextField
        required
        label="Describe what you did today"
        name="description"
        value={commit.description}
        onChange={handleChange}
        error={error}
        helperText={error ? 'Commit description is required' : ''}  // Show error message
      />
      <TextField
        required
        label="time committed in minutes"
        name="length"
        value={commit.length}
        onChange={handleChange}
      />
      <Button
        style={{textTransform: 'none'}}
        type="submit"
      >
        COMMIT to {habit.name}
      </Button>
    </Box>
  );
};

export default CommitForm;
