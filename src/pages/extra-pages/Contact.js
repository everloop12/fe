/* eslint-disable no-unused-vars */
// material-ui
import { Grid } from '@mui/material';

// assets
import { ReactComponent as LogoSVG } from 'components/Logo/logo.svg';
import EmailIcon from '@mui/icons-material/Email';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const ContactUs = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} className="tw-justify-center tw-items-center">
      <Grid
        item
        xs={12}
        sx={{ mb: -0.15 }}
        className="tw-justify-center tw-flex tw-flex-col tw-items-center tw-p-8 tw-pb-20 tw-bg-white tw-ml-[1.5rem] tw-my-[2.5rem] tw-border-[1px] tw-border-[#e6ebf1] tw-border-solid tw-rounded-[8px]"
      >
        {/* Logo and Title */}
        <Grid item xs={12} sx={{ mb: -0.25 }} className="tw-justify-center tw-flex tw-w-full tw-flex-col tw-items-center">
          <LogoSVG className="tw-w-[200px] tw-h-[200px]" />
          <p className="tw-text-black tw-font-[600] tw-ml-2 tw-text-[32px] tw-mt-4">Contact us</p>
        </Grid>

        {/* Description */}
        <Grid xs={8} item className="tw-m-auto tw-text-center">
          <p className="tw-text-[15px]">
            If you encounter an issue or have any inquiries, please get in touch with us through the following methods.
          </p>
        </Grid>

        {/* Contact Email */}
        <Grid className="tw-flex tw-flex-col tw-gap-2 tw-justify-center tw-items-center">
          <div className="tw-flex tw-gap-4">
            <EmailIcon /> <div>support@Medmythica.com</div>
          </div>
        </Grid>

        {/* Social Media Links */}
        <Grid container justifyContent="center" sx={{ mt: 4 }}>
          <Grid item>
            <a
              href="https://web.facebook.com/MedMythica/"
              className="flex justify-center items-center text-gray-500 hover:text-gray-100 transition duration-150 ease-in-out"
            >
              <img className="w-8 h-8" src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" />
            </a>
          </Grid>
          <Grid item sx={{ ml: 2 }}>
            <a
              href="https://www.instagram.com/medmythica/"
              className="flex justify-center items-center text-gray-500 hover:text-gray-100 transition duration-150 ease-in-out"
            >
              <img className="w-8 h-8" src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" />
            </a>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ContactUs;
