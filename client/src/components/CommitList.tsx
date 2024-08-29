import React, { useState, useEffect } from 'react';
import { ICommit } from '../services/commits';
import ActivityCalendar from 'react-activity-calendar';

interface CommitListProps {
  commits?: ICommit[];
}

const CommitList: React.FC<CommitListProps> = ({ commits }) => {
  const data = [
    {
      "date": "2023-06-14",
      "count": 2,
      "level": 1
    },
    {
      "date": "2023-06-22",
      "count": 16,
      "level": 3
    }
  ]
  if (commits && commits.length > 0) {
    return (
      <div>
        <h4>Commits</h4>
        <ul>
          {commits?.map((commit) => (
            <li key={commit._id}>
              {new Date(commit.createdAt as string).toString()}, {commit.description} with time: {commit.length}
            </li>
          ))}
        </ul>

        <ActivityCalendar data={data} />
      </div>
    )
  } else {
    return (
      <>
        add your first commit!
      </>
    )
  }

}

export default CommitList;
