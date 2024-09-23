/* eslint-disable no-unused-vars */
// material-ui
import { Grid, Box, Typography, Button, Checkbox } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fireAuth } from 'pages/authentication/firebase';
import ConfirmationModal from 'pages/Components/ConfirmationComponent/Confirmation';
import axiosInstance from 'utils/axiosInstance';
import { selectUser, setSettings } from 'store/reducers/user';
import { dispatch } from 'store/index';
import { deleteUser } from 'firebase/auth';

// Full-screen API function
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
};

// ================================|| SETTINGS PAGE ||================================ //

const SettingsPage = () => {
  const fireBaseUser = fireAuth.currentUser;
  const currentUser = useSelector(selectUser);
  const { settings, token } = currentUser;
  const [focus, setFocus] = useState(settings?.focus || false);
  const [anon, setAnon] = useState(settings?.anon || false);
  const [zenMode, setZenMode] = useState(false); // New state for Zen Full Focus mode
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    // If Zen mode is activated, automatically set focus, anon, and trigger full screen
    if (zenMode) {
      setFocus(true);
      setAnon(true);
      toggleFullScreen(); // Activate full screen
    }
  }, [zenMode]);

  const handleDeleteUser = async () => {
    await axiosInstance
      .delete('user/me', {
        headers: { Authorization: `Bearer ${currentUser.token}` }
      })
      .then((e) => {
        deleteUser(fireBaseUser).then(async () => {});
      });
  };

  const handleSaveSettings = async () => {
    dispatch(
      setSettings({
        focus: focus,
        anon: anon
      })
    );
    try {
      await axiosInstance.patch(
        'user/settings',
        {
          data: {
            focus: focus,
            anon: anon
          }
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
    } catch (e) {
      setError(e);
    }
  };

  const handleZenModeToggle = () => {
    setZenMode(!zenMode);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          padding: '2rem',
          maxWidth: '600px',
          width: '100%'
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: '2rem', fontWeight: 'bold', textAlign: 'center' }}>
          Settings
        </Typography>
  
        <Grid container spacing={4}>
          {/* Anonymous Mode */}
          <Grid item xs={12}>
            <Box sx={{ padding: '1.5rem', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Anonymous Mode
                  </Typography>
                  <Typography variant="body2">
                    Hides Your Name From The Leaderboard & Other Instances Where Your Data Appears.
                  </Typography>
                </Box>
                <Checkbox
                  checked={anon}
                  onChange={() => setAnon(!anon)}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                />
              </Box>
            </Box>
          </Grid>
  
          {/* Focus Mode */}
          <Grid item xs={12}>
            <Box sx={{ padding: '1.5rem', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Focus Mode
                  </Typography>
                  <Typography variant="body2">
                    Hides Challenges, The XP Bar & The Leaderboard, Focus Only On Doing SBAs.
                  </Typography>
                </Box>
                <Checkbox
                  checked={focus}
                  onChange={() => setFocus(!focus)}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                />
              </Box>
            </Box>
          </Grid>
  
          {/* Zen Full Focus Mode */}
          <Grid item xs={12}>
            <Box sx={{ padding: '1.5rem', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Zen Full Focus Mode
                  </Typography>
                  <Typography variant="body2">
                    Enables Anonymous Mode, Focus Mode, and Activates Full Screen for an uninterrupted experience.
                  </Typography>
                </Box>
                <Checkbox
                  checked={zenMode}
                  onChange={handleZenModeToggle}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                />
              </Box>
            </Box>
          </Grid>
  
          {/* Additional Options */}
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
              Additional Options
            </Typography>
  
            <Box sx={{ padding: '1.5rem', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Delete Your Account
                  </Typography>
                  <Typography variant="body2">
                    Deletes Your Account & All Its Associated Data.
                  </Typography>
                </Box>
                <Button variant="contained" color="error" onClick={() => setShowConfirmation(true)}>
                  Delete Account
                </Button>
              </Box>
            </Box>
          </Grid>
  
          {/* Conditionally render mode buttons based on the focus state */}
          {!focus && (
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                Mode Options
              </Typography>
              <Box sx={{ padding: '1.5rem', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {/* Life Drain Mode */}
                  <Button variant="outlined" color="info">
                    Life Drain Mode
                  </Button>
                  {/* Pomodoro Mode */}
                  <Button variant="outlined" color="primary">
                    Pomodoro Mode
                  </Button>
                  {/* Survival Mode */}
                  <Button variant="outlined" color="secondary">
                    Survival Mode
                  </Button>
                </Box>
              </Box>
            </Grid>
          )}
  
          {/* Save Settings Button */}
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ padding: '0.8rem 2rem', fontSize: '1rem', borderRadius: '50px' }}
              onClick={handleSaveSettings}
            >
              Save Settings
            </Button>
            {error && <Typography sx={{ color: 'red', marginTop: '1rem' }}>An error occurred while saving. Please try again.</Typography>}
          </Grid>
        </Grid>
  
        <ConfirmationModal show={showConfirmation} setShow={setShowConfirmation} variant="danger" onConfirm={handleDeleteUser}>
          You are about to delete your account, this action is irreversible.
        </ConfirmationModal>
      </Box>
    </Box>
  );
}
export default SettingsPage  