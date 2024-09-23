// Loader.js
import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const Loader = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(/path-to-your-background-image.jpg)', // Set your background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        flexDirection: 'column',
        color: '#fff', // Adjust color based on your background
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Preparing The Question Bank...
      </Typography>
    </Box>
  );
};

export default Loader;
