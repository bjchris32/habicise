import React, { useState, useEffect } from 'react';
import { IHabit } from '../services/habits';
import { ICommitsListByDate, getCommitsByDate } from '../services/commits';
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
    const currentDate = moment().subtract(1, 'year').format('YYYY-MM-DD');
    const trackBackdata = [
      // dummy
      {
        date: currentDate, // start
        count: 0,
        level: 0,
      },
      ...data
    ]
    setCommitsByDate(trackBackdata);
  };

  return (
    <div>
      <CommitModal onSave={handleCommitSave} habit={habit}/>
      <CommitList commitsByDate={commitsByDate}/>
    </div>
  )
}

export default CommitsWidget;
