import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Collapse, IconButton } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { useDeleteCategorysMutation } from 'store/api/CategoryApiSlice';

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

function CategoryListHead({ order, orderBy, setOrder, setOrderBy, handleDelete }) {
  const handleSort = (x) => {
    if (x === orderBy) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderBy(x);
      setOrder('asc');
    }
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell align={'center'} padding={'normal'}>
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

CategoryListHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default function CategoryList({ data }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('category');
  const [selected, setSelected] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);

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
  };

  const isSelected = (category) => selected.indexOf(category) !== -1;

  const handleDelete = () => {
    deleteCategorys({ ids: selected });
  };

  const handleToggleExpand = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

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
        <Table aria-labelledby="tableTitle" sx={{ '& .MuiTableCell-root:first-of-type': { pl: 2 }, '& .MuiTableCell-root:last-of-type': { pr: 3 } }}>
          <CategoryListHead order={order} orderBy={orderBy} setOrder={setOrder} setOrderBy={setOrderBy} selected={selected} handleDelete={handleDelete} />
          <TableBody>
            {data.map((category, index) => {
              const isItemSelected = isSelected(category.id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <React.Fragment key={category.id}>
                  <TableRow
                    hover
                    role="checkbox"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
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
                    <TableCell align="center">{category._count.questions}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleToggleExpand(category.id)}>
                        {expandedCategory === category.id ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                      <Collapse in={expandedCategory === category.id} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                          <Table size="small" aria-label="tags">
                            <TableHead>
                              <TableRow>
                                <TableCell>Tag</TableCell>
                                <TableCell align="center">Question Count</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {category.tags.map((tag) => (
                                <TableRow key={tag.id}>
                                  <TableCell component="th" scope="row">
                                    {tag.name}
                                  </TableCell>
                                  <TableCell align="center">{tag._count.questions}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

CategoryList.propTypes = {
  data: PropTypes.array.isRequired,
};
