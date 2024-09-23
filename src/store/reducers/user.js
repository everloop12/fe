// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  user: { settings: {} },
  roles: [],
};

// ==============================|| SLICE - MENU ||============================== //

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => ({
      ...state,
      user: action.payload,
    }),
    addXp: (state, action) => ({
      ...state,
      user: {
        ...state.user,
        xp: state.user.xp + action.payload.xp
      }
    }),
    progressStreak: (state, action) => ({
      ...state,
      user: {
        ...state.user,
        streak: action.payload.streak == 1 ? state.user.streak + action.payload.streak : 0
      }
    }),
    setSettings: (state, action) => ({
      ...state,
      user: {
        ...state.user,
        settings: {
          ...action.payload
        }
      },
    }),
    setRoles: (state, action) => ({
      ...state,
      accessToken: action.payload.roles
    })
  }
});

export default userSlice.reducer;

export const { setUser, setRoles, setSettings, addXp, progressStreak } = userSlice.actions;
export const selectUser = (state) => state?.user?.user || null;
export const selectRoles = (state) => state?.user?.roles || null;
