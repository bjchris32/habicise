import React, { useState, useEffect } from 'react';
import { ICommit } from '../services/commits';

interface CommitListProps {
  commits?: ICommit[];
}

const CommitList: React.FC<CommitListProps> = ({ commits }) => {
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
    </div>
  )
}

export default CommitList;
