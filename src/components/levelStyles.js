// levelStyles.js

// Import existing textures
import forestAppBarTexture from 'assets/textures/forest-appbar.svg'; // This exists

// Use null or placeholders for textures that don't exist yet
const forestSidebarTexture = null;
const forestBackgroundTexture = null;

const oceanAppBarTexture = null;
const oceanSidebarTexture = null;
const oceanBackgroundTexture = null;

const spaceAppBarTexture = null;
const spaceSidebarTexture = null;
const spaceBackgroundTexture = null;

const moonAppBarTexture = null;
const moonSidebarTexture = null;
const moonBackgroundTexture = null;

const undergroundAppBarTexture = null;
const undergroundSidebarTexture = null;
const undergroundBackgroundTexture = null;

// Default styles for level 1 (no custom textures)
const defaultTheme = {
  appBarTexture: null,
  sidebarTexture: null,
  backgroundTexture: null,
  animation: '',
};

// Define themes for each level range
const themes = {
  // Forest theme (levels 2-5)
  forest: {
    appBarTexture: forestAppBarTexture,
    sidebarTexture: forestSidebarTexture,
    backgroundTexture: forestBackgroundTexture,
    // Animations can be defined later
  },

  // Ocean theme (levels 6-9)
  ocean: {
    appBarTexture: oceanAppBarTexture,
    sidebarTexture: oceanSidebarTexture,
    backgroundTexture: oceanBackgroundTexture,
  },

  // Space theme (level 10)
  space: {
    appBarTexture: spaceAppBarTexture,
    sidebarTexture: spaceSidebarTexture,
    backgroundTexture: spaceBackgroundTexture,
  },

  // Moon theme (levels 11-13)
  moon: {
    appBarTexture: moonAppBarTexture,
    sidebarTexture: moonSidebarTexture,
    backgroundTexture: moonBackgroundTexture,
  },

  // Underground theme (levels 14-16)
  underground: {
    appBarTexture: undergroundAppBarTexture,
    sidebarTexture: undergroundSidebarTexture,
    backgroundTexture: undergroundBackgroundTexture,
  },
};

// Function to get the theme based on the user's level
export const getThemeForLevel = (level) => {
  if (level >= 2 && level <= 5) {
    return themes.forest;
  } else if (level >= 6 && level <= 9) {
    return themes.ocean;
  } else if (level === 10) {
    return themes.space;
  } else if (level >= 11 && level <= 13) {
    return themes.moon;
  } else if (level >= 14 && level <= 16) {
    return themes.underground;
  } else {
    return defaultTheme;
  }
};

export default themes;
