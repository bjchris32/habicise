import React, { useState, useEffect } from 'react';
import { IHabit } from '../services/habits';
import { ICommit, getCommits } from '../services/commits';
import CommitList from './CommitList';
import CommitForm from './CommitForm';

interface CommitsWidgetProps {
  habit: IHabit;
}

const CommitsWidget: React.FC<CommitsWidgetProps> = ({ habit }) => {
  const [commits, setCommits] = useState<ICommit[]>([]);
  useEffect(() => {
    if (!!habit._id) {
      fetchCommits(habit._id);
    }
  }, []);

  const handleCommitSave = async (habitId: string) => {
    fetchCommits(habitId);
  };

  const fetchCommits = async (habitId: string) => {
    const data = await getCommits(habitId);
    setCommits(data);
  };

  return (
    <div>
      <CommitForm onSave={handleCommitSave} habit={habit}/>
      <CommitList commits={commits}/>
    </div>
  )
}

export default CommitsWidget;
