import { useState, useEffect } from 'react';
import { Snackbar, Box, Typography, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const QuestCompletionPopup = ({ questName, show }) => {
  const [open, setOpen] = useState(show);

  useEffect(() => {
    if (show) {
      setOpen(true);
      // Automatically close the popup after 3 seconds
      const timer = setTimeout(() => setOpen(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={() => setOpen(false)}
      sx={{
        '& .MuiSnackbarContent-root': {
          padding: '0', // Remove default padding from Snackbar
          backgroundColor: 'transparent', // Make Snackbar transparent so it doesn't interfere with the container
        },
      }}
    >
      <Paper
        elevation={8} // Add a shadow effect to make it more noticeable
        sx={{
          backgroundColor: '#28a745', // Green background
          borderRadius: '20px',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // Subtle shadow to lift the popup
        }}
      >
        {/* Icon */}
        <CheckCircleIcon sx={{ color: '#fff', fontSize: 40, marginRight: '16px' }} />

        {/* Quest Completion Text */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '20px',
              marginBottom: '4px',
            }}
          >
            Challenge Completed!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#fff',
              fontSize: '16px',
            }}
          >
            You successfully completed the challenge: &quot;{questName}&quot;
          </Typography>
        </Box>
      </Paper>
    </Snackbar>
  );
};

export default QuestCompletionPopup;
