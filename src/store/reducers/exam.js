// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  selectedTopics: [],
  selectedTags: [],
  questions: null,
  questionIndex: 0,
  revision: false,
  history: false,
  page: 0,
  answeredQuestions: [], // Tracks answered questions and their correctness
  highlightedTexts: [],   // New state for storing highlighted text
};

// ==============================|| SLICE - EXAM ||============================== //

export const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    flipPage: (state, action) => {
      const newPage = Math.max(0, state.page + action.payload.flip);
      return { ...state, page: newPage };
    },
    setQuestions: (state, action) => ({
      ...state,
      questions: action.payload.questions
    }),
    addSAnswer: (state, action) => {
      const questionID = action.payload.questionID;
      const isCorrect = action.payload.answer.isCorrect;

      const newQuestions = {
        ...state.questions,
        entities: {
          ...state.questions.entities,
          [questionID]: {
            ...state.questions.entities[questionID],
            answers: [action.payload.answer]
          }
        }
      };

      const answeredQuestions = state.answeredQuestions.some(q => q.questionID === questionID)
        ? state.answeredQuestions.map(q => q.questionID === questionID ? { questionID, isCorrect } : q)
        : [...state.answeredQuestions, { questionID, isCorrect }];

      return { ...state, questions: newQuestions, answeredQuestions };
    },

    clearSAnswer: (state, action) => {
      const questionID = action.payload.questionID;
      const newQuestions = {
        ...state.questions,
        entities: {
          ...state.questions.entities,
          [questionID]: {
            ...state.questions.entities[questionID],
            answers: []
          }
        }
      };

      const answeredQuestions = state.answeredQuestions.filter(q => q.questionID !== questionID);

      return { ...state, questions: newQuestions, answeredQuestions };
    },

    addHighlightedText: (state, action) => {
      const highlightedText = action.payload;
      if (!state.highlightedTexts.includes(highlightedText)) {
        state.highlightedTexts.push(highlightedText);
      }
    },

    clearHighlightedText: (state) => {
      state.highlightedTexts = [];
    },

    setTopics: (state, action) => ({
      ...state,
      selectedTopics: action.payload.topics
    }),

    setTags: (state, action) => ({
      ...state,
      selectedTags: action.payload.tags
    }),

    setRevision: (state, action) => ({
      ...state,
      revision: action.payload.revision
    }),

    setHistory: (state, action) => ({
      ...state,
      history: action.payload.history
    }),

    flipQuestion: (state, action) => {
      const nextQuestion = state.questionIndex + action.payload.flip;
      const pageDiff = nextQuestion % 10 === 0 && nextQuestion !== 0 ? action.payload.flip : 0;
      const newPage = state.page + pageDiff;

      let newQuestion = state.questionIndex + action.payload.flip;
      if (newQuestion < 0) newQuestion = 0;

      if (newPage >= 0) {
        return {
          ...state,
          questionIndex: newQuestion,
          page: newPage
        };
      }
    },

    loadDefaultState: () => ({
      selectedTopics: [],
      selectedTags: [],
      questions: null,
      questionIndex: 0,
      page: 0,
      answeredQuestions: [],
      highlightedTexts: []  // Reset highlighted text when resetting exam
    }),

    initExam: () => ({
      questionIndex: 0,
      page: 0,
      answeredQuestions: [],
      highlightedTexts: []  // Reset highlighted text when initializing the exam
    })
  }
});

export default examSlice.reducer;

export const {
  flipPage,
  setQuestions,
  addSAnswer,
  clearSAnswer,
  addHighlightedText, // Action to add highlighted text
  clearHighlightedText, // Action to clear all highlighted texts
  setTopics,
  setTags,
  setRevision,
  setHistory,
  flipQuestion,
  loadDefaultState,
  initExam
} = examSlice.actions;

export const selectPage = (state) => state.exam.page;
export const selectRevision = (state) => state.exam.revision;
export const selectHistory = (state) => state.exam.history;
export const selectSelectedTopics = (state) => state.exam.selectedTopics;
export const selectSelectedTags = (state) => state.exam.selectedTags;
export const selectQuestions = (state) => state.exam.questions;
export const selectQuestionIndex = (state) => state.exam.questionIndex;
export const selectAnsweredQuestions = (state) => state.exam.answeredQuestions;
export const selectHighlightedTexts = (state) => state.exam.highlightedTexts; // Selector for highlighted texts
