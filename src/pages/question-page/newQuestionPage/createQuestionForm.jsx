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
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Checkbox, Input, MenuItem, Select } from '../../../../node_modules/@mui/material/index';
import { selectQuestionById, selectQuestionsResult, useAddNewQuestionMutation, useUpdateQuestionMutation } from 'store/api/questionApiSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';

// ============================|| FIREBASE - REGISTER ||============================ //

const QuestionForm = ({ id = null, selectedQuestion = null, Categories, Tags }) => {
  const [addNewQuestion, {
    isLoading: Aloading,
    isSuccess: AisSuccess,
    isError: AisError,
    error: Aerror
  }] = useAddNewQuestionMutation();

  const [updateQuestion, {
    isLoading: Uloading,
    isSuccess: UisSuccess,
    isError: UisError,
    error: Uerror
  }] = useUpdateQuestionMutation();

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
      navigate('/questionlist');
  }, [isSuccess, navigate])

  useEffect(() => {
    changePassword('');
  }, []);

  useEffect(() => { }, [selectedQuestion])
  const init = selectedQuestion ? selectedQuestion : {
    question: '',
    choices: [
      {
        text: '',
        isCorrect: false,
        index: 0
      },
      {
        text: '',
        isCorrect: false,
        index: 1
      }
    ],
    references: [],
    tagIds: [],
    categoryIds: []
  };
  return (
    <>
      <Formik
        initialValues={init}
        validationSchema={Yup.object().shape({
          question: Yup.string().max(3000).required('Question body is required'),

          // // email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          // password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (selectedQuestion) {
              updateQuestion({ id: values.id, question: values.question, choices: values.choices, references: values.references, tagIds: values.tagIds, categoryIds: values.categoryIds })
            } else {
              addNewQuestion(values);
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
        enableReinitialize={true}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid className='tw-p-6' container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="question-create">Question Body*</InputLabel>
                  <OutlinedInput
                    id="question-make"
                    type="question"
                    multiline={true}
                    maxRows={5}
                    value={values.question}
                    name="question"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Question ?"
                    fullWidth
                    error={Boolean(touched.question && errors.question)}
                  />
                  {touched.question && errors.question && (
                    <FormHelperText error id="helper-text-question-create">
                      {errors.question}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <FieldArray name="choices">
                  {({ insert, remove, push, replace, ...rest }) => (
                    <>
                      {/*<Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary"> */}
                      {(values?.choices?.length || 0) < 5 && <Button
                        type="button" variant="contained" color="primary"
                        className="secondary"
                        onClick={() =>
                          values.choices.length < 5 && push({ text: '', isCorrect: false, index: values.choices.length })
                        }
                      >
                        Add Answer
                      </Button>}
                      <div className='tw-p-6 tw-w-full tw-flex tw-flex-wrap'>
                        {values.choices.length > 0 &&
                          values.choices.map((answer, index) => (
                            <div className='tw-flex tw-min-w-[45%]' key={index}>
                              <div className='tw-px-2' key={index}>
                                <InputLabel htmlFor={`choices.${index}.isCorrect`}>Correct</InputLabel>

                                <div className='tw-flex tw-flex-row'>
                                  <Button
                                    className='tw-min-w-0 tw-w-full'
                                    type="button"
                                    onClick={() => remove(index)}
                                  >
                                    X
                                  </Button>
                                  <Field
                                    className='tw-w-full'
                                    name={`choices.${index}.isCorrect`}
                                    style={{ underline: 'none' }}
                                    type="checkBox"
                                    checked={values.choices[index].isCorrect}
                                  />
                                </div>
                                <ErrorMessage
                                  name={`choices.${index}.isCorrect`}
                                  component="div"
                                  className="field-error"
                                />

                              </div>

                              <div className='tw-px-2'>
                                <InputLabel htmlFor={`choices.${index}.text`}>Text</InputLabel>
                                <OutlinedInput
                                  name={`choices.${index}.text`}
                                  placeholder="Jane Doe"
                                  type="text"
                                  className='tw-w-full input'
                                  value={values.choices[index].text}
                                  onChange={(x) => replace(index, { ...values.choices[index], text: x.target.value })}
                                />
                                <ErrorMessage
                                  name={`choices.${index}.text`}
                                  component="div"
                                  className="field-error"
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    </>
                  )}
                </FieldArray>
              </Grid>

              <Grid item xs={12}>
                <FieldArray name="references">
                  {({ insert, remove, push, replace }) => (
                    <>
                      {values.references.length < 4 && <Button
                        type="button" variant="contained" color="primary"
                        className="secondary"
                        onClick={() => values.references.length < 4 && push('')}
                      >
                        Add Reference
                      </Button>}
                      <div className='tw-p-6 tw-w-full tw-flex tw-flex-wrap'>
                        {values.references.length > 0 &&
                          values.references.map((reference, index) => (
                            <div className='tw-flex tw-min-w-[100%]' key={index}>
                              <div className='tw-px-2'>
                                <InputLabel htmlFor={`references.${index}`}>Remove</InputLabel>

                                <div className='tw-flex tw-flex-row'>
                                  <Button
                                    className='tw-min-w-0 tw-w-full'
                                    type="button"
                                    onClick={() => remove(index)}
                                  >
                                    X
                                  </Button>
                                </div>
                              </div>

                              <div className='tw-px-2 tw-w-full tw-h-fit'>
                                <InputLabel htmlFor={`references.${index}`}>Text</InputLabel>
                                <OutlinedInput
                                  name={`references.${index}`}
                                  placeholder="Jane Doe"
                                  multiline={true}
                                  type="text"
                                  minRows={7}
                                  className='tw-w-full'
                                  value={values.references[index]}
                                  onChange={(x) => replace(index, x.target.value)}

                                />
                                <ErrorMessage
                                  name={`references.${index}`}
                                  component="div"
                                  className="field-error"
                                />
                              </div>
                            </div>
                          ))}

                      </div>
                    </>
                  )}
                </FieldArray>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="tagIds-create">tags*</InputLabel>
                  <Select
                    id="tagIds-make"
                    type="tagIds"
                    multiple
                    value={values.tagIds}
                    name="tagIds"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="tagIds"
                    fullWidth
                    error={Boolean(touched.tagIds && errors.tagIds)}
                  // className='tw-h-20'
                  >
                    {Object.values(Tags.entities).map((cat) => (
                      <MenuItem key={cat.id} value={cat.id}> {cat.name}</MenuItem>
                    ))}

                  </Select>
                  {touched.tagIds && errors.tagIds && (
                    <FormHelperText error id="helper-text-tagIds-create">
                      {errors.tagIds}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>


              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="categoryIds-create">categories*</InputLabel>
                  <Select
                    id="categoryIds-make"
                    type="categoryIds"
                    multiple
                    value={values.categoryIds}
                    name="categoryIds"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="categoryIds"
                    fullWidth
                    error={Boolean(touched.categoryIds && errors.categoryIds)}
                  // className='tw-h-20'
                  >
                    {Object.values(Categories.entities).map((cat) => (
                      <MenuItem key={cat.id} value={cat.id}> {cat.name}</MenuItem>
                    ))}

                  </Select>
                  {touched.categoryIds && errors.categoryIds && (
                    <FormHelperText error id="helper-text-categoryIds-create">
                      {errors.categoryIds}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>


              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    {selectedQuestion ? "Edit Question" : "Create Question"}
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

export default QuestionForm;
