/* eslint-disable react/prop-types */
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
import { Formik, ErrorMessage, Field, FieldArray } from 'formik';

// project import

import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';
import { useAddNewTagMutation, useUpdateTagMutation } from 'store/api/TagApiSlice';
import { store } from 'store/index';

// ============================|| FIREBASE - REGISTER ||============================ //

const TagForm = ({ id = null, selectedTag = null }) => {
  const [addNewTag, {
    isLoading: Aloading,
    isSuccess: AisSuccess,
    isError: AisError,
    error: Aerror
  }] = useAddNewTagMutation();
  const [updateTag, {
    isLoading: Uloading,
    isSuccess: UisSuccess,
    isError: UisError,
    error: Uerror
  }] = useUpdateTagMutation();

  const navigate = useNavigate();

  const isLoading = Aloading || Uloading
  const isSuccess = AisSuccess || UisSuccess
  const isError = AisError || UisError
  const error = Aerror || Uerror

  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
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

  useEffect(() => {
    if (isSuccess)
      navigate('/taglist');
  }, [isSuccess, navigate])

  useEffect(() => {
    changePassword('');
  }, []);

  useEffect(() => { }, [selectedTag])
  const init = selectedTag ? selectedTag : {
    name: '',
  };
  return (
    <>
      <Formik
        initialValues={init}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required('Tag body is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {

            if (selectedTag) {
              updateTag({ ...values })
            } else {
              addNewTag(values);
            }
            setStatus({ success: false });
            setSubmitting(false);
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid className='tw-p-6' container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name-create">Tag Name *</InputLabel>
                  <OutlinedInput
                    id="name-make"
                    type="name"
                    // multiline={true}
                    // maxRows={5}
                    value={values.name}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Tag Name ?"
                    fullWidth
                    error={Boolean(touched.tag && errors.tag)}
                  // className='tw-h-20'
                  />
                  {touched.tag && errors.tag && (
                    <FormHelperText error id="helper-text-tag-create">
                      {errors.tag}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    {selectedTag ? "Edit Tag" : "Create Tag"}
                  </Button>
                </AnimateButton>
              </Grid>

            </Grid>
          </form>
        )}
      </Formik >
    </>
  );
};

export default TagForm;
