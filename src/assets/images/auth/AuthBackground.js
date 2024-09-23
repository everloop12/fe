// material-ui
// import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

import { ReactComponent as LogoSVG } from 'components/Logo/logo.svg';

// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
  // const theme = useTheme();
  return (
    <Box sx={{ position: 'absolute', filter: 'blur(18px)', zIndex: -1, bottom: 0 }}>
      <LogoSVG style={{ width: "100%", height: "calc(100vh)", marginLeft: '-200px', viewBox: "0 0 405 809" }} />
    </Box>
  );
};

export default AuthBackground;
