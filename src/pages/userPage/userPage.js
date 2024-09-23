// material-ui
import { Grid } from '@mui/material';

// project import
import { useParams } from '../../../node_modules/react-router-dom/dist/index';
import { useGetUsersQuery } from 'store/api/usersApiSlice';
import AdminQuestionCommentComponent from 'pages/question-page/adminUserComments';
import { selectUser } from 'store/reducers/user';
import { useSelector } from 'react-redux';
import AdminUserReportComponent from 'pages/question-page/adminUserReports';
import { Divider } from '../../../node_modules/@mui/material/index';


// ================================|| REGISTER ||================================ //

const UserPage = () => {
    const { id } = useParams();
    const { data: users } = useGetUsersQuery();
    const currentUser = useSelector(selectUser);
    const targetUser = users?.find(user => user.id === id)

    return (
        <div className='tw-w-full tw-flex tw-justify-center tw-bg-white tw-p-4 tw-border-[#bbb] tw-rounded-lg tw-border-solid tw-border-[1px]'>
            <Grid container xs={10} className='tw-self-center'>
                <p className='tw-text-black tw-mb-4 tw-text-lg'>user: {id} </p>
                <Grid container xs={12} className='tw-flex tw-flex-row tw-flex-wrap tw-justify-between'>
                    <Grid xs={5} item className='tw-my-3 tw-w-full'>
                        <div className='tw-rounded-sm tw-border-gray-300 tw-border-solid tw-border-l-0 tw-border-r-0 tw-border-t-0 tw-flex tw-flex-row tw-gap-3 tw-p-2'>
                            <p className='tw-text-black tw-text-lg tw-mb-2'>DisplayName: </p>
                            <p className='tw-text-black tw-text-lg tw-mb-2'>{targetUser?.displayName || 'not defined'}</p>
                        </div>
                    </Grid>
                    <Grid xs={5} item className='tw-my-3 tw-w-full'>
                        <div className='tw-rounded-sm tw-border-gray-300 tw-border-solid tw-border-l-0 tw-border-r-0 tw-border-t-0 tw-flex tw-flex-row tw-gap-3 tw-p-2'>
                            <p className='tw-text-black tw-text-lg tw-mb-2'>Email: </p>
                            <p className='tw-text-black tw-text-lg tw-mb-2'>{targetUser?.email || 'not defined'}</p>
                        </div>
                    </Grid>
                    <Grid xs={5} item className='tw-my-3 tw-w-full'>
                        <div className='tw-rounded-sm tw-border-gray-300 tw-border-solid tw-border-l-0 tw-border-r-0 tw-border-t-0 tw-flex tw-flex-row tw-gap-3 tw-p-2'>
                            <p className='tw-text-black tw-text-lg tw-mb-2'>Country: </p>
                            <p className='tw-text-black tw-text-lg tw-mb-2'>{targetUser?.country || 'not defined'}</p>
                        </div>
                    </Grid>
                    <Grid xs={5} item className='tw-my-3 tw-w-full'>
                        <div className='tw-rounded-sm tw-border-gray-300 tw-border-solid tw-border-l-0 tw-border-r-0 tw-border-t-0 tw-flex tw-flex-row tw-gap-3 tw-p-2'>
                            <p className='tw-text-black tw-text-lg tw-mb-2'>anon Mode: </p>
                            <p className='tw-text-black tw-text-lg tw-mb-2'>{targetUser?.anon || 'not defined'}</p>
                        </div>
                    </Grid>
                    <Grid xs={5} item className='tw-my-3 tw-w-full'>
                        <div className='tw-rounded-sm tw-border-gray-300 tw-border-solid tw-border-l-0 tw-border-r-0 tw-border-t-0 tw-flex tw-flex-row tw-gap-3 tw-p-2'>
                            <p className='tw-text-black tw-text-lg tw-mb-2'>Name: </p>
                            <p className='tw-text-black tw-text-lg tw-mb-2'>{targetUser?.name || 'not defined'}</p>
                        </div>
                    </Grid>
                    <Grid xs={5} item className='tw-my-3 tw-w-full'>
                        <div className='tw-rounded-sm tw-border-gray-300 tw-border-solid tw-border-l-0 tw-border-r-0 tw-border-t-0 tw-flex tw-flex-row tw-gap-3 tw-p-2'>
                            <p className='tw-text-black tw-text-lg tw-mb-2'>XP: </p>
                            <p className='tw-text-black tw-text-lg tw-mb-2'>{targetUser?.xp || 'not defined'}</p>
                        </div>
                    </Grid>
                </Grid>
                <Divider sx={{ borderStyle: 'dashed', width: '100%', margin: '10px 0px 5px 0px' }} />
                <h2 className='tw-px-4'>Reports:</h2>
                <div className='tw-max-h-[400px] tw-w-full tw-p-3 tw-overflow-y-scroll'>
                    <AdminUserReportComponent userId={id} currentUser={currentUser} />
                </div>
                <Divider sx={{ borderStyle: 'dashed', width: '100%', margin: '10px 0px 5px 0px' }} />
                <h2 className='tw-px-4'>Comments:</h2>
                <div className='tw-max-h-[400px] tw-w-full tw-p-3 tw-overflow-y-scroll'>
                    <AdminQuestionCommentComponent userId={id} currentUser={currentUser} />
                </div>
            </Grid>
        </div>
    )
};

export default UserPage;
