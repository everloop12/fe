import React from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const QuestionTracker = ({ totalQuestions, currentQuestionIndex, answeredQuestions }) => {
  // Calculate the range of questions to display (e.g., 1-10, 11-20, etc.)
  const rangeStart = Math.floor(currentQuestionIndex / 10) * 10 + 1;
  const rangeEnd = Math.min(rangeStart + 9, totalQuestions);

  // Create an array for the questions in the current range
  const questionRange = Array.from({ length: rangeEnd - rangeStart + 1 }, (_, i) => rangeStart + i);

  // Calculate progress percentages for correct, incorrect, and unanswered questions
  const correctAnswersCount = answeredQuestions.filter(q => q.isCorrect).length;
  const incorrectAnswersCount = answeredQuestions.filter(q => !q.isCorrect).length;

  const correctPercentage = totalQuestions > 0 ? (correctAnswersCount / totalQuestions) * 100 : 0;
  const incorrectPercentage = totalQuestions > 0 ? (incorrectAnswersCount / totalQuestions) * 100 : 0;
  const unansweredQuestionsCount = totalQuestions - answeredQuestions.length;
  const unansweredPercentage = totalQuestions > 0 ? (unansweredQuestionsCount / totalQuestions) * 100 : 0;

  // Calculate correct answer fraction, handle division by 0
  const correctFraction = `${correctAnswersCount}/${answeredQuestions.length || 0}`;
  const correctPercentageDisplay = answeredQuestions.length > 0 
    ? ((correctAnswersCount / answeredQuestions.length) * 100).toFixed(0) 
    : 0;

  // Determine box color based on the local state (session order)
  const getBoxStyle = (questionNumber) => {
    const localQuestionData = answeredQuestions[questionNumber - 1];  // Use zero-based index

    if (localQuestionData?.isCorrect) {
      return { backgroundColor: '#4caf50', color: 'white' }; // Green for correct
    }
    if (localQuestionData?.isCorrect === false) {
      return { backgroundColor: '#f44336', color: 'white' }; // Red for incorrect
    }
    if (questionNumber === currentQuestionIndex + 1) {
      return { backgroundColor: '#2196f3', color: 'white' }; // Blue for current question
    }
    return { backgroundColor: '#b5d1e8', color: 'white' }; // Gray for unanswered
  };

  return (
    <Box sx={{ width: '80%', marginBottom: '20px', textAlign: 'center', margin: '0 auto' }}>
      {/* Correct percentage, correct fraction, and questions answered */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
          {`${correctPercentageDisplay}% Correct`}
        </Typography>
  
        {/* Updated section with correct fraction and "Correct Answers" text */}
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          {`${correctFraction} Correct Answers`} 
        </Typography>
  
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          {`${answeredQuestions.length} Questions Answered`}
        </Typography>
      </Box>
  
      {/* Progress bar showing correct, incorrect, and unanswered percentages */}
      <Box sx={{ position: 'relative', height: '20px', borderRadius: '5px', backgroundColor: '#E0E0E0', marginBottom: '10px', width: '100%' }}>
        {/* Correct answers */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            height: '100%',
            width: `${correctPercentage}%`,
            backgroundColor: '#4caf50', // Green
            borderRadius: '5px 0 0 5px',
          }}
        />
        {/* Incorrect answers */}
        <Box
          sx={{
            position: 'absolute',
            left: `${correctPercentage}%`,
            height: '100%',
            width: `${incorrectPercentage}%`,
            backgroundColor: '#f44336', // Red
          }}
        />
        {/* Unanswered */}
        <Box
          sx={{
            position: 'absolute',
            left: `${correctPercentage + incorrectPercentage}%`,
            height: '100%',
            width: `${unansweredPercentage}%`,
            backgroundColor: '#b5d1e8', // Grey
            borderRadius: '0 5px 5px 0',
          }}
        />
      </Box>

      {/* Question Tracker */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '8px', 
        marginBottom: '10px', 
        flexWrap: 'wrap',
        '@media (max-width: 600px)': {
          flexBasis: '50%',  // Ensure two rows maximum on smaller screens
          justifyContent: 'space-around', // Ensure even spacing for two rows
        }
      }}>
        {questionRange.map((questionNumber) => {
          const { backgroundColor, color } = getBoxStyle(questionNumber);

          return (
            <Box
              key={questionNumber}
              sx={{
                width: '35px',
                height: '35px',
                borderRadius: '5px',
                backgroundColor,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color,
                fontWeight: 'bold',
                boxShadow: currentQuestionIndex + 1 === questionNumber ? '0px 0px 8px 3px rgba(0, 0, 0, 0.2)' : 'none',
                position: 'relative',
                transition: 'background-color 0.2s ease',
              }}
            >
              <Typography variant="caption">{questionNumber}</Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

QuestionTracker.propTypes = {
  totalQuestions: PropTypes.number.isRequired,
  currentQuestionIndex: PropTypes.number.isRequired,
  answeredQuestions: PropTypes.arrayOf(
    PropTypes.shape({
      isCorrect: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default QuestionTracker;
