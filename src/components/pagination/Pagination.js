import { useSelector, useDispatch } from "react-redux";
import { setNumberOfClick } from "./paginationSlice";
import "./pagination.scss";

const Pagination = ({ count }) => {
  const { activePage } = useSelector((state) => state.pagination);

  const dispatch = useDispatch();

  const renderItem = (c) => {
    let masItem = [];
    if (c.questions.length > 0) {
      const count = c.questions[0].QuestionsAnswers.length;
      for (let i = 1; i <= count; i++) {
        masItem.push(
          <li
            key={i}
            className={`${activePage === i ? "itemActive" : ""}`}
            onClick={() => dispatch(setNumberOfClick(i))}
          >
            {i}
          </li>
        );
      }
    }
    return masItem;
  };

  const render = renderItem(count);

  return <ul className="pagination">{render}</ul>;
};

export default Pagination;
