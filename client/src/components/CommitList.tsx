import React, { useState, useEffect } from 'react';
import { ICommit, ICommitByDateOutput } from '../services/commits';
import Typography from '@mui/material/Typography';
import ActivityCalendar from 'react-activity-calendar';

interface CommitListProps {
  commitsByDate: ICommitByDateOutput[] | [];
}

const CommitList: React.FC<CommitListProps> = ({ commitsByDate }) => {
  // show the past one year history from today
  const moment = require('moment');
  const currentDate = moment().subtract(1, 'year').format('YYYY-MM-DD');

  const data = [
    // dummy
    {
      date: currentDate, // start
      count: 0,
      level: 0,
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
            // light: ['hsl(0, 0%, 92%)', 'rebeccapurple'],
            // dark: ['hsl(0, 0%, 22%)', 'hsl(225,92%,77%)'],
            light: ['hsl(0, 0%, 92%)', 'rebeccapurple'],
            dark: ['hsl(0, 0%, 92%)', 'rebeccapurple'],
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
