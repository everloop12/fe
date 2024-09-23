// material-ui
import {  useMediaQuery } from '@mui/material';

// project import
import Profile from './Profile';
import MobileSection from './MobileSection';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <>
      {/* {!matchesXs && <Search />}
      {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />} */}

      <div className='tw-w-full tw-flex tw-justify-end'>
        {!matchesXs && <Profile />}
        {matchesXs && <MobileSection />}
      </div>
    </>
  );
};

export default HeaderContent;
