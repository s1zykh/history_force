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
  },
});

const { reducer, actions } = paginationSlice;
export const { setActivePage, setNumberOfClick } = actions;

export default reducer;
