import React, { useState, useEffect } from 'react';
import { IHabit } from '../services/habits';

interface HabitListProps {
  habits: IHabit[];
}

const HabitList: React.FC<HabitListProps> = ({ habits }) => {
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
