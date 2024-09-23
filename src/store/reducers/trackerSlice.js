// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   questionsAnsweredPerDay: {},  // Initialize with an empty object
//   answeredCount: 0,
//   lastAnsweredDate: null,
// };

// const trackerSlice = createSlice({
//   name: 'tracker',
//   initialState,
//   reducers: {
//     incrementAnsweredCount: (state, action) => {
//       const { userId } = action.payload;
//       state.answeredCount += 1;
//       state.lastAnsweredDate = new Date().toISOString();

//       // Save to Redux state with user-specific key
//       const dateString = state.lastAnsweredDate.split('T')[0];
//       if (!state.questionsAnsweredPerDay[userId]) {
//         state.questionsAnsweredPerDay[userId] = {};
//       }
      
//       if (state.questionsAnsweredPerDay[userId][dateString]) {
//         state.questionsAnsweredPerDay[userId][dateString] += 1;  // Increment for the same day
//       } else {
//         state.questionsAnsweredPerDay[userId][dateString] = 1;  // Start count for a new day
//       }
//     },
//     resetAnsweredCount: (state, action) => {
//       const { userId } = action.payload;
//       state.answeredCount = 0;
//       state.lastAnsweredDate = null;

//       // Clear user-specific data
//       if (state.questionsAnsweredPerDay[userId]) {
//         delete state.questionsAnsweredPerDay[userId];
//       }
//     },
//   },
// });

// export const { incrementAnsweredCount, resetAnsweredCount } = trackerSlice.actions;

// export const selectAnsweredCountPerDay = (state) => state.tracker.questionsAnsweredPerDay || {};

// export default trackerSlice.reducer;
