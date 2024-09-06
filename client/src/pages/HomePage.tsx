import React, { useState, useEffect }  from 'react';
import { Container, Box, Typography } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Container maxWidth={false}>
      <Box
        width="100%"
        bgcolor="lightblue"
        alignItems="center"
        justifyContent="center"
        display="flex"
        flexDirection="column"
        sx={{ my: 10 }}>
        <Typography variant="h3" sx={{ mb: 2, textAlign: 'center' }}>
          Habicise
          <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center', mb: 4 }}>
            Cultivate your new habit in streaks like doing exercise
          </Typography>
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
