import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Grid,
  IconButton,
  Paper,
  Popper,
  Stack,
  Tab,
  Tabs,
  Typography
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import ProfileTab from './ProfileTab';
// assets
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { signOut } from 'firebase/auth';
import { fireAuth } from 'pages/authentication/firebase';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/reducers/user';
import calculateLevelFromXP from 'utils/xp';

// Import the flame animations and XP bar animations CSS files
import './styles/flameAnimations.css'; // Adjust the path accordingly
import './styles/xpBarAnimations.css';  // New XP bar animation CSS
import './styles/levelUpAnimation.css'; // Level-up animation CSS
import './styles/xpGainAnimation.css';  // XP gain animation CSS

// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`
  };
}

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = ({ full }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleLogout = async () => {
    signOut(fireAuth);
    navigate('/login');
  };

  const userSlice = useSelector(selectUser);
  const focus = userSlice?.settings?.focus || false;
  const profile = useSelector(selectUser);

  const currentUser = profile;

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [xpAnimating, setXpAnimating] = useState(false); // State for animation control
  const [showLevelUp, setShowLevelUp] = useState(false); // State for showing level-up animation
  const [prevLevel, setPrevLevel] = useState(calculateLevelFromXP(profile?.xp || 0)); // Store the previous level
  const [showXpGain, setShowXpGain] = useState(false); // State for showing XP gain
  const [xpGained, setXpGained] = useState(0); // XP gained amount
  const [prevXP, setPrevXP] = useState(profile?.xp || 0); // Track previous XP

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const width = (profile?.xp || 0) % 100;
  const level = calculateLevelFromXP(profile?.xp || 0);

  // Streak tracking logic
  const streak = (profile?.streak || 0);
  const [prevStreak, setPrevStreak] = useState(streak);

  useEffect(() => {
    if (streak !== prevStreak) {
      setPrevStreak(streak);
    }
  }, [streak, prevStreak]);

  useEffect(() => {
    if (level > prevLevel) {
      setShowLevelUp(true); // Show the level-up animation
      setTimeout(() => setShowLevelUp(false), 3000); // Hide after 3 seconds
      setPrevLevel(level); // Update the previous level
    }
  }, [level, prevLevel]);

  useEffect(() => {
    setXpAnimating(true);
    const timer = setTimeout(() => setXpAnimating(false), 1500); // Animation duration
    return () => clearTimeout(timer);
  }, [width]);

  // When the profile XP changes, trigger the XP gain animation with only the gained XP
  useEffect(() => {
    const currentXP = profile?.xp || 0;
    const gainedXP = currentXP - prevXP; // Calculate gained XP

    if (gainedXP > 0) {
      setXpGained(gainedXP); // Set XP gained to trigger animation
      setShowXpGain(true);
      setTimeout(() => setShowXpGain(false), 2000); // Hide after 2 seconds
    }

    setPrevXP(currentXP); // Update previous XP to the current one
  }, [profile?.xp]);

  const iconBackColorOpen = 'rgba(47,64,80,255)';
  const levelColor = `hsl(${200 + level * 6}, ${100}%, ${80}%)`;

  const xpBarStyle = {
    '--xp-width': `${width + 5}%`,
    '--xp-bar-border-color': levelColor,
    '--xp-bar-fill-color': xpAnimating ? 'var(--xp-bar-grow-color)' : '#3b82f6', // Update to add conditional animation
    '--level-circle-border-color': levelColor,
  };

  // Logic for default image or localStorage image for profile avatar
  const avatarImage = `/icons/${localStorage.getItem('profileIcon') || 'Logo.svg'}`; // Dynamically load from localStorage

  let content = currentUser ? (
    <ButtonBase
      sx={{
        width: full ? '100%' : undefined,
        p: 0.25,
        bgcolor: open ? iconBackColorOpen : 'transparent',
        borderRadius: 1,
        '&:hover': { bgcolor: 'rgba(47,64,80,255)' }
      }}
      aria-label="open profile"
      ref={anchorRef}
      aria-controls={open ? 'profile-grow' : undefined}
      aria-haspopup="true"
      onClick={handleToggle}
    >
      <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
        {!focus && (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
            <div
              className="flame-icon-container"
              style={{
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                width: '60px',
              }}
            >
              {/* Flame icons logic */}
            </div>
            <div className="xp-bar-wrapper" style={{ display: 'flex', marginRight: '24px', position: 'relative' }}>
              <div className="level-circle" style={xpBarStyle}>
                <span>{level}</span>
              </div>
              <div className="xp-bar-container" style={xpBarStyle}>
                <div className={`xp-bar ${xpAnimating ? 'xp-bar-grow' : ''}`} style={xpBarStyle} />
              </div>
            </div>
          </div>
        )}
        <Avatar alt="profile user" src={avatarImage} sx={{ width: 32, height: 32 }} /> {/* Modified Avatar */}
        <Typography variant="subtitle1" sx={{ color: '#ffffff' }}>
          {profile.displayName ?? profile.email}
        </Typography>
      </Stack>
    </ButtonBase>
  ) : (
    <div>
      <Button className='tw-m-1' variant='contained' onClick={() => { navigate('/login') }}>Login</Button>
      <Button className='tw-m-1' variant='contained' onClick={() => { navigate('/register') }}>Register</Button>
    </div>
  );

  let cardContent = currentUser ? (
    <CardContent sx={{ px: 2.5, pt: 3 }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Stack direction="row" spacing={1.25} alignItems="center">
            <Avatar alt="profile user" src={avatarImage} sx={{ width: 32, height: 32 }} /> {/* Modified Avatar */}
            <Stack>
            <Typography variant="h6">{profile.displayName ?? profile.email}</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item>
          <IconButton size="large" color="secondary" onClick={handleLogout}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Grid>
    </CardContent>
  ) : (
    <Button onClick={() => { navigate('/login') }}>Login</Button>
  );

  return (
    <Box sx={{ width: full ? '100%' : undefined, flexShrink: 0, ml: 0.75 }}>
      {/* XP Gain Animation */}
      {showXpGain && (
        <div className="xp-gain-animation">
          +{xpGained} XP
        </div>
      )}

      {/* Level-Up Animation Overlay */}
      {showLevelUp && (
        <div className="level-up-overlay">
          <div className="level-up-content">
            <Typography variant="h1" color="white" sx={{ fontWeight: 'bold' }}>
              Level Up!
            </Typography>
            <Typography variant="h4" color="white">
              You are now level {level}!
            </Typography>
          </div>
        </div>
      )}
      {content}
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            {open && (
              <Paper
                sx={{
                  boxShadow: theme.customShadows.z1,
                  width: 290,
                  minWidth: 240,
                  maxWidth: 290,
                  [theme.breakpoints.down('md')]: {
                    maxWidth: 250
                  }
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard elevation={0} border={false} content={false}>
                    {cardContent}
                    {open && (
                      <>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                          <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="profile tabs">
                            <Tab
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textTransform: 'capitalize'
                              }}
                              icon={<UserOutlined style={{ marginBottom: 0, marginRight: '10px' }} />}
                              label="Profile"
                              {...a11yProps(0)}
                            />
                          </Tabs>
                        </Box>
                        <TabPanel value={value} index={0} dir={theme.direction}>
                          <ProfileTab handleLogout={handleLogout} />
                        </TabPanel>
                      </>
                    )}
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            )}
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

Profile.propTypes = {
  full: PropTypes.bool
};

export default Profile;

