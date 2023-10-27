import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import apiService from "../../utils/apiService";

const initialState = {
  questions: [],
  testsLoadingStatus: "idle",
};

export const fetchTests = createAsyncThunk("questionsList/fetchTests", () => {
  const api = new apiService();
  return api.fetchData("http://localhost:3001/tests");
});

const questionsListSlice = createSlice({
  name: "questionsList",
  initialState,
  reducers: {},
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

const { reducer } = questionsListSlice;

export default reducer;
