import React, { useState, useEffect }  from 'react';
import logo from './logo.svg';
import './App.css';
import HabitList from './components/HabitList';
import HabitForm from './components/HabitForm';
import { IHabit, getHabits } from './services/habits';

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
    <div>
      <HabitForm onSave={handleSave}/>
      <HabitList habits={habits}/>
    </div>
  );
}

export default App;
