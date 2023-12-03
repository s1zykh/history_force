import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../utils/apiService";

const initialState = {
  questions: [],
  currentQuestion: {},
  testsLoadingStatus: "idle",
  testIsComplered: false,
  dataUser: "",
  isTimeEnded: false,
  maximumCountOfPoints: 0,
};

export const fetchTests = createAsyncThunk("questionsList/fetchTests", () => {
  const api = new apiService();
  return api.fetchData("http://localhost:3001/tests");
});

const questionsListSlice = createSlice({
  name: "questionsList",
  initialState,
  reducers: {
    toggleTestIsComplered: (state, action) => {
      state.testIsComplered = action.payload;
    },
    setDataUser: (state, action) => {
      state.dataUser = action.payload;
    },
    toggleIsTimeEnded: (state, action) => {
      state.isTimeEnded = action.payload;
    },
    addMaximumCountOfPoints: (state, action) => {
      action.payload === "default"
        ? (state.maximumCountOfPoints += 0.5)
        : (state.maximumCountOfPoints += action.payload / 2);
    },
    addCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTests.pending, (state) => {
        state.testsLoadingStatus = "loading";
      })
      .addCase(fetchTests.fulfilled, (state, action) => {
        state.testsLoadingStatus = "idle";
        state.questions = action.payload;
      })
      .addCase(fetchTests.rejected, (state) => {
        state.testsLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { reducer, actions } = questionsListSlice;

export const {
  toggleTestIsComplered,
  setDataUser,
  toggleIsTimeEnded,
  addMaximumCountOfPoints,
  addCurrentQuestion,
} = actions;

export default reducer;
