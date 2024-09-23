/* eslint-disable no-unused-vars */
import PersonIcon from '@mui/icons-material/Person';
// material-ui
import {
    Grid,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/reducers/user';
import BadgeComponent from './badgesComponent';
import calculateLevelFromXP from 'utils/xp';
import { useNavigate, useParams } from '../../../node_modules/react-router-dom/dist/index';
import { useGetOtherUserQuery } from 'store/api/usersApiSlice';

// import axios from '../../../../node_modules/axios/index';

// ============================|| FIREBASE - REGISTER ||============================ //

const OtherUserProfile = () => {
    const { id } = useParams();
    const { data: currentUser } = useGetOtherUserQuery(id);
    const level = calculateLevelFromXP(currentUser?.xp || 0)
    const color = `hsl(${200 + level * 6}, ${100}%, ${80}%)`;
    return (
        <Grid container alignItems="center" justifyContent="center" className='tw-bg-white tw-p-8 tw-shadow-md tw-rounded-lg'>
            <Grid item xs={12} className='sm:tw-flex'>
                <div className='tw-flex tw-flex-col tw-justify-between tw-w-full tw-p-1 tw-pr-1 tw-gap-4 md:tw-flex-row'>
                    <div className='tw-flex tw-flex-col tw-gap-4 md:tw-w-[75%]'>
                        <div className='tw-flex tw-flex-col md:tw-flex-row tw-bg-gray-100 tw-p-4 tw-rounded-lg tw-shadow-inner'>
                            <div className='tw-mr-4'>
                                <PersonIcon className='tw-mt-1 tw-mr-2 tw-h-[100px] tw-w-[100px]' />
                            </div>
                            <div>
                                <div className='tw-text-[26px] tw-pt-2'>
                                    DisplayName: {currentUser?.displayName || 'no Display Name'}
                                </div>
                                <div className='tw-text-[16px] tw-flex-wrap tw-flex tw-gap-4'>
                                    <div>
                                        {currentUser?.name || 'No Name'} {currentUser?.lastName || ''}
                                    </div>
                                    <div>
                                        {currentUser?.country || 'No country'}
                                    </div>
                                    <div>
                                        {currentUser?.email || 'No Email'}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='tw-bg-gray-100 tw-p-4 tw-rounded-lg tw-shadow-inner tw-w-full '>
                            <div>
                                <BadgeComponent id={id} />
                            </div>
                        </div>
                    </div>
                    <div className=' tw-bg-gray-100 tw-p-4 tw-rounded-lg tw-shadow-inner md:tw-w-[25%] tw-flex md:tw-flex-col tw-justify-start tw-items-center tw-gap-10 md:tw-gap-4'>
                        <div style={{ borderColor: color }} className='tw-border-[#1890ff] tw-font-bold tw-flex tw-items-center tw-justify-center
           tw-border-solid tw-w-[100px] tw-h-[100px] tw-rounded-full tw-z-10 tw-bg-white tw-mr-[-18px]'>
                            <div>{level}</div>
                        </div>
                        <h2>
                            Xp: {currentUser?.xp || 0}
                        </h2>
                    </div>
                </div>
            </Grid>
        </Grid >
    )
};

export default OtherUserProfile;
