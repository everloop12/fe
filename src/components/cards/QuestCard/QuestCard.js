import PropTypes from 'prop-types';
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import { useState } from 'react';
import QuestCompletionPopup from 'pages/question-page/QuestCompletionPopup';

const QuestCard = ({ color, reward, tag = "QUESTION", currentProgress = 0, goal = 2, category = null }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [questName, setQuestName] = useState('');

  // Title Dictionary to generate quest titles
  const TitleDictionary = {
    "QUESTION": (x) => `Solve ${x} Questions${category ? ` in ${category}` : ''}`,
    "EXAM": (x) => `Enter ${x > 1 ? `${x} exams` : 'An Exam'}`,
    "LOGIN": () => `Login Once`,
  };

  const questTitle = TitleDictionary[tag](goal);

  const handleQuestCompletion = () => {
    setQuestName(questTitle); // Set the quest title to the popup
    setShowPopup(true); // Show the popup on completion
  };

  return (
    <>
      {/* Trigger Quest Completion Popup */}
      <QuestCompletionPopup questName={questName} show={showPopup} />

      <MainCard contentSX={{ p: 2.25 }} onClick={handleQuestCompletion}>
        <div className="tw-flex tw-justify-between tw-min-h-[70px]">
          <div>
            <Stack spacing={0.5}>
              <Typography variant="h6" color="textSecondary">
                {questTitle}
              </Typography>
            </Stack>
            <Box>
              <Typography variant="caption" color="textSecondary">
                reward:{' '}
                <Typography component="span" variant="caption" sx={{ color: `${color || 'primary'}.main` }}>
                  {reward}
                </Typography>{' '}
                XP
              </Typography>
            </Box>
          </div>
          <Grid item>
            <Chip
              variant="combined"
              color={color}
              label={`${currentProgress}/${goal}`}
              sx={{ ml: 1.25, pl: 1 }}
              size="large"
            />
          </Grid>
        </div>
      </MainCard>
    </>
  );
};

QuestCard.propTypes = {
  color: PropTypes.string,
  tag: PropTypes.string,
  currentProgress: PropTypes.number,
  goal: PropTypes.number,
  category: PropTypes.string,
  reward: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

QuestCard.defaultProps = {
  color: 'primary',
};

export default QuestCard;
