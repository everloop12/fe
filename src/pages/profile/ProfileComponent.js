/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

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
import { Formik } from 'formik';

// project import
// import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';

import axiosInstance from 'utils/axiosInstance';
import { countList, uniList } from 'pages/authentication/auth-forms/countries';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from 'store/reducers/user';
import TestSelect from 'pages/authentication/auth-forms/TestSelect';
import { badWords } from 'utils/filter';


// import axios from '../../../../node_modules/axios/index';

// ============================|| FIREBASE - REGISTER ||============================ //

const ProfileComponent = () => {
    const currentUser = useSelector(selectUser);
    const dispatch = useDispatch();
    const [initialState, setInitialState] = useState(null);
    useEffect(() => {
        setInitialState({
            name: currentUser.name,
            displayName: currentUser.displayName,
            country: currentUser?.country || "",
            university: currentUser?.university || "",
            submit: false
        })

    }, [])

    useEffect(() => { }, [initialState])

    function handleSubmit(data, succ) {
        console.group(data);
        axiosInstance
            .patch('auth/editProfile', {
                ...data
            },
                {
                    headers: { Authorization: `Bearer ${currentUser.token}` }
                })
            .then(() => {
                succ()
                dispatch(setUser({ ...currentUser, ...data }))
            });
    }

    return (
        <>
            {initialState && <Formik
                initialValues={initialState}
                validationSchema={Yup.object().shape({
                    name: Yup.string().min(2).max(255).required('First Name is required'),
                    lastName: Yup.string().min(2).max(255).required('Last Name is required'),
                    displayName: Yup.string().min(2).max(255).required('Display Name is required'),
                    country: Yup.string('Country is required').required('Country is required'),
                    university: Yup.string('University is required').required('University is required'),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if ([values?.name || '', values?.lastName || '', values?.displayName || ''].some(x => badWords.some((y) => x.toLowerCase().includes(y)))) {
                            setStatus({ success: false });
                            setErrors({ submit: 'Do not use bad language' });
                            setSubmitting(false);
                        }
                        else {
                            const { submit, ...submitValues } = values;
                            handleSubmit(submitValues, () => { setStatus({ success: true }) })
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
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue, status }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="name-signup">Name *</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.name && errors.name)}
                                        id="name-login"
                                        type="name"
                                        value={values.name}
                                        name="name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="name"
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
                                    <InputLabel htmlFor="lastName-signup">Last name *</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.lastName && errors.lastName)}
                                        id="lastName-login"
                                        type="lastName"
                                        value={values.lastName}
                                        name="lastName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="lastName"
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
                                    <InputLabel htmlFor="displayName-signup">displayName *</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.displayName && errors.displayName)}
                                        id="displayName-login"
                                        type="displayName"
                                        value={values.displayName}
                                        name="displayName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="displayName"
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
                                    <TestSelect vendorOptions={countList.map(x => x.name)} name="country" placeholder="Country" type="country" value={values.country} onChange={(x) => setFieldValue('country', x)} />
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

                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            {(status?.success || false) &&
                                <Grid item xs={12}>
                                    <FormHelperText sx={{ color: 'green' }}>
                                        Successfully updated
                                    </FormHelperText>
                                </Grid>
                            }
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                                        Save
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
            }
        </>
    );
};

export default ProfileComponent;
