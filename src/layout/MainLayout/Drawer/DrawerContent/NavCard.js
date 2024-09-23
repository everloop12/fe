// material-ui
import { Button, CardMedia, Link, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
import avatar from 'assets/images/users/avatar-group.png';
import AnimateButton from 'components/@extended/AnimateButton';

// ==============================|| DRAWER CONTENT - NAVIGATION CARD ||============================== //

const NavCard = () => (
  <MainCard sx={{ bgcolor: 'rgba(38,57,73,255)', m: 3 }}> {/* Updated the background color here */}
    <Stack alignItems="center" spacing={2.5}>
      <CardMedia component="img" image={avatar} sx={{ width: 112 }} />
      <Stack alignItems="center">
        <Typography variant="h5">MedMythica</Typography>
        <Typography variant="h6" color="secondary">
          Checkout Premium Features
        </Typography>
      </Stack>
      <AnimateButton>
        <Button component={Link} target="_blank" href="https://medmythica.com/" variant="contained" color="success" size="small">
          Premium
        </Button>
      </AnimateButton>
    </Stack>
  </MainCard>
);

export default NavCard;
