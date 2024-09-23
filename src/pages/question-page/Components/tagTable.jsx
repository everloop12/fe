// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import PropTypes from 'prop-types';
// import { useState } from 'react';

// // material-ui
// import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// // project import
// import Dot from 'components/@extended/Dot';
// import { Button, CircularProgress } from '../../../../node_modules/@mui/material/index';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom'
// import { initExam, setTags } from 'store/reducers/exam';
// import { useResetSelectTagsMutation } from 'store/api/answersApiSlice';
// import { useGetUserQuestionDataQuery } from 'store/api/questionApiSlice';
// import { selectUser } from 'store/reducers/user';
// import ConfirmationModal from 'pages/Components/ConfirmationComponent/Confirmation';
// import OverlayTrigger from '../../../../node_modules/react-bootstrap/esm/OverlayTrigger';
// import { Tooltip } from '../../../../node_modules/react-bootstrap/esm/index';

// function createData(id, tag, progress, accuracy, correctQs, answeredQs) {
//   return { id, tag, progress, accuracy, correctQs, answeredQs };
// }

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

// const headCells = [
//   {
//     id: 'tag',
//     align: 'left',
//     disablePadding: false,
//     label: 'Tag'
//   },
//   {
//     id: 'progress',
//     align: 'center',
//     disablePadding: false,
//     label: 'Progress'
//   },
//   {
//     id: 'accuracy',
//     align: 'center',
//     disablePadding: false,
//     label: 'Performance'
//   },
//   {
//     id: 'status',
//     align: 'left',
//     disablePadding: false,
//     label: 'Status'
//   },
// ];

// function TagsTableHead({ order, orderBy, setOrder, setOrderBy, selected }) {
//   const handleSort = (x) => {
//     if (x === orderBy)
//       setOrder(order === 'asc' ? 'desc' : 'asc');
//     else {
//       setOrderBy(x)
//       setOrder('asc')
//     }
//   }

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell
//           key={"select"}
//           align={'center'}
//           padding={'normal'}
//         >
//           <div>
//             Selection: {selected.length || 'all'}
//           </div>
//         </TableCell>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.align}
//             padding={headCell.disablePadding ? 'none' : 'normal'}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <Button onClick={() => handleSort(headCell.id)}>
//               {headCell.label}
//             </Button>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// TagsTableHead.propTypes = {
//   order: PropTypes.string,
//   orderBy: PropTypes.string,
//   setOrder: PropTypes.func,
//   setOrderBy: PropTypes.func,
//   selected: PropTypes.array,
//   reset: PropTypes.func,
// };

// const OrderStatus = ({ status }) => {
//   let color;
//   let title;

//   if (status < 30) {
//     color = 'error';
//     title = 'Novice';
//   }
//   else if (status >= 30 && status < 60) {
//     color = 'warning';
//     title = 'Proficient';
//   }
//   else if (status >= 60 && status < 85) {
//     color = 'success';
//     title = 'Expert';
//   }
//   else if (status >= 85) {
//     color = 'primary';
//     title = 'Master';
//   }
//   else {
//     color = 'primary';
//     title = '-';
//   }

//   return (
//     <Stack direction="row" spacing={1} alignItems="center">
//       <Dot color={color} />
//       <Typography>{title}</Typography>
//     </Stack>
//   );
// };

// OrderStatus.propTypes = {
//   status: PropTypes.any
// };

// export default function TagsTable({ swap }) {
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [reset] = useResetSelectTagsMutation();
//   const user = useSelector(selectUser);

//   let processedTags = [];
//   let newData = [];
//   let tags = { ids: [], entities: {} };

//   const { data, isSuccess, isLoading } = useGetUserQuestionDataQuery();

//   if (isSuccess && data.tags) {
//     tags = data.tags;
//     Object.values(tags.entities).forEach((tag) => {
//       const processedData = [];
//       if (tag.questions) {
//         Object.values(tag.questions).forEach((question, i) => {
//           const newQuestion = {
//             ...question,
//             Answer: tag.questions?.[i].answers?.[0] || undefined
//           };
//           processedData.push(newQuestion);
//         });
//       }
//       processedTags.push({ ...tag, questions: processedData });
//     });
//   }

//   newData = processedTags.map((tag) => {
//     const answeredQs = tag.questions.filter((q) => q.Answer).length;
//     const correctlyAnsweredQs = tag.questions.filter((q) => (q.Answer?.isCorrect || false) === true).length;
//     return createData(tag.id, tag.name,
//       `${answeredQs}/${tag.questions.length}`, answeredQs < 1 ? "-" : (correctlyAnsweredQs / answeredQs) * 100, correctlyAnsweredQs / tag.questions.length, answeredQs / tag.questions.length);
//   });

//   const [order, setOrder] = useState('desc');
//   const [orderBy, setOrderBy] = useState('progress');
//   const [selected, setSelected] = useState([]);
//   const sortable = ['tag', 'progress', 'accuracy'];

//   const handleTagSelection = (tag) => {
//     const clone = [...selected];
//     if (!selected.includes(tag)) {
//       clone.push(tag);
//       setSelected(clone);
//     } else {
//       const filtered = clone.filter((e) => tag !== e);
//       setSelected(filtered);
//     }
//   };
//   const isSelected = (tag) => selected.indexOf(tag) !== -1;

