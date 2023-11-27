import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  answers: [],
  countCorrectAns: [],
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    addAnswer: (state, action) => {
      const { indexPage, indexAns, answer, isCorrectAns } = action.payload;

      const existingAnswer = state.answers.find(
        (item) => item.indexPage === indexPage
      );
      if (existingAnswer) {
        state.answers = state.answers.map((item) =>
          item.indexPage === indexPage
            ? { indexPage, answer, indexAns, isCorrectAns }
            : item
        );
      } else {
        state.answers.push({ indexPage, indexAns, answer, isCorrectAns });
      }
    },
    clearAnswers: (state, action) => {
      state.answers = [];
    },
  },
});

const { reducer, actions } = questionSlice;

export const { addAnswer, addCounCorrectAns, clearAnswers } = actions;

export default reducer;
