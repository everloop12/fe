/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Box, Button, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { initExam, setRevision, setTopics } from 'store/reducers/exam';
import { useResetSelectCategoriesMutation } from 'store/api/answersApiSlice';
import { useGetUserQuestionDataQuery } from 'store/api/questionApiSlice';
import { useGetSubscriptionStatusQuery } from 'store/api/PaymentStatusApiSlice';
import ConfirmationModal from 'pages/Components/ConfirmationComponent/Confirmation';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Dot from 'components/@extended/Dot';
import CustomLoader from '../CustomLoader';
import moment from 'moment';
import { selectUser } from 'store/reducers/user';

function createData(id, category, progress, accuracy, correctQs, answeredQs) {
  return { id, category, progress, accuracy, correctQs, answeredQs };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'category',
    align: 'left',
    disablePadding: false,
    label: 'Subjects',
  },
  {
    id: 'progress',
    align: 'center',
    disablePadding: false,
    label: 'Progress',
  },
  {
    id: 'accuracy',
    align: 'center',
    disablePadding: false,
    label: 'Performance',
  },
  {
    id: 'status',
    align: 'left',
    disablePadding: false,
    label: 'Status',
  },
];

function TopicsTableHead({ order, orderBy, setOrder, setOrderBy, selected }) {
  const handleSort = (x) => {
    if (x === orderBy) setOrder(order === 'asc' ? 'desc' : 'asc');
    else {
      setOrderBy(x);
      setOrder('asc');
    }
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell key={'select'} align={'center'} padding={'normal'}>
          <div>Selection: {selected.length || 'all'}</div>
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <Button onClick={() => handleSort(headCell.id)}>{headCell.label}</Button>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

TopicsTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  selected: PropTypes.array,
  reset: PropTypes.func,
};

const OrderStatus = ({ status }) => {
  let color;
  let title;

  if (status < 30) {
    color = 'error';
    title = 'Novice';
  } else if (status >= 30 && status < 60) {
    color = 'warning';
    title = 'Proficient';
  } else if (status >= 60 && status < 85) {
    color = 'success';
    title = 'Expert';
  } else if (status >= 85) {
    color = 'primary';
    title = 'Master';
  } else {
    color = 'primary';
    title = '-';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

OrderStatus.propTypes = {
  status: PropTypes.any,
};

export default function TopicsTable({ swap }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [reset] = useResetSelectCategoriesMutation();
  const [categoryType, setCategoryType] = useState('clinical');
  const isMobile = useMediaQuery('(max-width:600px)'); // Check if the screen width is mobile

  const currentUser = useSelector(selectUser);
  const { data: subscribed, isLoading, isSuccess } = useGetSubscriptionStatusQuery();
  const isSubscribed = isSuccess && moment(subscribed?.data?.lastPackageExpiry) > moment();

  let processedCategories = [];
  let categories = { ids: [], entities: {} };

  const { data: data, isSuccess: isDataSuccess, isLoading: isDataLoading } = useGetUserQuestionDataQuery();

  if (isDataSuccess) {
    categories = data.categories;

    // Filter categories based on subscription status and clinical/preclinical selection
    Object.values(categories.entities).forEach((category) => {
      if (isSubscribed && category.name.toLowerCase().includes('trial')) {
        return; // Hide trial categories for subscribed users
      }
      if (!isSubscribed && !category.name.toLowerCase().includes('trial')) {
        return; // Show only trial categories for non-subscribed users
      }

      // Filter categories based on clinical/preclinical toggle
      if (categoryType === 'clinical' && !category.name.toLowerCase().includes('preclinical')) {
        const processedData = category.questions.map((question, i) => ({
          ...question,
          Answer: category.questions?.[i].answers?.[0] || undefined,
        }));
        processedCategories.push({ ...category, questions: processedData });
      } else if (categoryType === 'preclinical' && category.name.toLowerCase().includes('preclinical')) {
        const processedData = category.questions.map((question, i) => ({
          ...question,
          Answer: category.questions?.[i].answers?.[0] || undefined,
        }));
        processedCategories.push({ ...category, questions: processedData });
      }
    });
  }


  const newData = processedCategories.map((item) => {
    const answeredQs = item.questions.filter((q) => q.Answer).length;
    const correctlyAnswerdQs = item.questions.filter((q) => (q.Answer?.isCorrect || false) === true).length;
    return createData(
      item.id,
      item.name,
      `${answeredQs}/${item.questions.length}`,
      answeredQs < 1 ? '-' : (correctlyAnswerdQs / answeredQs) * 100,
      correctlyAnswerdQs / item.questions.length,
      answeredQs / item.questions.length
    );
  });

  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('progress');
  const [selected, setSelected] = useState([]);
  const sortable = ['category', 'progress', 'accuracy'];

  const handleCategorySelection = (category) => {
    const clone = [...selected];
    if (!selected.includes(category)) {
      clone.push(category);
      setSelected(clone);
    } else {
      const filtered = clone.filter((e) => category !== e);
      setSelected(filtered);
    }
  };

  const isSelected = (category) => selected.indexOf(category) !== -1;

  let content = (
    <TableBody>
      {stableSort(newData, getComparator(order, sortable.includes(orderBy) ? orderBy : 'accuracy')).map((row, index) => {
        const isItemSelected = isSelected(row.category);
        const labelId = `enhanced-table-checkbox-${index}`;

        const gradient = `-webkit-linear-gradient(left, #81f29b 0%, #81f29b ${
          row.correctQs * 100
        }%, #ffc2c2 ${row.correctQs * 100}%, #ffc2c2 ${row.answeredQs * 100}%, #ffffff ${row.answeredQs * 100}%, #ffffff 100%)`;
        return (
          <TableRow
            hover
            role="checkbox"
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            style={{ background: gradient, boxShadow: 'inset 1px 1px 5px 2px rgb216,153,53)' }}
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.category}
            selected={isItemSelected}
          >
            <TableCell align="center">
              <input type="checkbox" onClick={() => handleCategorySelection(row.id)} />
            </TableCell>
            <TableCell component="th" id={labelId} scope="row" align="left">
              <Button
                color="secondary"
                onClick={() => {
                  dispatch(initExam());
                  dispatch(setTopics({ topics: [row.id] }));
                  navigate('/exampage');
                }}
              >
                {row.category.replace(/trial/gi, '').trim().substring(0, isMobile ? 20 : 20) +
                  (row.category.length > 20 ? '...' : '')}
              </Button>
            </TableCell>

            <TableCell align="center">{row.progress}</TableCell>
            <TableCell align="center">{row.accuracy !== '-' ? Number(row.accuracy).toFixed(0) : '-'}%</TableCell>
            <TableCell align="left">
              <OrderStatus status={row.accuracy} />
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetQuestions = () => {
    reset({ ids: selected });
  };

  if (isLoading)
    content = (
      <div className="tw-w-[100%] tw-p-10 tw-flex tw-justify-center tw-h-[300px]">
        <CustomLoader /> {/* Replace CircularProgress with CustomLoader */}
      </div>
    );

  const toolTipText = [
    'Begin Solving Questions. If No Subjects Are Selected, The Question Set will Contain All Available Unanswered Questions From All Subjects.',
    'Revise Incorrectly Answered Questions From A Selected Subject. If No Subjects Are Selected, The Question Set Will Contain Incorrectly Answered Questions From All Available Subjects.',
    'Reset Progress For A Selected Subject. If No Subjects Are Selected, All Questions Will Be Reset.',
    'Work in timed intervals, alternating between study sessions and breaks. Set your desired intervals for focused work and rest, and the system will guide you through the cycle.',
    'Answer questions correctly to maintain your lives. You lose a life with each incorrect answer. The session ends when all lives are lost.',
    'Your available time decreases as you progress. Answer questions correctly to gain extra time and avoid the timer running out. The session ends when time runs out.'
  ];
  const props = {
    ['Enter An Exam']: async () => {
      dispatch(initExam());
      const topicsToSelect = selected.length > 0 ? selected : processedCategories.map((category) => category.id);
      dispatch(setTopics({ topics: topicsToSelect }));
      navigate('/exampage');
    },
    ['Start A Revision']: async () => {
      dispatch(initExam());
      dispatch(setRevision({ revision: true }));
      const topicsToSelect = selected.length > 0 ? selected : processedCategories.map((category) => category.id);
      dispatch(setTopics({ topics: topicsToSelect }));
      navigate('/exampage');
    },
    ['Reset Progress']: () => {
      setShowConfirmation(true);
    },
    ['Pomodoro Mode']: async () => {
      dispatch(initExam());
      const topicsToSelect = selected.length > 0 ? selected : processedCategories.map((category) => category.id);
      dispatch(setTopics({ topics: topicsToSelect }));
      navigate('/pomodoro'); // Adjust the route for your Pomodoro Mode page
    },
    ['Survival Mode']: async () => {
      dispatch(initExam());
      const topicsToSelect = selected.length > 0 ? selected : processedCategories.map((category) => category.id);
      dispatch(setTopics({ topics: topicsToSelect }));
      navigate('/survival'); // Adjust the route for your Survival Mode page
    },
    ['Life Drain Mode']: async () => {
      dispatch(initExam());
      const topicsToSelect = selected.length > 0 ? selected : processedCategories.map((category) => category.id);
      dispatch(setTopics({ topics: topicsToSelect }));
      navigate('/lifedrain'); // Adjust the route for your Life Drain Mode page
    },
  };
  

  const colors = ['success', 'warning', 'error', 'primary', 'info', 'secondary' ];

  return (
    <Box>
      <div className='tw-flex tw-flex-wrap tw-gap-2 tw-justify-between tw-mb-2'>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{
            backgroundColor: '#f0f4f8',
            borderRadius: '10px',
            padding: isMobile ? '1px 3px' : '3px 6px', // Smaller padding on mobile
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            width: isMobile ? '180px' : 'auto', // Adjust width for mobile
          }}
        >
          <Typography
            style={{
              fontSize: isMobile ? '10px' : '16px', // Adjust font size on mobile
              color: categoryType === 'preclinical' ? '#007BFF' : '#007BFF',
              fontWeight: 'bold',
              marginRight: '3px',
            }}
          >
            Pre-Clinical
          </Typography>
          <Switch
            checked={categoryType === 'clinical'}
            onChange={() => setCategoryType(categoryType === 'clinical' ? 'preclinical' : 'clinical')}
            inputProps={{ 'aria-label': 'controlled' }}
            sx={{
              '& .MuiSwitch-thumb': {
                backgroundColor: '#007BFF',
              },
              '& .MuiSwitch-track': {
                backgroundColor: '#007BFF',
                borderRadius: '12px',
              },
              '& .Mui-checked .MuiSwitch-thumb': {
                backgroundColor: '#d89935',
              },
            }}
          />
          <Typography
            style={{
              fontSize: isMobile ? '10px' : '16px', // Adjust font size on mobile
              color: categoryType === 'clinical' ? '#d89935' : '#d89935',
              fontWeight: 'bold',
              marginLeft: '4px',
            }}
          >
            Clinical
          </Typography>
        </Stack>
  
        {/* Buttons for "Enter Exam", "Start Revision", etc. */}
        <div className='tw-flex tw-flex-col tw-gap-1'>
          {/* First Row: Main Buttons */}
          <div className='tw-flex tw-gap-1 tw-flex-wrap'>
            {Object.keys(props).slice(0, 3).map((x, i) => (
              <OverlayTrigger
                key={"trigger" + String(i)}
                placement="top"
                delay={{ show: 250, hide: 250 }}
                overlay={
                  <Tooltip id="button-tooltip tw-static">
                    <div className='tw-bg-gray-400 tw-max-w-[300px] tw-static tw-p-4 tw-rounded-lg'>
                      {toolTipText[i]}
                    </div>
                  </Tooltip>
                }
              >
                <Button
                  variant='outlined'
                  color={colors[i]}
                  className='tw-mx-1'
                  key={x}
                  onClick={() => props[x]()}
                  sx={{
                    fontSize: isMobile ? '10px' : 'inherit', // Adjust font size for mobile buttons
                    padding: isMobile ? '2px 10px' : '8px 10px', // Smaller padding on mobile
                  }}
                >
                  {x}
                </Button>
              </OverlayTrigger>
            ))}
          </div>
  
          {/* Second Row: Mode Buttons */}
          <div className='tw-flex tw-gap-1 tw-flex-wrap'>
            {Object.keys(props).slice(3).map((x, i) => (
              <OverlayTrigger
                key={"trigger" + String(i + 3)}
                placement="top"
                delay={{ show: 250, hide: 250 }}
                overlay={
                  <Tooltip id="button-tooltip tw-static">
                    <div className='tw-bg-gray-400 tw-max-w-[300px] tw-static tw-p-4 tw-rounded-lg'>
                      {toolTipText[i + 3]}
                    </div>
                  </Tooltip>
                }
              >
                <Button
                  variant='outlined'
                  color={colors[i + 3]}
                  className='tw-mx-1'
                  key={x}
                  onClick={() => props[x]()}
                  sx={{
                    fontSize: isMobile ? '10px' : 'inherit', // Adjust font size for mobile buttons
                    padding: isMobile ? '2px 10px' : '8px 10px', // Smaller padding on mobile
                  }}
                >
                  {x}
                </Button>
              </OverlayTrigger>
            ))}
          </div>
        </div>
      </div>
  
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          maxHeight: '300px',
          '& td, & th': { whiteSpace: 'nowrap' },
        }}
      >
        <Table
          stickyHeader
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2,
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3,
            },
          }}
        >
          <TopicsTableHead order={order} orderBy={orderBy} setOrder={setOrder} setOrderBy={setOrderBy} selected={selected} reset={reset} />
          {content}
        </Table>
      </TableContainer>
  
      <ConfirmationModal show={showConfirmation} setShow={setShowConfirmation} variant="danger" onConfirm={resetQuestions}>
        {`You are about to reset your answers for ${selected.length === 0 ? 'all' : selected.length} topics`}
      </ConfirmationModal>
    </Box>
  );
}  