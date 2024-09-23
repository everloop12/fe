import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// Function to get color based on the position in the list
const getPriorityColor = (index, total) => {
  // Normalize the index between 0 (green) and total (red)
  const normalizedPosition = index / total;

  // Calculate red and green values based on the normalized position
  const green = Math.round(normalizedPosition * 255);
  const red = Math.round((1 - normalizedPosition) * 255);

  return `rgba(${red}, ${green}, 0, 0.2)`; // Return color with low opacity
};

const PriorityList = ({ categories }) => {
  const totalCategories = categories.length;

  return (
    <TableContainer component={Paper} style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Subject</TableCell>
            <TableCell align="right">Solved Questions</TableCell>
            <TableCell align="right">Performance (%)</TableCell>
            <TableCell align="right">Priority</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category, index) => (
            <TableRow key={category.name} style={{ backgroundColor: getPriorityColor(index, totalCategories - 1) }}>
              <TableCell>{category.name}</TableCell>
              <TableCell align="right">{category.solvedQuestions}</TableCell>
              <TableCell align="right">{category.performance}%</TableCell>
              <TableCell align="right">{category.priority}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PriorityList;
