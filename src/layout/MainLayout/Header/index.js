import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { AppBar, IconButton, Toolbar, useMediaQuery } from '@mui/material';

// project import
import AppBarStyled from './AppBarStyled';
import HeaderContent from './HeaderContent';
import LinearProgress from '@mui/material/LinearProgress';
// assets
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Box } from '../../../../node_modules/@mui/material/index';
import { useLoading } from 'utils/loadingContext';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

const Header = ({ open, handleDrawerToggle }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  const isSomeQueryPending = useSelector(state => Object.values(state.api.queries).some(query => query.status === 'pending'));
  const { loading } = useLoading();

  useEffect(() => {}, [loading]);

  // common header
  const mainHeader = (
    <div>
      {(loading || isSomeQueryPending) && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      <Toolbar>
        <IconButton
          disableRipple
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="start"
          sx={{
            color: '#ffffff', // Icon color set to white
            bgcolor: 'rgba(47,64,80,255)', // Button background color
            ml: { xs: 0, lg: -2 },
            '&:hover': {
              bgcolor: 'rgba(47,64,80,255)', // Maintain background color on hover
            },
          }}
        >
          {!open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </IconButton>
        <HeaderContent />
      </Toolbar>
    </div>
  );

  // app-bar params
  const appBar = {
    position: 'fixed',
    color: 'inherit',
    elevation: 0,
    sx: {
      backgroundColor: 'rgba(47,64,80,255)', // Background color for the AppBar
      borderBottom: `0px solid ${theme.palette.divider}`,
      
    },
  };

  return (
    <>
      {!matchDownMD ? (
        <AppBarStyled open={open} {...appBar}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar {...appBar}>{mainHeader}</AppBar>
      )}
    </>
  );
};

Header.propTypes = {
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
};

export default Header;
