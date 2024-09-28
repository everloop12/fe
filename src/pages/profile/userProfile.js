import {  useState } from 'react';
import {
  Button,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  Modal,
} from '@mui/material';

// project import
import BadgeComponent from './badgesComponent';
import calculateLevelFromXP from 'utils/xp';
import {  useSelector } from 'react-redux';
import { selectUser } from 'store/reducers/user';

// Icons (public/icons folder)
const availableIcons = [
  { label: 'Cardiologist', file: 'Cardiology Icon Trial.svg' },
  { label: 'Endocrinologist', file: 'Endocrine Icon Trial.svg' },
  { label: 'Gastroenterologist', file: 'Gastroenterology Icon Trial.svg' },
  { label: 'Hematologist', file: 'Hematology Icon Trial.svg' },
  { label: 'Nephrologist', file: 'Nephrology Icon Trial.svg' },
  { label: 'Neurologist', file: 'Neurology Icon Trial.svg' },
  { label: 'Orthopedic Surgeon', file: 'Orthopedics Icon Trial.svg' },
  { label: 'Pediatrician', file: 'Pediatrics Icon Trial.svg' },
  { label: 'Pulmonologist', file: 'Respiratory Icon Trial.svg' },
  { label: 'Rheumatologist', file: 'Rheumatology Icon Trial.svg' },
  { label: 'Surgeon', file: 'Surgery Icon Trial.svg' },
  { label: 'OBGYN', file: 'Women Icon Trial.svg' }
];

// ============================|| USER PROFILE PAGE ||============================ //

const UserProfile = () => {
  const currentUser = useSelector(selectUser);

  const [selectedIcon, setSelectedIcon] = useState(localStorage.getItem('profileIcon') || 'Logo.svg'); // Default is Logo.svg
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Function to handle profile icon selection
  const handleIconSelection = (iconFile) => {
    setSelectedIcon(iconFile);
    localStorage.setItem('profileIcon', iconFile); // Save selection in localStorage
    setIsModalOpen(false); // Close modal
  };

  return (
    <Card className="tw-w-full tw-max-w-3xl tw-px-6 tw-py-8 tw-bg-white tw-rounded-2xl tw-shadow-xl tw-mx-auto">
      {/* Profile Info Section */}
      <CardContent>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={7}>
            <Box className="tw-bg-[#f0f8ff] tw-p-6 tw-rounded-lg tw-shadow-md tw-flex tw-items-center tw-gap-6">
              {/* Profile Picture */}
              <Box
                role="button"
                tabIndex="0"
                className="tw-h-[80px] tw-w-[80px] tw-rounded-full tw-cursor-pointer"
                onClick={() => setIsModalOpen(true)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setIsModalOpen(true);
                  }
                }}
              >
                <img
                  src={`/icons/${selectedIcon}`}
                  alt="Profile Icon"
                  className="tw-h-[80px] tw-w-[80px] tw-rounded-full"
                />
              </Box>
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
          onClick={() => setIsModalOpen(true)} // Open modal
        >
          Choose Profile Icon
        </Button>
      </CardContent>

      {/* Modal for choosing profile picture */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box className="tw-w-[300px] tw-bg-white tw-p-6 tw-rounded-lg tw-shadow-lg tw-mx-auto tw-mt-20">
          <Typography variant="h6" className="tw-text-center tw-mb-4">Choose Profile Picture</Typography>
          <Grid container spacing={2}>
            {availableIcons.map((icon) => (
              <Grid item xs={4} key={icon.file}>
                <Box
                  role="button"
                  tabIndex="0"
                  className="tw-cursor-pointer"
                  onClick={() => handleIconSelection(icon.file)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleIconSelection(icon.file);
                    }
                  }}
                >
                  <img
                    src={`/icons/${icon.file}`}
                    alt={icon.label}
                    className="tw-w-full tw-rounded-lg"
                  />
                </Box>
                <Typography variant="caption" className="tw-text-center tw-block">
                  {icon.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Modal>
    </Card>
  );
};

export default UserProfile;
