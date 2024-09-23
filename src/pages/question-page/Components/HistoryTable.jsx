import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Grid, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import moment from 'moment';
import { useGetUserHistoryQuery } from 'store/api/answersApiSlice';
import Dot from 'components/@extended/Dot'; // Adjust the path if necessary
import { OverlayTrigger, Tooltip } from 'react-bootstrap'; // Ensure React-Bootstrap is installed

// Function to clean text and remove references
const cleanText = (text) => text.replace(/\*/g, '').replace(/references?:[\s\S]*/i, '');

function descendingComparator(a, b, orderBy) {
  let target1 = b[orderBy];
  let target2 = a[orderBy];

  if (orderBy === 'question') {
    target1 = b.question[orderBy];
    target2 = a.question[orderBy];
  }

  if (orderBy === 'category') {
    target1 = b[orderBy][0];
    target2 = a[orderBy][0];
  }

  return target1 < target2 ? -1 : target1 > target2 ? 1 : 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    return order !== 0 ? order : a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// Table head cells
const headCells = [
  {
    id: 'createdAt',
    align: 'left',
    disablePadding: false,
    label: 'Date'
  },
  {
    id: 'question',
    align: 'left',
    disablePadding: false,
    label: 'Question'
  },
  {
    id: 'categories',
    align: 'left',
    disablePadding: false,
    label: 'Categories'
  },
];

// History Table Head component
function HistoryTableHead({ order, orderBy, setOrder, setOrderBy }) {
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

HistoryTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
};

// Status indicator component
const OrderStatus = ({ status }) => {
  let color;
  let title;

  if (status < 30) {
    color = 'error';
    title = 'Bad';
  } else if (status >= 30 && status < 60) {
    color = 'warning';
    title = 'Moderate';
  } else if (status >= 60 && status < 85) {
    color = 'success';
    title = 'Good';
  } else if (status >= 85) {
    color = 'primary';
    title = 'Perfect';
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

// History Table component
export default function HistoryTable() {
  const suffix = ['A', 'B', 'C', 'D', 'E'];
  let processedAnswers = [];
  const [page, setPage] = useState(1);
  const { data: answers, isSuccess, isFetching } = useGetUserHistoryQuery(page ?? 1, { refetchOnMountOrArgChange: true });
  const [query, setQuery] = useState('');

  const searchFilter = (myQuery, questions = []) => {
    if (myQuery) {
      const result = questions.filter((item) => {
        if (item.question.question.toLowerCase().includes(myQuery)) return true;
        if (item.categories.some(x => x.toLowerCase().includes(myQuery))) return true;
        return false;
      });
      return result;
    } else {
      return questions;
    }
  };

  useEffect(() => {}, [answers, isSuccess]);

  if (isSuccess) {
    Object.values(answers.entities).forEach((answer) => {
      const sTable = ["A", "B", "C", "D", "E"];
      const correctAnswers = answer.question.choices.map((a, i) => ({ isCorrect: a.isCorrect, suffix: sTable[i] }))
        .filter(x => x.isCorrect).map(x => x.suffix);
      processedAnswers.push({
        ...answer,
        correctAnswer: correctAnswers,
        selection: answer.answer,
        categories: answer.question.categories.map(x => x.name),
      });
    });
  }

  processedAnswers = searchFilter(query, processedAnswers);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('createdAt');
  const sortable = ['question', 'createdAt', 'categories'];

  let content = (
    <TableBody>
      {stableSort(processedAnswers, getComparator(order, sortable.includes(orderBy) ? orderBy : 'createdAt')).map((row, index) => {
        const labelId = `enhanced-table-checkbox-${index}`;
        return (
          <OverlayTrigger
            key={row.categories}
            placement="bottom"
            overlay={(
              <Tooltip className="fw-semi-bold sm:tw-max-w-[80Vw]">
                <div className="tw-bg-slate-100 tw-p-4 tw-rounded-md tw-shadow-md sm:tw-max-w-[80Vw]">
                  <div className="tw-flex lg:tw-flex-row tw-flex-col tw-rounded-md sm:tw-max-w-[80Vw] tw-justify-center">
                    {row.question.choices.map((x, i) => (
                      <div
                        style={{
                          backgroundColor: row.correctAnswer.includes(suffix[i]) ? "#95de64" : "#ffa39e",
                          border: row.selection === suffix[i] ? '4px solid black' : undefined,
                        }}
                        className="tw-shadow-md tw-gap-1 tw-p-1 tw-rounded-md tw-m-1 tw-text-xs"
                        key={x.index}
                      >
                        {suffix[i]} ) {x.text}
                      </div>
                    ))}
                  </div>
                  <p>References:</p>
                  <div style={{ textWrap: 'balance' }} className="tw-text-xs">
                    {row.question.references.map((x, index) => (
                      <div key={index}>{cleanText(x)}</div>
                    ))}
                  </div>
                </div>
              </Tooltip>
            )}
          >
            <TableRow
              hover
              role="checkbox"
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: row.correctAnswer.includes(row.answer) ? 'success.light' : 'error.light' }}
              tabIndex={-1}
              key={row.categories}
            >
              <TableCell align="left">{moment(row.createdAt).fromNow()}</TableCell>
              <TableCell style={{ textWrap: 'balance' }} component="th" id={labelId} scope="row" align="left">
                {cleanText(row.question.question.substring(0, 200))} {row.question.question.length > 200 ? '...' : ''}
              </TableCell>
              <TableCell style={{ textWrap: 'balance' }} align="left">
                {row.categories.join(', ')}
              </TableCell>
            </TableRow>
          </OverlayTrigger>
        );
      })}
    </TableBody>
  );

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} className="tw-justify-center tw-items-center tw-pb-[400px]">
      <Grid item xs={12} sx={{ mb: -2.25 }} className="tw-p-8 tw-pb-20 tw-bg-white tw-ml-[1.5rem] tw-my-[2.5rem] tw-border-[1px] tw-border-[#e6ebf1] tw-border-solid tw-rounded-[8px]">
        <h1 className="tw-text-center tw-m-1">Answer History</h1>
        <div className="tw-w-full tw-flex tw-justify-between tw-my-4">
          <Button
            type="button"
            disabled={page < 2}
            variant="contained"
            color="primary"
            className="tw-mx-2 tw-my-1 tw-h-[30px]"
            onClick={() => {
              if (page > 1 && !isFetching) setPage(page - 1);
            }}
          >
            {"<"}
          </Button>
          <div>
            <p className="tw-text-center tw-m-1">Page: {page}</p>
          </div>
          <Button
            type="button"
            disabled={Object.values(answers?.entities || {}).length < 40}
            variant="contained"
            color="primary"
            className="tw-mx-2 tw-my-1 tw-h-[30px]"
            onClick={() => {
              if (!isFetching && Object.values(answers?.entities || {}).length === 40) setPage(page + 1);
            }}
          >
            {">"}
          </Button>
        </div>

        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          id="filled-basic"
          label="Try searching for 'cardiology' or '55-year-old'"
          variant="filled"
          onChange={(x) => setQuery(x.target.value)}
          className="tw-w-full"
        />

        <Box>
          <TableContainer
            sx={{
              width: '100%',
              overflowX: 'auto',
              position: 'relative',
              display: 'block',
              maxWidth: '100%',
              '& td, & th': { whiteSpace: 'nowrap' }
            }}
          >
            <Table stickyHeader aria-labelledby="tableTitle">
              <HistoryTableHead order={order} orderBy={orderBy} setOrder={setOrder} setOrderBy={setOrderBy} />
              {content}
            </Table>
          </TableContainer>
        </Box>
      </Grid>
    </Grid>
  );
}
