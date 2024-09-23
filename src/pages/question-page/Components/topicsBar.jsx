import { Grid, Button } from '@mui/material';
import MainCard from 'components/MainCard';
import TopicsTable from './topicTable';
import { useState } from 'react';
import TagsTable from './tagTable';
import LeaderBoard from 'pages/leaderBoard/leaderboard';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/reducers/user';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const TopicBar = () => {
    const [type, setType] = useState([]);
    const [isLeaderboardExpanded, setIsLeaderboardExpanded] = useState(false); // State for collapsing/expanding leaderboard
    const profile = useSelector(selectUser);
    const focus = profile.settings.focus;

    const toggleLeaderboard = () => {
        setIsLeaderboardExpanded(prevState => !prevState);
    };

    return (
        <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <h5 style={{ margin: "0px" }}>Topics</h5>
                </Grid>
                <Grid item />
            </Grid>
            <Grid container gap={1} alignItems="center" justifyContent="space-between">
                <Grid item xs={12} md={!focus ? 7 : 12}>
                    <MainCard sx={{ mt: 2 }} content={false} className='tw-h-[400px]'>
                        {type === 'TAG' ? 
                            <TagsTable swap={() => setType(type === 'TAG' ? 'CATEGORY' : 'TAG')} /> : 
                            <TopicsTable swap={() => setType(type === 'TAG' ? 'CATEGORY' : 'TAG')} />
                        }
                    </MainCard>
                </Grid>
                {!focus && (
                    <Grid item xs={12} md={4}>
                        <MainCard sx={{ mt: 2 }} content={false}>
                            <div className='tw-w-full'>
                                <Button 
                                    variant="outlined" 
                                    onClick={toggleLeaderboard} 
                                    className='tw-w-full tw-my-2 tw-flex tw-justify-between tw-items-center tw-py-2'
                                    endIcon={isLeaderboardExpanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                                    sx={{
                                        backgroundColor: '#f0f0f0',
                                        borderColor: '#ccc',
                                        '&:hover': {
                                            backgroundColor: '#e0e0e0',
                                        }
                                    }}
                                >
                                    Leaderboard
                                </Button>
                                {isLeaderboardExpanded && (
                                    <div className='tw-h-[368px] tw-w-full'>
                                        <LeaderBoard />
                                    </div>
                                )}
                            </div>
                        </MainCard>
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};

export default TopicBar;
