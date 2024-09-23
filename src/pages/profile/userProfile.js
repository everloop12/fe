/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
// material-ui
import {
  Button,
  Grid,
  Stack,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
  Divider
} from '@mui/material';

// project import
import BadgeComponent from './badgesComponent';
import calculateLevelFromXP from 'utils/xp';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/reducers/user';
import { useNavigate } from 'react-router-dom';

// ============================|| USER PROFILE PAGE ||============================ //

const UserProfile = () => {
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const calculateXPForNextLevel = (level) => {
    let xpForNextLevel = 100;
    for (let i = 2; i <= level; i++) {
      xpForNextLevel += 50 + 50 * i; // XP required for next level
    }
    return xpForNextLevel;
  };

  const currentXP = currentUser?.xp || 0;
  const currentLevel = calculateLevelFromXP(currentXP);
  const xpForCurrentLevel = calculateXPForNextLevel(currentLevel - 1); // XP required for the current level
  const xpForNextLevel = calculateXPForNextLevel(currentLevel); // XP required for next level
  const xpProgress = currentXP - xpForCurrentLevel; // XP gained in the current level
  const xpRequired = xpForNextLevel - xpForCurrentLevel; // Total XP needed to reach the next level
  const progressPercentage = (xpProgress / xpRequired) * 100; // Percentage of progress toward next level
  const levelColor = `hsl(${200 + currentLevel * 6}, ${100}%, 60%)`; // Dynamic color based on level

  return (
    <Card className="tw-w-full tw-max-w-3xl tw-px-6 tw-py-8 tw-bg-white tw-rounded-2xl tw-shadow-xl tw-mx-auto">
      {/* Profile Info Section */}
      <CardContent>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={7}>
            <Box className="tw-bg-[#f0f8ff] tw-p-6 tw-rounded-lg tw-shadow-md tw-flex tw-items-center tw-gap-6">
              <PersonIcon className="tw-h-[80px] tw-w-[80px] tw-text-[#1cb0f6]" />
              <Box>
                <Typography variant="h4" className="tw-font-bold tw-text-gray-800">
                  {currentUser?.displayName || 'No Display Name'}
                </Typography>
                <Typography variant="body1" className="tw-text-gray-700 tw-mt-2">
                  {currentUser?.name || 'No Name'} {currentUser?.lastName || ''}
                </Typography>
                <Typography variant="body1" className="tw-text-gray-700 tw-mt-1">
                  {currentUser?.country || 'No Country'}
                </Typography>
                <Typography variant="body1" className="tw-text-gray-700 tw-mt-1">
                  {currentUser?.email || 'No Email'}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Level and XP Progress Section */}
          <Grid item xs={12} sm={5}>
            <Box className="tw-bg-[#f0f8ff] tw-p-6 tw-rounded-lg tw-shadow-md tw-text-center">
              <Box
                style={{ borderColor: levelColor }}
                className="tw-border-solid tw-border-[5px] tw-w-[120px] tw-h-[120px] tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mx-auto tw-bg-white"
              >
                <Typography variant="h3" style={{ color: levelColor }}>
                  {currentLevel}
                </Typography>
              </Box>
              <Typography variant="h6" className="tw-font-semibold tw-mt-4 tw-text-gray-800">
                Level {currentLevel}
              </Typography>
              <Box className="tw-w-full tw-mt-4">
                <CircularProgress
                  variant="determinate"
                  value={progressPercentage}
                  size={90}
                  thickness={5}
                  sx={{ color: levelColor }}
                />
                <Typography variant="body2" className="tw-mt-2 tw-text-gray-700">
                  {xpProgress}/{xpRequired} XP to Next Level
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>

      {/* Badge Section */}
      <Divider className="tw-my-6" />
      <CardContent>
        <Typography variant="h5" className="tw-font-bold tw-text-gray-800 tw-mb-4">
          Achievements
        </Typography>
        <BadgeComponent />
      </CardContent>

      {/* Edit Profile Button */}
      <CardContent className="tw-text-center">
        <Button
          variant="contained"
          sx={{ backgroundColor: '#1cb0f6', color: 'white', py: 2, px: 6 }}
          onClick={() => navigate('/profile')}
        >
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
