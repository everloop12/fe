import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import { drawerWidth } from 'config';

const openedMixin = (theme) => ({
  width: drawerWidth,
  borderRight: 'none', // Removed border-right
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  boxShadow: 'none',
  backgroundColor: 'rgba(47,64,80,255)', // Set sidebar color here
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: 0,
  borderRight: 'none', // Removed border-right
  boxShadow: theme.customShadows.z1,
  backgroundColor: 'rgba(47,64,80,255)', // Set sidebar color here
});

// ==============================|| DRAWER - MINI STYLED ||============================== //

const MiniDrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  margin: 0, // Ensure no margin
  borderRight: 'none', // Ensure no border
  backgroundColor: 'rgba(47,64,80,255)', // Reapply background color directly here
  '& .MuiDrawer-paper': {
    backgroundColor: 'rgba(47,64,80,255)', // Ensuring the drawer paper also has the correct background color
    color: '#ffffff', // Text color for better contrast
  },
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default MiniDrawerStyled;
