import { configureStore } from "@reduxjs/toolkit";
import questionsList from "../components/questionsList/QuestionsListSlice";
import pagination from "../components/pagination/paginationSlice";
import question from "../components/question/QuestionSlice";

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

const store = configureStore({
  reducer: { questionsList, pagination, question },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
