import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { drawerWidth } from 'config';

const AppBarStyled = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: 'rgba(47,64,80,255)',
  top: 0,
  left: 0,
  position: 'fixed', // Ensure it is fixed
  width: '100%', // Make sure it spans the full width
  margin: 0,
  padding: 0,
  boxShadow: 'none',
  borderBottom: 'none',
  '&:hover': {
    backgroundColor: 'rgba(47,64,80,255)',
  },
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default AppBarStyled;
