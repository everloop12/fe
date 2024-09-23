/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import YupPassword from 'yup-password';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";

// material-ui
import {
    Button,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
} from '@mui/material';

// third party
import * as Yup from 'yup';
YupPassword(Yup);
import { Formik } from 'formik';

// project import
// import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';

import axiosInstance from 'utils/axiosInstance';
import { countList, uniList } from 'pages/authentication/auth-forms/countries';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from 'store/reducers/user';
import TestSelect from 'pages/authentication/auth-forms/TestSelect';
import { fireAuth } from 'pages/authentication/firebase';


// import axios from '../../../../node_modules/axios/index';

// ============================|| FIREBASE - REGISTER ||============================ //

const ChangePasswordComponent = () => {
    const fireUser = fireAuth.currentUser
    const fireEmail = fireAuth.currentUser.email
    const [passError, setPassError] = useState('')


    async function handleSubmit(data, succ) {

        const credential = EmailAuthProvider.credential(
            fireEmail,
            data.oldPassword
        );
        // await reauthenticateWithCredential(fireUser, credential).then(async (data) => {
        await updatePassword(fireUser, data.newPassword)

        // }).catch((error) => {
        //     console.log(error)
        //     setPassError("wrong Password")
        // });
        succ();
    }

    return (
        <>
            <Formik
                initialValues={{
                    oldPassword: '',
                    newPassword: '',
                    confirmPassowrd: ''
                }}
                validationSchema={Yup.object().shape({
                    newPassword: Yup.string().password().required()
                        .min(12, 'must be at least 12 charachters long')
                        .minSymbols(1, 'Must contain at least 1 symbol')
                        .minNumbers(1, 'Must contain at least 1 number')
                        .minUppercase(1, 'Must contain at least 1 uppercase charachter')
                        .minLowercase(1, 'Must contain at least 1 lowercase charachter'),
                    confirmPassowrd: Yup.string()
                        .required('Please retype your password.')
                        .oneOf([Yup.ref('newPassword')], 'Your passwords do not match.')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setPassError('')
                        handleSubmit(values, () => { setStatus({ success: true }) })
                        setSubmitting(false);
                    } catch (err) {
                        console.error(err);
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue, status }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="oldPassword-signup">Old Password *</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.oldPassword && errors.oldPassword)}
                                        id="oldPassword-login"
                                        type="oldPassword"
                                        value={values.oldPassword}
                                        name="oldPassword"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Old Password"
                                        inputProps={{}}
                                    />
                                    {touched.oldPassword && errors.oldPassword && (
                                        <FormHelperText error id="helper-text-oldPassword-signup">
                                            {errors.oldPassword}
                                        </FormHelperText>
                                    )}

                                    {passError && (
                                        <FormHelperText error id="helper-text-oldPassword-signup">
                                            {passError}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="newPassword-signup">New Password *</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.newPassword && errors.newPassword)}
                                        id="newPassword-login"
                                        type="password"
                                        value={values.newPassword}
                                        name="newPassword"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="New Password"
                                        inputProps={{}}
                                    />
                                    {touched.newPassword && errors.newPassword && (
                                        <FormHelperText error id="helper-text-newPassword-signup">
                                            {errors.newPassword}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="confirmPassowrd-signup">Confirm new password *</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.confirmPassowrd && errors.confirmPassowrd)}
                                        id="confirmPassowrd-login"
                                        type='password'
                                        value={values.confirmPassowrd}
                                        name="confirmPassowrd"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Confirm Passowrd"
                                        inputProps={{}}
                                    />
                                    {touched.confirmPassowrd && errors.confirmPassowrd && (
                                        <FormHelperText error id="helper-text-confirmPassowrd-signup">
                                            {errors.confirmPassowrd}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>





                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            {((status?.success || false) && !passError) &&
                                <Grid item xs={12}>
                                    <FormHelperText sx={{ color: 'green' }}>
                                        Successfully updated
                                    </FormHelperText>
                                </Grid>
                            }
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                                        Update password
                                    </Button>
                                </AnimateButton>
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

export default ChangePasswordComponent;
