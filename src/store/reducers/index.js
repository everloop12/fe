// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import userSlice from './user';
import { examSlice } from './exam';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, userSlice, examSlice });

export default reducers;
