import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UseLocalStorage } from "../../hooks/useLocalStorage";
import apiService from "../../utils/apiService";

const initialState = {
  questions: [],
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
      //const localStorage = UseLocalStorage(action.payload, "userData");
      state.dataUser = action.payload;
      // localStorage.setValue(action.payload);
    },
    toggleIsTimeEnded: (state, action) => {
      state.isTimeEnded = action.payload;
    },
    addMaximumCountOfPoints: (state, action) => {
      action.payload === "default"
        ? (state.maximumCountOfPoints += 0.5)
        : (state.maximumCountOfPoints += action.payload / 2);
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
} = actions;

export default reducer;
