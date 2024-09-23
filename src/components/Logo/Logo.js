// material-ui
// import { useTheme } from '@mui/material/styles';
import { ReactComponent as LogoSVG } from './logo.svg';
/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  // const theme = useTheme();

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={logo} alt="Mantis" width="100" />
     *
     */

    <>
      <LogoSVG className='tw-w-10 tw-h-10' />
      <p className='tw-text-[16px] tw-font-[600] tw-ml-2 tw-text-white'>MedMythica</p> {/* Updated to set text color to white */}
    </>
  );
};

export default Logo;
