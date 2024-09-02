import React, { useState, useEffect } from 'react';
import { ICommit, ICommitByDateOutput } from '../services/commits';
import Typography from '@mui/material/Typography';
import ActivityCalendar from 'react-activity-calendar';

interface CommitListProps {
  commitsByDate: ICommitByDateOutput[] | [];
}

const CommitList: React.FC<CommitListProps> = ({ commitsByDate }) => {
  // TODO: adjust the date range instead of adding dumb data
  const data = [
    {
      "date": "2023-12-14",
      "count": 2,
      "level": 1
    },
    ...commitsByDate
  ]

  if (commitsByDate && commitsByDate.length > 0) {
    return (
      <div>
        <Typography variant="h5" sx={{ mb: 2 }} >
          Your past commitments:
        </Typography>
        <ActivityCalendar
          maxLevel={1}
          data={data}
          blockMargin={5}
          hideMonthLabels={false}
          showWeekdayLabels={true}
          // TODO: change the theme
          theme={{
            light: ['hsl(0, 0%, 92%)', 'rebeccapurple'],
            dark: ['hsl(0, 0%, 22%)', 'hsl(225,92%,77%)'],
          }}
        />
      </div>
    )
  } else {
    return (
      <>
        <Typography sx={{ mb: 2 }} >
          Commit your effort in the above form.
        </Typography>
      </>
    )
  }

}

export default CommitList;
