import React, { useState, useEffect } from 'react';
import { IHabit, getHabits } from '../services/habits';

const HabitList = ({}) => {
  const [habits, setHabits] = useState<IHabit[]>([]);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    const data = await getHabits();
    setHabits(data);
  };

  return (
    <div>
      <h1>Habits</h1>
      <ul>
        {habits.map((habit) => (
          <li key={habit._id}>
            {habit.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HabitList;
