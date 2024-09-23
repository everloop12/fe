import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Button } from '../../../../node_modules/@mui/material/index';
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';

function descendingComparator(a, b, orderBy) {
  if (a[orderBy] === undefined || a[orderBy] === null)
    return 2

  if (b[orderBy] === undefined || b[orderBy] === null)
    return 2

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
    id: 'name',
    align: 'center',
    disablePadding: false,
    label: 'Name'
  },
  {
    id: 'displayName',
    align: 'center',
    disablePadding: false,
    label: 'DisplayName'
  },
  {
    id: 'country',
    align: 'center',
    disablePadding: false,
    label: 'Country'
  },
  {
    id: 'university',
    align: 'center',
    disablePadding: false,
    label: 'University'
  },
  {
    id: 'email',
    align: 'center',
    disablePadding: false,
    label: 'Email'
  },
  {
    id: 'xp',
    align: 'center',
    disablePadding: false,
    label: 'Subscription'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function UserListHead({ order, orderBy, setOrder, setOrderBy }) {
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

UserListHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  selected: PropTypes.array,
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

export default function UserList({ data }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('accuracy');
  const [selected, setSelected] = useState([]);

  setSelected;

  const sortable = ['country', 'displayName', 'email', 'name', 'xp', 'university'];

  const isSelected = (question) => selected.indexOf(question) !== -1;

  return (
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

          <UserListHead order={order} orderBy={orderBy} setOrder={setOrder} setOrderBy={setOrderBy} selected={selected} />
          <TableBody>
            {stableSort(data, getComparator(order, sortable.includes(orderBy) ? orderBy : 'name')).map((user, index) => {
              const isItemSelected = isSelected(user.id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={user.id}
                  selected={isItemSelected}
                >
                  {/* <TableCell align="center">
                    <input type='checkbox' onClick={() => { handleCategorySelection(user.id) }} />
                  </TableCell> */}
                  <TableCell component="th" id={labelId} scope="row" align="center" className="tw-overflow-clip tw-text-ellipsis">
                    <Link color="secondary" component={RouterLink} to={`/user/${user.id}`}>
                      {user.name}
                    </Link>
                  </TableCell>
                  <TableCell sx={{ textWrap: "wrap" }} className="tw-overflow-clip tw-text-ellipsis" align="center" >{user.displayName}</TableCell>
                  <TableCell className=" tw-flex-wrap " align="center">
                    {user.country}
                  </TableCell>
                  <TableCell className=" tw-flex-wrap " align="center">
                    {user.university}
                  </TableCell>
                  <TableCell className=" tw-flex-wrap " align="center">
                    {user.email}
                  </TableCell>
                  <TableCell className=" tw-flex-wrap " align="center">
                    {user.xp}
                  </TableCell>

                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
UserList.propTypes = {
  data: PropTypes.array,
};
