import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CommitForm from './CommitForm';
import { IHabit } from '../services/habits-services';

interface CommitModalProps {
  onSave: (habitId: string) => void;
  habit: IHabit;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CommitModal: React.FC<CommitModalProps> = ({ onSave, habit }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCommitSave = async (habitId: string) => {
    onSave(habitId);
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Commit to the habit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            commit to {habit.name}
          </Typography>
          <CommitForm onSave={handleCommitSave} habit={habit}/>
        </Box>
      </Modal>
    </div>
  );
}

export default CommitModal;
