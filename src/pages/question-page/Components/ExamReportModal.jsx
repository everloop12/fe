import React from 'react';
import { Box, Modal, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ExamReportModal = ({ open, handleClose, sessionData }) => {
  const chartData = [
    { name: 'Correct', value: sessionData.correctAnswersCount },
    { name: 'Incorrect', value: sessionData.incorrectAnswersCount },
  ];

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ width: '80%', margin: 'auto', padding: '20px', backgroundColor: 'white', position: 'relative' }}>
        <IconButton sx={{ position: 'absolute', top: '10px', right: '10px' }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>Exam Session Report</Typography>

        <Typography variant="body1">
          <strong>Total Time Taken:</strong> {sessionData.elapsedTime}
        </Typography>
        <Typography variant="body1">
          <strong>Average Time per Question:</strong> {sessionData.avgTimePerQuestion}
        </Typography>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

        <Button variant="contained" onClick={handleClose} sx={{ marginTop: '20px' }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default ExamReportModal;
