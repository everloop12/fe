import { useState } from 'react'; 
import { Box, Grid, Typography, Button } from '@mui/material';

const themes = [
  { label: 'Default', value: 'default', image: '/icons/Default Theme.svg' },
  { label: 'Dark', value: 'dark', image: '/icons/Dark Theme.svg' },
  { label: 'Light', value: 'light', image: '/icons/Light Theme.svg' },
  { label: 'Ocean', value: 'ocean', image: '/icons/Ocean Theme.svg' },
  { label: 'Space', value: 'space', image: '/icons/Space Theme.svg' }
];

const ThemePicker = () => {
  const [selectedTheme, setSelectedTheme] = useState(localStorage.getItem('theme') || 'default'); // Use 'theme' key

  // Function to handle theme selection
  const handleThemeSelection = (theme) => {
    setSelectedTheme(theme);
    localStorage.setItem('theme', theme); // Store theme under 'theme' key
    console.log(`Theme saved in local storage: ${localStorage.getItem('theme')}`); // Debugging

    // Emit a custom event to notify GlobalBackground about the change
    const event = new Event('theme-change');
    window.dispatchEvent(event);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ marginBottom: '1rem' }}>
        Select Your Theme
      </Typography>
      <Grid container spacing={2}>
        {themes.map((theme) => (
          <Grid item xs={12} sm={6} md={4} key={theme.value}>
            <Box
              role="button"
              tabIndex="0"
              onClick={() => handleThemeSelection(theme.value)} // Handle theme selection
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleThemeSelection(theme.value);
                }
              }}
              sx={{
                textAlign: 'center',
                cursor: 'pointer',
                border: selectedTheme === theme.value ? '3px solid #1cb0f6' : '3px solid transparent',
                borderRadius: '8px',
                padding: '1rem',
                backgroundColor: '#f5f5f5',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {theme.label}
              </Typography>
              <img
                src={theme.image}
                alt={theme.label}
                style={{
                  width: '100%',
                  maxWidth: '150px',
                  height: 'auto',
                  borderRadius: '8px',
                  marginBottom: '0.5rem'
                }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: selectedTheme === theme.value ? '#1cb0f6' : '#007bb2',
                  color: 'white'
                }}
              >
                Select
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ThemePicker;
