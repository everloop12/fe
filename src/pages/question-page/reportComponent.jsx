/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack } from '../../../node_modules/@mui/material/index';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'components/@extended/AnimateButton';
import { useEffect, useState } from 'react';
import axiosInstance from 'utils/axiosInstance';
import { badWords } from 'utils/filter';
// import axiosInstance from 'utils/axiosInstance';

const ReportComponent = ({ questionId, currentUser }) => {
    const [userReport, setUserReport] = useState(null)
    const getReport = async () => {
        const report = await axiosInstance.get(`/reports/${questionId}`, { headers: { Authorization: `Bearer ${currentUser.token}` } })
        if (report.data.data.length > 0)
            setUserReport(report.data.data[0])
        else
            setUserReport(null)
    }


    useEffect(() => {
        setUserReport('loading')
        getReport()
    }, [questionId])
    if (userReport === 'loading') {
        return <h1>loading Report...</h1>
    }

    if (userReport)
        return (
            <h1>You have reported this question.</h1>
        )
    else
        return (
            <Formik
                initialValues={{}}
                validationSchema={Yup.object().shape({
                    report: Yup.string().max(500).required('Report body is required'),

                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (badWords.some((y) => values.report.toLowerCase().includes(y))) {
                            setStatus({ success: false });
                            setErrors({ submit: 'Do not use bad language' });
                            setSubmitting(false);
                        } else {
                            await axiosInstance.post(`/reports/${questionId}`,
                                { reason: values.report }
                                , { headers: { Authorization: `Bearer ${currentUser.token}` } })
                                .then((() => {
                                    setUserReport(true)
                                }
                                ))
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
                {({ errors, handleBlur, handleChange, handleSubmit, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid className='tw-p-6' container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="report-create">Report*</InputLabel>
                                    <OutlinedInput
                                        id="report-make"
                                        type="report"
                                        multiline={true}
                                        maxRows={5}
                                        value={values.report}
                                        name="report"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="report ?"
                                        fullWidth
                                        error={Boolean(errors.report)}
                                    />
                                    {errors.report && (
                                        <FormHelperText error id="helper-text-report-create">
                                            {errors.report}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button type='submit' variant='contained'>
                                        submit Report
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik >
        )
}

export default ReportComponent