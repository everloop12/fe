/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import axiosInstance from 'utils/axiosInstance';
import { Button, Divider, Grid } from '../../../node_modules/@mui/material/index';

import { useEffect, useState } from 'react';
import moment from '../../../node_modules/moment/moment';
import ReactStars from "react-rating-stars-component";
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';


const AdminCommentComponent = ({ questionId, currentUser }) => {
    const [comments, setComments] = useState([]);
    const [avgRating, setAvgRating] = useState(-1);
    const [Loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const getQuestionComments = async () => {
        setLoading(true)
        setComments([])
        const commentsR = await axiosInstance.get(`/comments/${questionId}`, { headers: { Authorization: `Bearer ${currentUser?.token}` } })
        const commentsV = commentsR.data.data;
        setComments(commentsV)
        setLoading(false)
    }

    // const rating = [1, 2, 3, 4, 5];
    useEffect(() => {
        getQuestionComments()
    }, [questionId])

    useEffect(() => {

    }, [avgRating])

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
            <Grid container className='tw-border-solid tw-border-2 tw-border-[#80808042] tw-rounded-lg tw-my-4'>
                <>
                    <h2 className='tw-px-4'>Comments:</h2>
                    {avgRating > 0 && <h2>average rating: {avgRating}</h2>}

                    <Divider sx={{ borderStyle: 'dashed', width: '100%' }} />
                    {[...comments].reverse().map((comment, i) => (
                        <>
                            <Divider sx={{ borderStyle: 'dashed', width: '100%' }} />
                            <div className='tw-flex tw-justify-between tw-w-full'>
                                <Button onClick={() => { navigate(`/user/${comment?.user.id}`) }}>
                                    <h3 className='tw-ml-4'>
                                        user: {comment?.user?.displayName || comment?.user?.email || "no username"}
                                    </h3>
                                </Button>
                                <div>
                                    <Button className='tw-mx-1 tw-mt-4' variant='contained' onClick={() => {
                                        axiosInstance.delete(`/comments/${comment.id}`, { headers: { Authorization: `Bearer ${currentUser.token}` } }).then(() => {
                                            setComments(comments.filter(x => x.id !== comment.id))
                                        })
                                    }}>
                                        Delete
                                    </Button>
                                </div>
                            </div>
                            <Grid xs={12} key={`comment${i}`} className=' tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-items-center tw-rounded-lg tw-p-4 tw-mb-4 tw-border-2 tw-border-gray-300'>
                                <Grid xs={9} className='tw-text-lg tw-font-semibold'>
                                    <p className='tw-m-0'>
                                        {comment.text}
                                    </p>
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

export default AdminCommentComponent