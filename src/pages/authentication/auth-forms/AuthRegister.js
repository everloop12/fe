/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup);
import { Formik } from 'formik';

// project import
// import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import axiosInstance from 'utils/axiosInstance';
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';
import { MenuItem, Select } from '../../../../node_modules/@mui/material/index';
import { countList, uniList } from './countries';
import TestSelect from './TestSelect';
import { badWords } from 'utils/filter';

// import axios from '../../../../node_modules/axios/index';

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = () => {
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [forumErrors, setErrors] = useState(null)
  const navigate = useNavigate();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  function handleSubmit(data) {
    axiosInstance
      .post('auth/signup', {
        ...data
      })
      .then(() => {
        navigate('/login')
      }).catch((e) => {
        console.log(e)
        setErrors(e?.response?.data?.message || 'Something went wrong')
      })
  }

  useEffect(() => {
    changePassword('');
  }, []);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 300,
        width: 250,
      },
    },
  };

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          lastName: '',
          displayName: '',
          country: '',
          university: '',
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().min(2).max(20).required('First Name is required'),
          displayName: Yup.string().min(2).max(20).required('Last Name is required'),
          country: Yup.string().required('Country is required'),
          university: Yup.string().required('University is required'),
          email: Yup.string().email('Must be a valid email').max(100).required('Email is required'),
          password: Yup.string().password().required()
            .min(6, 'must be at least 6 charachters long')
            .minSymbols(0, 'Must contain at least 1 symbol')
            .minNumbers(0, 'Must contain at least 1 number')
            .minUppercase(0, 'Must contain at least 1 uppercase charachter')
            .minLowercase(0, 'Must contain at least 1 lowercase charachter'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if ([values.name, values.lastName, values.displayName, values.email].some(x => badWords.some((y) => x.toLowerCase().includes(y)))) {
              setStatus({ success: false });
              setErrors({ submit: 'Do not use bad language' });
              setSubmitting(false);
            } else {
              const { submit, ...submitValues } = values;
              handleSubmit(submitValues);
              setStatus({ success: false });
              setSubmitting(false);
            }
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Mail@domain.com"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name-signup">First Name *</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                    id="name-login"
                    type="name"
                    value={values.name}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="First name"
                    inputProps={{}}
                  />
                  {touched.name && errors.name && (
                    <FormHelperText error id="helper-text-name-signup">
                      {errors.name}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="lastName-signup">Last Name *</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.lastName && errors.lastName)}
                    id="lastName-login"
                    type="lastName"
                    value={values.lastName}
                    name="lastName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Last name"
                    inputProps={{}}
                  />
                  {touched.lastName && errors.lastName && (
                    <FormHelperText error id="helper-text-lastName-signup">
                      {errors.lastName}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>


              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="displayName-signup">DisplayName *</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.displayName && errors.displayName)}
                    id="displayName-login"
                    type="displayName"
                    value={values.displayName}
                    name="displayName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Display name"
                    inputProps={{}}
                  />
                  {touched.displayName && errors.displayName && (
                    <FormHelperText error id="helper-text-displayName-signup">
                      {errors.displayName}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>


              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Country*</InputLabel>
                  <TestSelect vendorOptions={countList.map(x => x.name)} name="country" placeholder="Country" type="country" value={values.country} onChange={(x) => {
                    setFieldValue('country', x)
                  }
                  } />


                  {touched.country && errors.country && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.country}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>


              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">University*</InputLabel>
                  <TestSelect vendorOptions={uniList} name="university" placeholder="University" type="university" value={values.university} onChange={(x) => setFieldValue('university', x)} />

                  {touched.university && errors.university && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.university}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>


              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
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
                    placeholder="******"
                    inputProps={{}}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password-signup">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  By Signing up, you agree to our &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="/tos">
                    Terms of Service
                  </Link>
                  {/* &nbsp; and &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Privacy Policy
                  </Link> */}
                </Typography>
              </Grid>
              {(errors.submit || forumErrors) && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                  <FormHelperText error>{forumErrors}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Create Account
                  </Button>
                </AnimateButton>
              </Grid>
              <Grid item xs={12}>
                <Divider>
                  <button type='button' onClick={() => navigate('/login')} className='tw-cursor-pointer tw-border-none tw-shadow-md tw-px-2 hover:tw-bg-[#cfd6e1]'>
                    <p> Sign In Instead</p>
                  </button>
                </Divider>
              </Grid>
              {/* <Grid item xs={12}>
                <FirebaseSocial />
              </Grid> */}
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;
