import React, { useState, useEffect } from 'react';
import { IHabit } from '../services/habits-services';
import { ICommitsListByDate, getCommitsByDate } from '../services/commits-services';
import Box from '@mui/material/Box';
import CommitList from './CommitList';
import CommitModal from './CommitModal';

interface CommitsWidgetProps {
  habit: IHabit;
}

const CommitsWidget: React.FC<CommitsWidgetProps> = ({ habit }) => {
  const [commitsByDate, setCommitsByDate] = useState<ICommitsListByDate[]>([]);

  useEffect(() => {
    if (!!habit._id) {
      fetchCommitsByDate(habit._id);
    }
  }, []);

  const handleCommitSave = async (habitId: string) => {
    fetchCommitsByDate(habitId);
  };

  const fetchCommitsByDate = async (habitId: string) => {
    const data = await getCommitsByDate(habitId);
    const moment = require('moment');
    // TODO: set more recent dummy date if device screen size is smaller
    const pastDate = moment().subtract(1, 'year').format('YYYY-MM-DD');
    const trackBackdata = [
      // dummy
      {
        date: pastDate, // start
        count: 0,
        level: 0,
      },
      ...data
    ]
    setCommitsByDate(trackBackdata);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      padding={2}
    >
      <CommitModal onSave={handleCommitSave} habit={habit} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <CommitList commitsByDate={commitsByDate} />
      </Box>
    </Box>
  )
}

export default CommitsWidget;
