import React from 'react';
import { Link, Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence, browserLocalPersistence } from "firebase/auth";
import { fireAuth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'utils/axiosInstance';
import { questionsApiSlice } from 'store/api/questionApiSlice';
import { store } from 'store/index';
import { Storage } from '@capacitor/storage';

const AuthLogin = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const maim = async ({ email, password }) => {
    setPersistence(fireAuth, checked ? browserLocalPersistence : browserSessionPersistence).then(async () => {
      try {
        const data = await signInWithEmailAndPassword(fireAuth, email, password);
        await axiosInstance.post('quest/login', { uid: data.user.uid });

        // Store the token using Capacitor Storage
        await Storage.set({ key: 'user_token', value: data.user.uid });

        store.dispatch(questionsApiSlice.util.prefetch('getUserQuestionData', undefined, { force: true }));
        navigate('/main');
      } catch (e) {
        if (e.message.includes('wrong-password') || e.message.includes('not-found')) {
          setIsError({ message: 'Credentials are incorrect ' });
        } else {
          setIsError({ message: e.message.replace('Firebase:', '') });
        }
      }
    });
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setIsError(false);
            setStatus({ success: false });
            await maim(values);
            setSubmitting(false);
          } catch (err) {
            console.log(err);
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
                    sx={{
                      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        borderColor: '#1976d2',
                        boxShadow: '0px 0px 10px rgba(25, 118, 210, 0.5)'
                      },
                      '& .MuiOutlinedInput-root.Mui-focused': {
                        borderColor: '#1976d2'
                      }
                    }}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    autoComplete='off'
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                    sx={{
                      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        borderColor: '#1976d2',
                        boxShadow: '0px 0px 10px rgba(25, 118, 210, 0.5)'
                      },
                      '& .MuiOutlinedInput-root.Mui-focused': {
                        borderColor: '#1976d2'
                      }
                    }}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
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

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                        sx={{
                          transition: 'transform 0.2s ease',
                          '&:hover': {
                            transform: 'scale(1.2)',
                          }
                        }}
                      />
                    }
                    label={<Typography variant="h6">Keep Me Signed In</Typography>}
                  />
                  <Link to='/forgot-password' variant="h6" component={RouterLink} color="text.primary">
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: '#1976d2',
                        transform: 'scale(1.05)',
                        boxShadow: '0px 4px 20px rgba(25, 118, 210, 0.5)'
                      }
                    }}
                  >
                    Login
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
