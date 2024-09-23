/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import axiosInstance from 'utils/axiosInstance';
import { Button, Divider, FormHelperText, Grid, InputLabel, OutlinedInput, Stack } from '../../../node_modules/@mui/material/index';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'components/@extended/AnimateButton';
import { useEffect, useState } from 'react';
import moment from '../../../node_modules/moment/moment';
import ReactStars from "react-rating-stars-component";
import { badWords } from 'utils/filter';


const CommentComponent = ({ questionId, currentUser, questionIndex }) => {
    const [comments, setComments] = useState([]);
    const [commented, setCommented] = useState(false);
    const [userComment, setUserComment] = useState('');
    const [edit, setEdit] = useState(false);
    const [avgRating, setAvgRating] = useState(-1);
    const [Loading, setLoading] = useState(false);

    const getQuestionComments = async () => {
        setLoading(true)
        setComments([])
        const commentsR = await axiosInstance.get(`/comments/${questionId}`, { headers: { Authorization: `Bearer ${currentUser?.token}` } })
        const commentsV = commentsR.data.data;
        setComments(commentsV)
        const CIndex = commentsV?.findIndex(x => x.userId === currentUser.uid);
        if (CIndex !== -1) {
            setCommented(true)
            setUserComment(commentsV[CIndex])
        }
        else setCommented(false)
        setLoading(false)
    }

    // const rating = [1, 2, 3, 4, 5];
    useEffect(() => {
        getQuestionComments()
    }, [questionId, questionIndex])

    useEffect(() => {

    }, [avgRating, userComment])

    useEffect(() => {
        if (comments.length > 0) {
            let temp = 0;
            temp = comments.map(x => x.rating)
                .reduce((sum, current) => {
                    return sum + current;
                }, 0) / comments.length;
            temp = temp.toFixed(2)
            setAvgRating(temp)
        }
    }, [comments])


    if (Loading)
        return <h1> Loading comments...</h1>

    return (
        <>
            <Grid container className='tw-border-solid tw-border-2 tw-border-[#80808042] tw-rounded-lg tw-my-4 tw-justify-center'>
                <>
                    {/* <h2 className='tw-px-4'>Feedbacks:</h2> */}
                    {<h2>average rating: {avgRating === -1 ? "no ratings yet" : avgRating}</h2>}

                    <Grid xs={12}>

                        {(!commented || edit) ? <Formik
                            initialValues={edit ? { comment: userComment.text, rating: userComment?.rating } : { comment: '' }}
                            validationSchema={Yup.object().shape({
                                comment: Yup.string().max(500).required('Comment body is required'),
                                rating: Yup.number().required('rating is required'),
                            })}
                            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                try {
                                    if (badWords.some((y) => values.comment.toLowerCase().includes(y))) {
                                        setStatus({ success: false });
                                        setErrors({ submit: 'Do not use bad language' });
                                        setSubmitting(false);
                                    }
                                    else {
                                        if (edit) {
                                            await axiosInstance.patch(`/comments/${userComment.id}`, { text: values.comment, rating: values.rating }, { headers: { Authorization: `Bearer ${currentUser.token}` } }).then((data) => {
                                                setComments([...comments.filter(x => x.id !== userComment.id), { ...data.data.data }])
                                                setUserComment(data.data.data)
                                            })
                                            setEdit(false)
                                            setStatus({ success: false });
                                            setSubmitting(false);
                                        }
                                        else {
                                            axiosInstance.post(`/comments/add/${questionId}`, { text: values.comment, rating: values.rating }, { headers: { Authorization: `Bearer ${currentUser.token}` } })
                                                .then((data) => {
                                                    setComments([...comments, { ...data.data.data }])
                                                    setUserComment({ ...data.data.data })
                                                    setCommented(true)
                                                })
                                                .catch(err => console.log(err))
                                            setStatus({ success: false });
                                            setSubmitting(false);
                                        }
                                    }
                                } catch (err) {
                                    console.error(err);
                                    setStatus({ success: false });
                                    setErrors({ submit: err.message });
                                    setSubmitting(false);
                                }
                            }}
                        >
                            {({ errors, handleBlur, handleChange, handleSubmit, values, setFieldValue }) => (

                                <form noValidate onSubmit={handleSubmit}>
                                    <Grid className='tw-p-6' container spacing={3}>
                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="comment-create">Comment*</InputLabel>
                                                <OutlinedInput
                                                    id="comment-make"
                                                    type="text"
                                                    multiline={true}
                                                    maxRows={5}
                                                    value={values.comment}
                                                    name="comment"
                                                    onBlur={handleBlur}
                                                    onChange={(x) => {
                                                        if (x.target.value.length < 500)
                                                            handleChange(x)
                                                    }}
                                                    placeholder="comment"
                                                    fullWidth
                                                    error={Boolean(errors.comment)}
                                                />
                                                {errors.comment && (
                                                    <FormHelperText error id="helper-text-comment-create">
                                                        {errors.comment}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="rating-create">Rating*</InputLabel>
                                                <ReactStars
                                                    count={5}
                                                    size={24}
                                                    value={values.rating}
                                                    name="rating"
                                                    onChange={(value) => { setFieldValue('rating', value) }}
                                                    emptyIcon={<i className="far fa-star"></i>}
                                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                    fullIcon={<i className="fa fa-star"></i>}
                                                    activeColor="#ffd700"
                                                />
                                                {errors.rating && (
                                                    <FormHelperText error id="helper-text-rating-create">
                                                        {errors.rating}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <AnimateButton>
                                                <Button type='submit' variant='contained'>
                                                    {edit ? 'Edit Feedback' : 'Submit Feedback'}
                                                </Button>
                                                <Button className='tw-ml-2' variant='contained' onClick={() => setEdit(false)}>
                                                    cancel
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                </form>
                            )}
                        </Formik > : <> </>}
                    </Grid>
                    <Divider sx={{ borderStyle: 'dashed', width: '100%' }} />
                    {userComment && !edit &&
                        <><Divider sx={{ borderStyle: 'dashed', width: '100%' }} />
                            <div className='tw-flex tw-justify-between tw-w-full tw-flex-col md:tw-flex-row'>
                                <h3 className='tw-ml-4'>
                                    Your Feedback:
                                </h3>
                                <div className='tw-flex tw-justify-around'>
                                    <Button className='tw-mx-1 tw-mt-4' variant='contained' onClick={() => {
                                        setEdit(true)
                                    }}>
                                        Edit
                                    </Button>
                                    <Button className='tw-mx-1 tw-mt-4' variant='contained' onClick={() => {
                                        axiosInstance.delete(`/comments/${userComment.id}`, { headers: { Authorization: `Bearer ${currentUser.token}` } }).then(() => {
                                            setUserComment(null);
                                            setCommented(false)
                                        })
                                    }}>
                                        Delete
                                    </Button>
                                </div>
                            </div>
                            <Grid xs={12} className=' tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-items-center tw-rounded-lg tw-p-4 tw-mb-4 tw-border-2 tw-border-gray-300'>
                                <Grid xs={9} className='tw-text-lg tw-font-semibold'>
                                    <div className='tw-m-0 tw-overflow-clip tw-text-ellipsis tw-w-[200px]'>
                                        {userComment.text}
                                    </div>
                                    <ReactStars
                                        edit={false}
                                        count={5}
                                        size={24}
                                        value={userComment.rating}
                                        emptyIcon={<i className="far fa-star"></i>}
                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        activeColor="#ffd700"
                                    />
                                </Grid>
                                <Grid xs={3} className='tw-text-sm tw-font-semibold tw-text-gray-400 tw-text-end'>
                                    {moment(userComment.createdAt).fromNow()}
                                </Grid>
                            </Grid>
                        </>
                    }
                    {[...comments].filter(x => x.userId !== currentUser.uid).reverse().map((comment, i) => (
                        <>
                            <Divider sx={{ borderStyle: 'dashed', width: '100%' }} />
                            <Grid xs={12} key={`comment${i}`} className=' tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-items-center tw-rounded-lg tw-p-4 tw-mb-4 tw-border-2 tw-border-gray-300'>
                                <Grid xs={9} className='tw-text-lg tw-font-semibold tw-w-[200px]'>
                                    <div className='tw-m-0 tw-overflow-clip tw-text-ellipsis'>
                                        {comment.text}
                                    </div>
                                    <ReactStars
                                        edit={false}
                                        count={5}
                                        size={24}
                                        value={comment.rating}
                                        emptyIcon={<i className="far fa-star"></i>}
                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        activeColor="#ffd700"
                                    />
                                </Grid>
                                <Grid xs={3} className='tw-text-sm tw-font-semibold tw-text-gray-400 tw-text-end'>
                                    {moment(comment.createdAt).fromNow()}
                                </Grid>
                            </Grid>

                        </>
                    ))}
                </>
            </Grid >
        </>
    )
}

export default CommentComponent