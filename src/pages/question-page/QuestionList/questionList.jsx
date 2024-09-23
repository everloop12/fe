import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import CommentIcon from '@mui/icons-material/Comment';
// third-party
// import NumberFormat from 'react-number-format';

// project import
// import Dot from 'components/@extended/Dot';
import { Button, Grid } from '../../../../node_modules/@mui/material/index';
import { useDeleteQuestionsMutation } from 'store/api/questionApiSlice';
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';

function descendingComparator(a, b, orderBy) {
  if (orderBy === 'comments' || orderBy === 'reports') {
    if (b[orderBy].length < a[orderBy].length) {
      return -1;
    }
    if (b[orderBy].length > a[orderBy].length) {
      return 1;
    }
    return 0;

  }

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

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'question',
    align: 'left',
    disablePadding: false,
    label: 'Question'
  },
  {
    id: 'references',
    align: 'center',
    disablePadding: false,
    label: 'References'
  },
  {
    id: 'tags',
    align: 'left',
    disablePadding: false,
    label: 'Tags'
  },
  {
    id: 'categoryIds',
    align: 'left',
    disablePadding: false,
    label: 'Categories'
  },
  {
    id: 'Comments',
    align: 'center',
    disablePadding: false,
    label: 'Comments'
  },
  {
    id: 'Reports',
    align: 'center',
    disablePadding: false,
    label: 'Reports'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function QuestionListHead({ order, orderBy, setOrder, setOrderBy, handleDelete }) {
  // const sortable = ['category', 'progress', 'accuracy'];

  const handleSort = (x) => {
    if (x === orderBy)
      setOrder(order === 'asc' ? 'desc' : 'asc');
    else {
      setOrderBy(x)
      setOrder('asc')
    }
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell
          key={"select"}
          align={'center'}
          padding={'normal'}
        >
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <Button onClick={() => handleSort(headCell.id)}>
              {headCell.label}
            </Button>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

QuestionListHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  selected: PropTypes.array,
  handleDelete: PropTypes.func
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ cats, type }) => {

  const navigate = useNavigate();

  return (
    <>
      {
        (cats ?? []).map((cat) =>
          <Stack key={`asd${cat}`} direction="row" spacing={1} alignItems="center">
            <button onClick={() => { type === 'TAG' ? navigate(`/tag/${cat.id}`) : navigate(`/category/${cat.id}`) }} className='tw-cursor-pointer tw-border-none tw-shadow-none tw-bg-transparent'>
              <div className='tw-bg-red-300 tw-m-1 tw-p-1 tw-rounded'>
                <Typography>{cat?.name || ''}</Typography>
              </div>
            </button>
          </Stack>)
      }
    </>
  );
};

OrderStatus.propTypes = {
  cats: PropTypes.array,
  type: PropTypes.string
};

// ==============================|| ORDER TABLE ||============================== //

export default function QuestionList({ data }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('accuracy');
  const [selected, setSelected] = useState([]);

  const navigate = useNavigate();
  const sortable = ['question', 'progress', 'accuracy', 'Comments', 'Reports'];


  const [deleteQuestions] = useDeleteQuestionsMutation();


  const handleCategorySelection = (question) => {
    const clone = [...selected];
    if (!selected.includes(question)) {
      clone.push(question);
      setSelected(clone);
    } else {
      const filtered = clone.filter((e) => question !== e);
      setSelected(filtered);
    }

  }
  const isSelected = (question) => selected.indexOf(question) !== -1;

  const handleDelete = () => {
    deleteQuestions({ ids: selected })
  }

  return (
    <Grid item xs={12}>
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
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >

          <QuestionListHead order={order} orderBy={orderBy} setOrder={setOrder} setOrderBy={setOrderBy} selected={selected} handleDelete={handleDelete} />
          <TableBody>
            {/* TODO make this sortable by tags and cats and refs and comments and Reports then apply it to user List */}
            {/* stableSort(newData, getComparator(order, sortable.includes(orderBy) ? orderBy : 'accuracy')).map( */}
            {stableSort(data, getComparator(order, sortable.includes(orderBy) ? orderBy : 'question')).map((question, index) => {
              const isItemSelected = isSelected(question.id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={question.id}
                  selected={isItemSelected}
                  className='tw-w-auto'
                >
                  <TableCell align="center">
                    <input type='checkbox' onClick={() => { handleCategorySelection(question.id) }} />
                  </TableCell>
                  <TableCell component="th" id={labelId} scope="row" align="left" className="">
                    <Link color="secondary" style={{ textWrap: 'balance' }} component={RouterLink} to={`/question/${question.id}`}>
                      {question.question.substring(0, 200)} {question.question.length > 200 ? '...' : ''}
                    </Link>
                  </TableCell>
                  <TableCell sx={{ textWrap: "wrap" }} align="center" style={{ textWrap: 'balance' }} >{question.references.map(x => x.substring(0, 100) + (x.length > 100 ? '...' : ''))}</TableCell>
                  <TableCell className=" tw-flex-wrap " align="center">
                    <OrderStatus cats={question?.tag || []} type='TAG' />
                  </TableCell>
                  <TableCell className=" tw-flex-wrap " align="center">
                    <OrderStatus cats={question?.category || []} />
                  </TableCell>
                  <TableCell align="center">
                    <div className='tw-flex tw-justify-center'>
                      <CommentIcon className='tw-cursor-pointer' onClick={() => { navigate(`/question/${question.id}`) }} />
                      <div className='tw-px-2'>
                        {question._count.Comments}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <div className='tw-flex tw-justify-center'>
                      <WarningIcon className='tw-cursor-pointer' onClick={() => { navigate(`/question/${question.id}`) }} />
                      <div className='tw-px-2'>
                        {question._count.Reports}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
QuestionList.propTypes = {
  data: PropTypes.array,
};
