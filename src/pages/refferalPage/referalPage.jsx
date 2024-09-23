// material-ui
import { Grid, Button, InputLabel, OutlinedInput, Typography, Box } from '@mui/material';

// project import
import { selectUser, setUser } from 'store/reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axiosInstance from 'utils/axiosInstance';
import { useGetSubscriptionStatusQuery } from 'store/api/PaymentStatusApiSlice';

// ================================|| REGISTER ||================================ //

const ReferalPage = () => {
    const currentUser = useSelector(selectUser);
    const { referredById, referralCode, token } = currentUser;
    const [refCode, setRefCode] = useState('');
    const [referralCount, setReferralCount] = useState(null);
    const [subed, setSubbed] = useState(false);
    const [claimables, setClaimables] = useState(null);
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const { refetch } = useGetSubscriptionStatusQuery();

    const mileStones = [5, 10, 15];
    const heights = mileStones.map((x, i) => Math.min((i + 1) * 5, (referralCount / x) * 100));

    const getReferralCount = async () => {
        if (token) {
            try {
                const refCount = await axiosInstance.get('referral/count', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setReferralCount(refCount.data.data._count.referredUsers);
            } catch (e) {
                if (e.response && e.response.status === 401) {
                    setError("Unauthorized access. Please log in again.");
                } else {
                    setError("Failed to fetch referral count.");
                }
            }
        } else {
            setError("Token is missing. Please log in again.");
        }
    };

    const getClaimables = async () => {
        if (token) {
            try {
                const data = await axiosInstance.get('referral/claims', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSubbed(data.data.data.can);
                setClaimables({
                    '1': data.data.data.firstMileStone,
                    '2': data.data.data.secondMileStone,
                    '3': data.data.data.thirdMileStone
                });
            } catch (e) {
                if (e.response && e.response.status === 401) {
                    setError("Unauthorized access. Please log in again.");
                } else {
                    setError("Failed to fetch claimable milestones.");
                }
            }
        } else {
            setError("Token is missing. Please log in again.");
        }
    };

    useEffect(() => {
        getReferralCount();
        getClaimables();
    }, []);

    const handleClaim = async (x) => {
        if (token) {
            try {
                await axiosInstance.post('referral/claim', {
                    mileStone: x
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setClaimables({ ...claimables, [String(x)]: false });
                refetch();
            } catch (e) {
                if (e.response && e.response.status === 401) {
                    setError("Unauthorized access. Please log in again.");
                } else {
                    setError(e.response.data.message);
                }
            }
        } else {
            setError("Token is missing. Please log in again.");
        }
    };

    const handleReferal = async () => {
        if (token) {
            try {
                await axiosInstance.post('referral/accept', {
                    referralCode: refCode
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                dispatch(setUser((user) => ({
                    ...user,
                    referredById: "1c2312casdc"
                })));
            } catch (e) {
                setError("Failed to accept referral code.");
            }
        } else {
            setError("Token is missing. Please log in again.");
        }
    };

    return (
        <Box className='tw-flex tw-justify-center tw-items-center tw-py-10'>
            <Box className='tw-bg-white tw-p-10 tw-rounded-lg tw-shadow-lg tw-w-full tw-max-w-[800px]'>
                {referredById ? (
                    <Typography variant="h5" color="textPrimary" align="center">
                        You have already been referred by a user.
                    </Typography>
                ) : (
                    <>
                        <Typography variant="h4" className="tw-text-center tw-mb-4">
                            Referrals
                        </Typography>
                        <Typography variant="body1" className="tw-text-center tw-mb-4">
                            Have you been referred by a fellow user? If yes, please enter their referral code below.
                        </Typography>

                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12} sm={8}>
                                <InputLabel htmlFor="referral-code">Referral Code *</InputLabel>
                                <OutlinedInput
                                    id="referral-code"
                                    name="referral-code"
                                    value={refCode}
                                    onChange={(e) => setRefCode(e.target.value)}
                                    placeholder="Enter Referral Code"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={handleReferal}
                                    className="tw-mt-4"
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                        {/* Display error message if any */}
                        {error && (
                            <Typography variant="body2" color="error" align="center" className="tw-mt-4">
                                {error}
                            </Typography>
                        )}
                    </>
                )}

                <Box className="tw-mt-8">
                    <Typography variant="h6" align="center">
                        Your Referral Code
                    </Typography>
                    <Box className="tw-w-full tw-p-2 tw-text-center tw-bg-gray-100 tw-border-dotted tw-border-gray-300 tw-rounded-md">
                        <Typography variant="h5" color="textSecondary">
                            {referralCode || "No referral code available"}
                        </Typography>
                    </Box>
                </Box>

                <Box className="tw-mt-6">
                    <Typography variant="h6" align="center" className="tw-mb-4">
                        You have referred {referralCount} users.
                    </Typography>
                    {subed ? (
                        mileStones.map((milestone, i) => (
                            <Box key={`milestone-${i}`} className="tw-mb-6">
                                <Typography variant="body1">
                                    Reach {milestone} referrals to get a free package.
                                </Typography>
                                <Box className="tw-bg-gray-200 tw-rounded-lg tw-h-6 tw-relative tw-overflow-hidden">
                                    <Box
                                        className="tw-bg-blue-500 tw-h-full"
                                        style={{ width: `${heights[i]}%` }}
                                    />
                                </Box>
                                <Button
                                    variant="contained"
                                    color="success"
                                    fullWidth
                                    className="tw-mt-4"
                                    disabled={claimables[String(i + 1)] === 'claimed' || !claimables[String(i + 1)]}
                                    onClick={() => handleClaim(i + 1)}
                                >
                                    {claimables[String(i + 1)] === 'claimed' ? 'Claimed' : 'Claim Reward'}
                                </Button>
                            </Box>
                        ))
                    ) : (
                        <Typography variant="body1" align="center">
                            You haven’t subscribed to any packages. Subscribe to claim rewards.
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default ReferalPage;
