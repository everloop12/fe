/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

// material-ui
import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import Select from 'react-select';
// project import
import MainCard from 'components/MainCard';
import CategoryChart from './categoryChart';
import { useGetAnalyticsQuery } from 'store/api/CategoryApiSlice';
import moment from 'moment';
import AccuracyChart from './accuracyChart';
import StatDisplay from './StatDisplay';
import QuestionBankCompletionPieChart from './QuestionBankCompletionPieChart'; // Adjust path accordingly



import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGetStatsQuery } from 'store/api/usersApiSlice';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/reducers/user';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const AnalyticsPage = () => {
  const currentUser = useSelector(selectUser);
  const currentId = currentUser?.uid; // Safeguard uid

  const [slot, setSlot] = useState('week');
  const [allTime, setAllTime] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [categoryType, setCategoryType] = useState('clinical'); // Toggle between clinical and preclinical
  const [userPercentile, setUserPercentile] = useState(null); // Use state for userPercentile

  const {
    data: answers = {}, // Default to empty object
    isSuccess,
    refetch
  } = useGetAnalyticsQuery(null, { refetchOnMountOrArgChange: true });

  const { data: stats = [], isSuccess: statsSuccess } = useGetStatsQuery(null, { refetchOnMountOrArgChange: true });

  let highestAnswerCategory;
  let leastSolvedCategory;
  let mostAccurateCategory;
  let leastAccurateCategory;

  let chartX = [];
  let chartY = [];
  let performance = [];
  let allData = [];
  let nonDeletedData = [];
  let perCategoryData = [];
  let answeredQuestions = 0;
  let totalQuestions = 0; 

  // Refetch the data every time the AnalyticsPage mounts
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isSuccess && statsSuccess && answers?.entities) {
    perCategoryData = Object.values(answers.entities || {})
      .filter(category => {
        const isTrial = category?.name?.toLowerCase()?.includes('trial');
        const isSelectedType = categoryType === 'clinical'
          ? !category?.name?.toLowerCase()?.includes('preclinical')
          : category?.name?.toLowerCase()?.includes('preclinical');
        return !isTrial && isSelectedType;
      })
      .map(category => {
        category?.questions?.forEach(question => {
          totalQuestions++;  
          if (question?.answers && question.answers.some(ans => ans.isCorrect)) {
            answeredQuestions++;  
          }
        });
  
        let answersPerCategory = [];
        let nonDeletedAnswersPerCategory = [];
  
        category?.questions?.forEach(question => {
          if (question?.answers) {
            nonDeletedAnswersPerCategory = [...nonDeletedAnswersPerCategory, ...(question?.answers || []).filter(x => !x.deleted)];
            answersPerCategory = [...answersPerCategory, ...(question?.answers || [])];
          }
        });
  
        allData = [...allData, ...answersPerCategory];
        nonDeletedData = [...nonDeletedData, ...nonDeletedAnswersPerCategory];
  
        const allTimePerformance = stats.filter(x => x.categoryId === category.id).reduce((carry, current) => {
          return {
            sum: carry.sum + current.performance * current.questionCount,
            questionCount: carry.questionCount + current.questionCount
          };
        }, { sum: 0, questionCount: 0 });
  
        const currentPerformance = stats.filter(x => x.categoryId === category.id).reduce((carry, current) => {
          return {
            sum: carry.sum + current.activePerformance * current.activeQuestionCount,
            questionCount: carry.questionCount + current.activeQuestionCount
          };
        }, { sum: 0, questionCount: 0 });
  
        const categoryData = {
          name: category?.name || '',
          data: answersPerCategory,
          nddata: nonDeletedAnswersPerCategory,
          currentAvgPerformance: currentPerformance.questionCount ? currentPerformance.sum / currentPerformance.questionCount : 0,
          allTimeAvgPerformance: allTimePerformance.questionCount ? allTimePerformance.sum / allTimePerformance.questionCount : 0
        };
  
        return categoryData;
      });
  
    performance = perCategoryData.map(cat => ({
      name: cat.name,
      value: Math.round((cat.nddata.filter(x => x.isCorrect).length / cat.nddata.length || 0) * 1000) / 10,
      allTimeValue: Math.round((cat.data.filter(x => x.isCorrect).length / cat.data.length || 0) * 1000) / 10,
      performance: cat.currentAvgPerformance,
      allTimeperformance: cat.allTimeAvgPerformance
    }));
  
    const totalUserPerformance = performance.reduce((sum, cat) => sum + cat.performance, 0);
    const averageUserPerformance = performance.length ? totalUserPerformance / performance.length : 0;
  


    highestAnswerCategory = perCategoryData.reduce((max, current) => (current?.data?.length > max?.data?.length ? current : max), perCategoryData[0]);

    leastSolvedCategory = perCategoryData.reduce((max, current) => (current?.data?.length < max?.data?.length ? current : max), perCategoryData[0]);

    mostAccurateCategory = perCategoryData.reduce(
      (max, current) =>
        (current?.data?.filter(x => x.isCorrect).length / current?.data?.length || -1) >
        (max?.data?.filter(x => x.isCorrect).length / max?.data?.length || -1)
          ? current
          : max,
      perCategoryData[0]
    );

    leastAccurateCategory = perCategoryData.reduce((max, current) => {
      if (!current?.data?.length) return max;
      if (!max?.data?.length) return current;
      return (current?.data?.filter(x => x.isCorrect).length / current?.data?.length) <
        (max?.data?.filter(x => x.isCorrect).length / max?.data?.length)
        ? current
        : max;
    }, perCategoryData[0]);

    // Dynamic calculation based on the time slot
    let finalShowData;
    let finalAllShowData;

    if (slot === 'day') {
      const hours = Array(24).fill('');
      const hourChartNames = hours.map((hour, i) => ({
        name: moment().subtract(i, 'hours').format('HH:00'),
        value: moment().subtract(i, 'hours').format('YY MMM DD HH')
      }));

      const data = perCategoryData.map(x => ({
        ...x,
        data: hourChartNames.map(data => ({
          ...data,
          data: x.data.filter(x => moment(x.createdAt).format('YY MMM DD HH') === data.value)
        }))
      }));

      const filteredData = hourChartNames.map(data => ({
        ...data,
        data: allData.filter(x => moment(x.createdAt).format('YY MMM DD HH') === data.value)
      }));

      finalAllShowData = filteredData;
      finalShowData = data;
    } else if (slot === 'week') {
      const days = [0, 1, 2, 3, 4, 5, 6];
      const dayChartNames = days.map(day => ({
        name: moment().subtract(day, 'days').format('dddd'),
        value: moment().subtract(day, 'days').format('YY MMM DD')
      }));

      const data = perCategoryData.map(x => ({
        ...x,
        data: dayChartNames.map(data => ({
          ...data,
          data: x.data.filter(x => moment(x.createdAt).format('YY MMM DD') === data.value)
        }))
      }));

      const filteredData = dayChartNames.map(data => ({
        ...data,
        data: allData.filter(x => moment(x.createdAt).format('YY MMM DD') === data.value)
      }));

      finalAllShowData = filteredData;
      finalShowData = data;
    } else if (slot === 'month') {
      const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      const monthChartNames = months.map(month => ({
        name: moment().subtract(month, 'months').format('MMMM'),
        value: moment().subtract(month, 'months').format('MMMM YYYY')
      }));

      const data = perCategoryData.map(x => ({
        ...x,
        data: monthChartNames.map(data => ({
          ...data,
          data: x.data.filter(x => moment(x.createdAt).format('MMMM YYYY') === data.value)
        }))
      }));

      const filteredData = monthChartNames.map(data => ({
        ...data,
        data: allData.filter(x => moment(x.createdAt).format('MMMM YYYY') === data.value)
      }));

      finalAllShowData = filteredData;
      finalShowData = data;
    }

    // Rebuild chartX and chartY based on the slot
    chartX = finalShowData?.[0]?.data?.map(data => data.name)?.reverse() || [];
    chartY = finalShowData?.map(x => ({
      name: x.name,
      data: x.data?.map(xentity => xentity.data.length)?.reverse() || []
    })) || [];
  }

  const handleCategoryTypeChange = (event, newCategoryType) => {
    if (newCategoryType !== null) {
      setCategoryType(newCategoryType);
    }
  };

  return (
  
<div style={{ width: '100%', transform: 'scale(0.95)', transformOrigin: 'top left', overflowX: 'hidden' }}>
  <Grid container rowSpacing={4.5} columnSpacing={2.75}>
    <Grid item xs={12} sx={{ mb: -2.25 }}>
      <Typography variant="h5">Dashboard</Typography>
    </Grid>
    {/* existing components */}
    
    <Grid item xs={12}>
      <div className='tw-w-full tw-flex tw-justify-end'>
        <Button variant='contained' onClick={() => { setAllTime(!allTime); }}>
          {allTime ? 'Switch to current answers' : 'Switch to all-time data'}
        </Button>
      </div>

      <div className='tw-w-full tw-flex tw-justify-center tw-mt-4'>
        <ToggleButtonGroup
          color="primary"
          value={categoryType}
          exclusive
          onChange={handleCategoryTypeChange}
          aria-label="Category Type"
        >
          <ToggleButton value="clinical">Clinical</ToggleButton>
          <ToggleButton value="preclinical">Preclinical</ToggleButton>
        </ToggleButtonGroup>
      </div>

      {/* Pie Chart */}
      <div className="tw-w-full tw-flex tw-justify-center tw-mt-4">
        <QuestionBankCompletionPieChart answered={answeredQuestions} total={totalQuestions} />
      </div>

      <div className='tw-pl-4 tw-mt-4'>
        <ResponsiveContainer width='100%' height={550}>
          <BarChart layout='vertical' width="100%" height={250} data={performance}>
            <XAxis domain={[0, 100]} type="number" />
            <YAxis width={100} dataKey="name" type="category" />
            <Tooltip formatter={(value) => Math.round(value)} />
            <Legend />
            <Bar dataKey={allTime ? 'allTimeValue' : 'value'} fill="#8884d8" />
            <Bar dataKey={allTime ? 'allTimeperformance' : 'performance'} fill="#f3cd5a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Grid>

    




    {/* Continue with the rest of your components */}
    <Grid item xs={12}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">Solved Questions</Typography>
        </Grid>
        <Grid item>
          <Stack direction="row" alignItems="center" spacing={0}>
            <Button
              size="small"
              onClick={() => setSlot('month')}
              color={slot === 'month' ? 'primary' : 'secondary'}
              variant={slot === 'month' ? 'outlined' : 'text'}
            >
              This Year
            </Button>
            <Button
              size="small"
              onClick={() => setSlot('week')}
              color={slot === 'week' ? 'primary' : 'secondary'}
              variant={slot === 'week' ? 'outlined' : 'text'}
            >
              This Week
            </Button>
            <Button
              size="small"
              onClick={() => setSlot('day')}
              color={slot === 'day' ? 'primary' : 'secondary'}
              variant={slot === 'day' ? 'outlined' : 'text'}
            >
              Today
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <MainCard content={false} sx={{ mt: 1.5 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          {isSuccess &&
            <CategoryChart slot={slot} chartX={chartX} chartY={chartY} />
          }
        </Box>
      </MainCard>
    </Grid>
  </Grid>
</div>

  
  );
};
export default AnalyticsPage;