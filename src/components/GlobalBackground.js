import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import defaultBackground from 'components/Logo/background.svg'; // Default background image
import darkBackground from 'components/Logo/Dark-Background.svg'; // Dark theme background
import lightBackground from 'components/Logo/Light-Background.svg'; // Light theme background
import oceanBackground from 'components/Logo/Ocean-Background.svg'; // Ocean theme background
import spaceBackground from 'components/Logo/Space-Background.svg'; // Space theme background
import 'components/backgroundanim.css'; // Import the CSS file

// ==============================|| GLOBAL BACKGROUND IMAGE ||============================== //

const GlobalBackground = () => {
  const [backgroundImage, setBackgroundImage] = useState(defaultBackground); // Set default background initially

  // Function to apply the background based on theme selection
  const applyThemeBackground = () => {
    const selectedTheme = localStorage.getItem('theme') || 'default'; // Get the theme from localStorage or use 'default'

    switch (selectedTheme) {
      case 'dark':
        setBackgroundImage(darkBackground);
        break;
      case 'light':
        setBackgroundImage(lightBackground);
        break;
      case 'ocean':
        setBackgroundImage(oceanBackground);
        break;
      case 'space':
        setBackgroundImage(spaceBackground);
        break;
      default:
        setBackgroundImage(defaultBackground); // Default background as in the original code
        break;
    }
  };

  useEffect(() => {
    // Apply the theme background when the component mounts
    applyThemeBackground();

    // Listen for the 'theme-change' event
    const handleThemeChange = () => {
      applyThemeBackground();
    };

    // Listen for custom 'theme-change' event triggered by ThemePicker
    window.addEventListener('theme-change', handleThemeChange);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('theme-change', handleThemeChange);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      document.body.style.backgroundPositionY = `${scrolled * 1.5}px`; // Parallax effect on scroll
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup on unmount
  }, []);

  return (
    <Box
      className="global-background"  // Apply the CSS class for background
      sx={{
        backgroundImage: `url(${backgroundImage})`, // Use dynamic backgroundImage based on theme selection
      }}
    />
  );
};

export default GlobalBackground;
