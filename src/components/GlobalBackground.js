import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import background from 'components/Logo/background.svg'; // Ensure the correct path to your SVG
import 'components/backgroundanim.css'; // Import the CSS file

// ==============================|| GLOBAL BACKGROUND IMAGE ||============================== //

const GlobalBackground = () => {

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
        backgroundImage: `url(${background})`,
      }}
    />
  );
};

export default GlobalBackground;
