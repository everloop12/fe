import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// third-party
// import NumberFormat from 'react-number-format';

// project import
// import Dot from 'components/@extended/Dot';
import { Button } from '../../../../node_modules/@mui/material/index';
import { useDeleteCategorysMutation } from 'store/api/CategoryApiSlice';

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'category',
    align: 'left',
    disablePadding: false,
    label: 'Category'
  },
  {
    id: 'questions',
    align: 'center',
    disablePadding: false,
    label: 'Question Count'
  },
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function ExamHead({ order, orderBy, setOrder, setOrderBy, handleDelete }) {
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

ExamHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  selected: PropTypes.array,
  handleDelete: PropTypes.func,
};
// ==============================|| ORDER TABLE ||============================== //

export default function ExamCategoryList({ data }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('accuracy');
  const [selected, setSelected] = useState([]);
  // const sortable = ['category', 'progress', 'accuracy'];


  const [deleteCategorys] = useDeleteCategorysMutation();


  const handleCategorySelection = (category) => {
    const clone = [...selected];
    if (!selected.includes(category)) {
      clone.push(category);
      setSelected(clone);
    } else {
      const filtered = clone.filter((e) => category !== e);
      setSelected(filtered);
    }
  }
  const isSelected = (category) => selected.indexOf(category) !== -1;

  const handleDelete = () => {
    deleteCategorys({ ids: selected })
  }

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
          <ExamHead order={order} orderBy={orderBy} setOrder={setOrder} setOrderBy={setOrderBy} selected={selected} handleDelete={handleDelete} />
          <TableBody>
            {data.map((category, index) => {
              const isItemSelected = isSelected(category.id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={category.id}
                  selected={isItemSelected}
                >
                  <TableCell align="center">
                    <input type='checkbox' onClick={() => { handleCategorySelection(category.id) }} />
                  </TableCell>
                  <TableCell component="th" id={labelId} scope="row" align="left">
                    <Link color="secondary" component={RouterLink} to={`/category/${category.id}`}>
                      {category.name}
                    </Link>
                  </TableCell>
                  <TableCell align="center">#</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
ExamCategoryList.propTypes = {
  data: PropTypes.array,
};
