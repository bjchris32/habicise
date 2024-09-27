import React from 'react';
import { ICommitsListByDate } from '../services/commits';
import Typography from '@mui/material/Typography';
import ActivityCalendar from 'react-activity-calendar';

interface CommitListProps {
  commitsByDate: ICommitsListByDate[];
}

const CommitList: React.FC<CommitListProps> = ({ commitsByDate }) => {
  if (commitsByDate && commitsByDate.length > 0) {
    return (
      <div>
        <Typography variant="h5" sx={{ mb: 2 }} >
          Your past commitments:
        </Typography>
        <ActivityCalendar
          maxLevel={1}
          data={commitsByDate}
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
