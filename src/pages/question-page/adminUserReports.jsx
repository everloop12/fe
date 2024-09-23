/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import axiosInstance from 'utils/axiosInstance';
import { Button, Divider, Grid } from '../../../node_modules/@mui/material/index';

import { useEffect, useState } from 'react';
import moment from '../../../node_modules/moment/moment';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';


const AdminUserReportComponent = ({ userId, currentUser }) => {

    const navigate = useNavigate();
    const [reports, setReports] = useState([]);
    const [Loading, setLoading] = useState(false);

    const getQuestionReports = async () => {
        setLoading(true)
        setReports([])
        const reportsR = await axiosInstance.get(`/reports/user/${userId}`, { headers: { Authorization: `Bearer ${currentUser?.token}` } })
        const reportsV = reportsR.data.data;
        setReports(reportsV)
        setLoading(false)
    }

    // const rating = [1, 2, 3, 4, 5];
    useEffect(() => {
        getQuestionReports()
    }, [userId])

    if (Loading)
        return <h1> Loading reports...</h1>

    return (
        <>
            <Grid container className='tw-rounded-lg tw-my-4'>
                <>
                    {[...reports].reverse().map((report, i) => (
                        <>
                            <Divider sx={{ borderStyle: 'dashed', width: '100%' }} />
                            <div className='tw-flex tw-justify-between tw-w-full'>
                                <Button onClick={() => { navigate(`/user/${report?.user.id}`) }}>
                                    <h3 className='tw-ml-4'>
                                        Question: {report.questionId}
                                    </h3>
                                </Button>
                                <div>
                                    <Button className='tw-mx-1 tw-mt-4' variant='contained' onClick={() => {
                                        axiosInstance.delete(`/reports/${report.id}`, { headers: { Authorization: `Bearer ${currentUser.token}` } }).then(() => {
                                            setReports(reports.filter(x => x.id !== report.id))
                                        })
                                    }}>
                                        Delete
                                    </Button>
                                </div>
                            </div>
                            <Grid xs={12} key={`report${i}`} className=' tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-items-center tw-rounded-lg tw-p-4 tw-mb-4 tw-border-2 tw-border-gray-300'>
                                <Grid xs={9} className='tw-text-lg tw-font-semibold'>
                                    <p className='tw-m-0'>
                                        {report.reason}
                                    </p>
                                </Grid>
                                <Grid xs={3} className='tw-text-sm tw-font-semibold tw-text-gray-400 tw-text-end'>
                                    {moment(report.createdAt).fromNow()}
                                </Grid>
                            </Grid>

                        </>
                    ))}
                </>
            </Grid >
        </>
    )
}

export default AdminUserReportComponent