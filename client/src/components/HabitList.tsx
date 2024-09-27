import React from 'react';
import { IHabit } from '../services/habits';
import CommitsWidget from './CommitsWidget';
import { Box, Card, CardContent, CardHeader, List, ListItem } from '@mui/material';

interface HabitListProps {
  habits: IHabit[];
}

const HabitList: React.FC<HabitListProps> = ({ habits }) => {
  return (
    <List sx={{ width: '100%' }}>
      {habits.map((habit) => (
        <ListItem
          key={habit._id}
          sx={{ mb: 2 }}>
            <Card>
              <CardHeader
                title={habit.name}
                sx={{ bgcolor: 'primary.main', color: 'white' }}
              />
              <CardContent>
                <CommitsWidget habit={habit} />
              </CardContent>
            </Card>
        </ListItem>
      ))}
    </List>
  )
}

export default HabitList;
