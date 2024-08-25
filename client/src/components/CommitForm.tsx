import React, { useState } from 'react';
import { IHabit } from '../services/habits';
import { ICommit, createCommit } from '../services/commits';

interface CommitFormProps {
  onSave: (habitId: string) => void;
  habit: IHabit;
}

const CommitForm: React.FC<CommitFormProps> = ({ onSave, habit }) => {
  const [commit, setCommit] = useState<ICommit>({ description: '', length: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCommit((prevCommit) => ({ ...prevCommit, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!!habit._id) {
      await createCommit({...commit, habit: habit._id});
      setCommit({ description: '', length: 0 });
      onSave(habit._id);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="description">Describe what you did: </label>
      <input
        type="text"
        name="description"
        value={commit.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <label htmlFor="length">How long you commited in minutes: </label>
      <input
        type="text"
        name="length"
        value={commit.length}
        onChange={handleChange}
        placeholder="Length"
        required
      />
      <button type="submit">Add Commit</button>
    </form>
  );
};

export default CommitForm;
