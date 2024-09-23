import React from 'react';
// material-ui
import {
  Button,
  // Divider,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
// import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';

import { sendPasswordResetEmail } from "firebase/auth";
import { fireAuth } from '../firebase';
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';

// import axiosInstance from 'utils/axiosInstance';
// import { fireAuth } from 'firebase';
// import { setAccessToken } from 'store/reducers/user';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthForgotPassword = () => {
  const navigate = useNavigate();

  const [sent, setSent] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const maim = async (values) => {
    const email = values.email;
    sendPasswordResetEmail(fireAuth, email)
      .then(() => {
        setSent(true);
      })
      .catch((error) => {
        setIsError(error);
      });
  }

  return (
    <>
      {
        !sent ?
          <Formik
            initialValues={{
              email: '',
              submit: null
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              try {
                setStatus({ success: false });
                maim(values);
                setSubmitting(false);
              } catch (err) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="email-login">Email Address</InputLabel>
                      <OutlinedInput
                        id="email-login"
                        type="email"
                        value={values.email}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        fullWidth
                        error={Boolean(touched.email && errors.email)}
                      />
                      {touched.email && errors.email && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                          {errors.email}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>

                  {isError &&
                    <Grid item xs={12} sx={{ mt: '0px' }}>
                      <Stack spacing={1}>
                        <p className='tw-text-red-400' >{isError.message}</p>
                      </Stack>
                    </Grid>
                  }

                  {errors.submit && (
                    <Grid item xs={12}>
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <AnimateButton>
                      <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                        Send recovery Email
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
          :
          <>
            <p>An E-mail has been sent</p>
            <Button variant='contained' onClick={() => { navigate('/login') }}>Go Back</Button>
          </>
      }
    </>
  );
};

export default AuthForgotPassword;
