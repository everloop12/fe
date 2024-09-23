// material-ui
import { Grid } from '@mui/material';

// project import
// import UserList from './userList';
import { InputAdornment, TextField } from '@mui/material/index';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useGetUserListQuery } from 'store/api/usersApiSlice';
import UserList from './userList';
import moment from '../../../../node_modules/moment/moment';



// ================================|| REGISTER ||================================ //

const UserListPage = () => {
    const { data: users, isLoading } = useGetUserListQuery();
    const searchFilter = (myQuery, users = []) => {
        if (myQuery) {
            const result = users.filter((item) => {
                if ([item?.country || '', item?.university || '', item?.email || '', item?.displayName || '', item?.name || ''].some(x => x.toLowerCase().includes(myQuery)))
                    return true
            })
            return result.map((item) => ({
                id: item?.id,
                name: (item?.name?.toLowerCase() || undefined),
                displayName: (item?.displayName?.toLowerCase() || undefined),
                country: (item?.country?.toLowerCase() || undefined),
                university: (item?.university?.toLowerCase() || undefined),
                email: (item?.email?.toLowerCase() || undefined),
                xp: (item?.lastPackageExpiry || false) ? (moment() > moment(item?.lastPackageExpiry) ? 'Subscription Expired' : 'Subscription Active') : 'Not Subscribed'
            }))
        } else
            return users.map((item) => ({
                id: item?.id,
                name: (item?.name?.toLowerCase() || undefined),
                displayName: (item?.displayName?.toLowerCase() || undefined),
                country: (item?.country?.toLowerCase() || undefined),
                university: (item?.university?.toLowerCase() || undefined),
                email: (item?.email?.toLowerCase() || undefined),
                xp: (item?.lastPackageExpiry || false) ? (moment() > moment(item?.lastPackageExpiry) ? 'Subscription Expired' : 'Subscription Active') : 'Not Subscribed'
            }))
    }

    const [query, setQuery] = useState('');
    let filteredUsers = searchFilter(query, users);
    return (
        <div className='tw-flex tw-w-full tw-justify-center'>
            <div className=' tw-self-center tw-w-full tw-align-middle tw-bg-white tw-p-6'>
                <div className='tw-flex tw-justify-between tw-my-4 tw-items-center'>
                    <p className='tw-text-black tw-m-0 tw-text-lg tw-h-fit'>User List </p>
                </div>
                <Grid item >
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        id="filled-basic" label="Search..." variant="filled" onChange={(x) => setQuery(x.target.value)} className='tw-w-full'></TextField>
                    {isLoading ? <p>Loading...</p> : <UserList data={filteredUsers} />}
                </Grid>
            </div>
        </div>
    )
};

export default UserListPage;
