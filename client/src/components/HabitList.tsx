import React, { useState, useEffect } from 'react';
import { IHabit } from '../services/habits';
import CommitsWidget from './CommitsWidget';

interface HabitListProps {
  habits: IHabit[];
}

const HabitList: React.FC<HabitListProps> = ({ habits }) => {
  return (
    <div>
      <ol>
        {habits.map((habit) => (
          <li key={habit._id}>
            <h2>{habit.name}</h2>
            <CommitsWidget habit={habit}/>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default HabitList;
