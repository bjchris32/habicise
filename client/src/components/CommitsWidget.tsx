import React, { useState, useEffect } from 'react';
import { IHabit } from '../services/habits';
import { ICommitByDateOutput, getCommitsByDate } from '../services/commits';
import CommitList from './CommitList';
import CommitModal from './CommitModal';

interface CommitsWidgetProps {
  habit: IHabit;
}

const CommitsWidget: React.FC<CommitsWidgetProps> = ({ habit }) => {
  const [commitsByDate, setCommitsByDate] = useState<ICommitByDateOutput[]>([]);

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
    setCommitsByDate(data);
  };

  return (
    <div>
      <CommitModal onSave={handleCommitSave} habit={habit}/>
      <CommitList commitsByDate={commitsByDate}/>
    </div>
  )
}

export default CommitsWidget;
