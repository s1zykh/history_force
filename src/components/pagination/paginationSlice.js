import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activePage: 1,
};

const paginationSlice = createSlice({
  name: "questionsList",
  initialState,
  reducers: {
    setActivePage: (state, action) => {
      state.activePage += action.payload;
    },
    setNumberOfClick: (state, action) => {
      state.activePage = action.payload;
    },
    clearActivePage: (state, action) => {
      state.activePage = 1;
    },
  },
});

const { reducer, actions } = paginationSlice;
export const { setActivePage, setNumberOfClick, clearActivePage } = actions;

export default reducer;
