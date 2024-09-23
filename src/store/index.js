// third-party
import { configureStore } from '@reduxjs/toolkit';

// project import
import user from './reducers/user';
import menu from './reducers/menu'
import { apiSlice } from './api/apiSlice';
import { examSlice } from './reducers/exam';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
  reducer: {
    user: user,
    menu: menu,
    exam: examSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})

const { dispatch } = store;

export { store, dispatch };
