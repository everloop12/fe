/* eslint-disable no-unused-vars */
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import { useGetBoardUsersQuery } from 'store/api/leaderBoardSlice';
import { useEffect, useState } from 'react';
import { Avatar, CircularProgress, Button } from '@mui/material';  // Ensure Button is imported
import { useSelector } from 'react-redux';
import { selectUser } from 'store/reducers/user';
import BadgeComponent from 'pages/profile/badgesComponent';
import calculateLevelFromXP from 'utils/xp';

export default function LeaderBoard() {
    const currentUser = useSelector(selectUser);
    const [page, setPage] = useState(1);
    const { country, uid, university } = currentUser;
    const [fData, setFData] = useState([]);
    const [mode, setMode] = useState(null);
    const [expanded, setExpanded] = useState(true);

    const { data: boardUsers, isLoading, isSuccess, isFetching } = useGetBoardUsersQuery(page);

    useEffect(() => {
        if (isSuccess) {
            let sortedData = Object.values(boardUsers.entities).sort((a, b) => b.xp - a.xp);

            if (mode === 'country') {
                sortedData = sortedData.filter((x) => x.country === country);
            } else if (mode === 'university') {
                sortedData = sortedData.filter((x) => x.university === university);
            }

            setFData(sortedData);
        }
    }, [isSuccess, mode, boardUsers]);

    return (
        <div>
            <div className='tw-w-full tw-flex tw-justify-between'>
                <Button
                    type="button"
                    disabled={page < 2}
                    variant="contained"
                    color="primary"
                    className='tw-mx-2 tw-my-1 tw-h-[30px]'
                    onClick={() => {
                        if (page > 1 && !isFetching) setPage(page - 1);
                    }}
                >
                    {"<"}
                </Button>
                <div>
                    <p className='tw-text-center tw-m-1'>LeaderBoard Page: {page}</p>
                </div>
                <Button
                    type="button"
                    disabled={fData.length < 20}
                    variant="contained"
                    color="primary"
                    className='tw-mx-2 tw-my-1 tw-h-[30px]'
                    onClick={() => {
                        if (!isFetching && fData.length === 20) setPage(page + 1);
                    }}
                >
                    {">"}
                </Button>
            </div>

            <div className='tw-flex tw-gap-3 tw-px-4'>
                <p>Filter by: </p>
                <button
                    onClick={() => { setMode(null); }}
                    className={`tw-bg-transparent tw-border-none tw-cursor-pointer ${!mode ? 'tw-text-blue-500' : ''}`}
                >
                    No filter
                </button>
                <button
                    onClick={() => { setMode('country'); }}
                    className={`tw-bg-transparent tw-border-none tw-cursor-pointer ${mode === 'country' ? 'tw-text-blue-500' : ''}`}
                >
                    Country
                </button>
                <button
                    onClick={() => { setMode('university'); }}
                    className={`tw-bg-transparent tw-border-none tw-cursor-pointer ${mode === 'university' ? 'tw-text-blue-500' : ''}`}
                >
                    University
                </button>
            </div>

            <div style={{ height: '280px', width: '100%', overflowY: 'scroll' }}>
                {isFetching && (
                    <div className='tw-w-[100%] tw-flex tw-justify-center tw-p-4'>
                        <CircularProgress />
                    </div>
                )}
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <div>
                        {isSuccess && !isFetching && fData.map((x, i) => (
                            <div key={x.id}>
                                <Divider variant="middle" component="li" />
                                <ListItem className={uid === x.id ? 'tw-bg-slate-500' : ''} alignItems="flex-start">
                                    <ListItemAvatar>
                                        <div style={{ borderColor: `hsl(${200 + calculateLevelFromXP(x?.xp || 0) * 6}, ${100}%, ${80}%)` }} className='tw-border-[#1890ff] tw-font-bold tw-flex tw-items-center tw-justify-center tw-border-solid tw-w-[30px] tw-h-[30px] tw-rounded-full tw-z-10 tw-bg-white tw-mr-[-18px]'>
                                            <div className='tw-text-[10px]'>{calculateLevelFromXP(x?.xp || 0)}</div>
                                        </div>
                                    </ListItemAvatar>

                                    <ListItemText
                                        primary={
                                            <div className='tw-flex tw-flex-wrap tw-justify-between'>
                                                <div className='tw-flex tw-flex-col tw-gap-2 tw-mb-2'>
                                                    <a href={`/viewProfile/${x.id}`} className='tw-text-slate-950'>
                                                        <div>
                                                            {x.name}
                                                        </div>
                                                    </a>
                                                    <BadgeComponent small id={x.id} />
                                                </div>
                                                <div className='tw-flex tw-flex-col tw-gap-2 tw-mb-2'>
                                                    <div className='tw-text-end'>Rank: {(page - 1) * 20 + i + 1}</div>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {`${x.country ?? 'Not specified'}`}
                                                    </Typography>
                                                </div>
                                            </div>
                                        }
                                    />
                                </ListItem>
                            </div>
                        ))}
                        {fData.length === 0 && !isFetching && (
                            <div className='tw-w-full tw-flex tw-justify-center tw-p-4'>
                                End of LeaderBoard
                            </div>
                        )}
                    </div>
                </List>
            </div>
        </div>
    );
}