//   let content = <TableBody>
//     {stableSort(newData, getComparator(order, sortable.includes(orderBy) ? orderBy : 'accuracy')).map((row, index) => {
//       const isItemSelected = isSelected(row.tag);
//       const labelId = `enhanced-table-checkbox-${index}`;
//       const gradient = `-webkit-linear-gradient(left, #81f29b 0%, #81f29b ${row.correctQs * 100}%, #ffc2c2 ${row.correctQs * 100}%, #ffc2c2 ${row.answeredQs * 100}%, #ffffff ${row.answeredQs * 100}%, #ffffff 100%)`;
//       return (
//         <TableRow
//           hover
//           role="checkbox"
//           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//           style={{ background: gradient, boxShadow: 'inset 1px 1px 5px 2px rgb(236 236 236)' }}
//           aria-checked={isItemSelected}
//           tabIndex={-1}
//           key={row.tag}
//           selected={isItemSelected}
//         >
//           <TableCell align="center"><input type='checkbox' onClick={() => { handleTagSelection(row.id) }} /></TableCell>
//           <TableCell component="th" id={labelId} scope="row" align="left">
//             <Button color="secondary" onClick={() => {
//               dispatch(initExam());
//               dispatch(setTags({ tags: [row.id] }));
//               navigate('/exampage');
//             }}>
//               {row.tag.substring(0, 20) + (row.tag.length > 20 ? '...' : '')}
//             </Button>
//           </TableCell>
//           <TableCell align="center">{row.progress}</TableCell>
//           <TableCell align="center">{row.accuracy !== '-' ? Number(row.accuracy).toFixed(0) : '-'}{row.accuracy !== '-' ? '%' : ''}</TableCell>
//           <TableCell align="left">
//             <OrderStatus status={row.accuracy} />
//           </TableCell>
//         </TableRow>
//       );
//     })}
//   </TableBody>;

//   if (isLoading)
//     content = <div className='tw-w-[90%] tw-p-4 tw-flex tw-justify-center tw-h-[100px]'>
//       <CircularProgress />
//     </div>;

//   const toolTipText = [
//     'Begin Solving Questions. If No Tags Are Selected, The Question Set Will Contain All Available Unanswered Questions From All Tags.',
//     'Revise Incorrectly Answered Questions From Selected Tags. If No Tags Are Selected, The Question Set Will Contain Incorrectly Answered Questions From All Available Tags.',
//     'Reset Progress For Selected Tags. If No Tags Are Selected, All Questions Will Be Reset.'
//   ];

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const resetQuestions = () => {
//     reset({ ids: selected });
//   };

//   const props = {
//     ["Start The Questions"]: async () => {
//       dispatch(initExam());
//       dispatch(setTags({ tags: selected }));
//       navigate('/exampage');
//     },
//     ['Revision']: async () => {
//       dispatch(initExam());
//       dispatch(setRevision({ revision: true }));
//       dispatch(setTags({ tags: selected }));
//       navigate('/exampage');
//     },
//     ["Reset Progress"]: () => {
//       setShowConfirmation(true);
//     }
//   };

//   const colors = ['success', 'warning', 'error', 'primary', 'info'];
//   return (
//     <Box>
//       <div className='tw-flex tw-justify-between tw-mb-2'>
//         <OverlayTrigger
//           key={"trigger -1"}
//           placement="top"
//           overlay={<Tooltip id="button-tooltip tw-static">
//             <div className='tw-bg-gray-400 tw-static tw-p-4 tw-rounded-lg'>
//               Switch To Specific Topics
//             </div>
//           </Tooltip>}
//         >
//           <Button variant='outlined' color='primary' onClick={swap}>
//             Browse Subjects Instead
//           </Button>
//         </OverlayTrigger>
//         <div>
//           {Object.keys(props).map((x, i) => (
//             <OverlayTrigger
//               key={"trigger" + String(i)}
//               placement="top"
//               delay={{ show: 250, hide: 250 }}
//               overlay={<Tooltip id="button-tooltip tw-static">
//                 <div className='tw-bg-gray-400 tw-max-w-[300px] tw-static tw-p-4 tw-rounded-lg'>
//                   {toolTipText[i]}
//                 </div>
//               </Tooltip>}
//             >
//               <Button variant='outlined' color={colors[i]} className='tw-mx-1' key={x} onClick={() => { props[x]() }}>
//                 {x}
//               </Button>
//             </OverlayTrigger>
//           ))}
//         </div>
//       </div>
//       <TableContainer
//         sx={{
//           width: '100%',
//           overflowX: 'auto',
//           position: 'relative',
//           display: 'block',
//           maxHeight: '330px',
//           maxWidth: '100%',
//           '& td, & th': { whiteSpace: 'nowrap' }
//         }}
//       >
//         <Table
//           stickyHeader
//           aria-labelledby="tableTitle"
//           sx={{
//             '& .MuiTableCell-root:first-of-type': {
//               pl: 2
//             },
//             '& .MuiTableCell-root:last-of-type': {
//               pr: 3
//             }
//           }}
//         >
//           <TagsTableHead order={order} orderBy={orderBy} setOrder={setOrder} setOrderBy={setOrderBy} selected={selected} reset={reset} />
//           {content}
//         </Table>
//       </TableContainer>
//       <ConfirmationModal
//         show={showConfirmation}
//         setShow={setShowConfirmation}
//         variant="danger"
//         onConfirm={resetQuestions}
//       >
//         {`You are about to reset your answers for ${selected.length === 0 ? 'all' : selected.length} tags`}
//       </ConfirmationModal>
//     </Box>
//   );
// }
