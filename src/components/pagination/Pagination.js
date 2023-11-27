import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setNumberOfClick } from "./paginationSlice";
import classNames from "classnames";
import "./pagination.scss";

const Pagination = ({ count }) => {
  const { activePage } = useSelector((state) => state.pagination);
  const { answers } = useSelector((state) => state.question);
  const [answeredPages, setAnsweredPages] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const answered = answers.map((answer) => answer.indexPage);
    setAnsweredPages(answered);
  }, [answers]);

  const renderItem = (c) => {
    let masItem = [];
    if (c.questions.length > 0) {
      const count = c.questions[0].QuestionsAnswers.length;
      for (let i = 1; i <= count; i++) {
        const clsName = classNames({
          itemActive: activePage === i,
        });

        masItem.push(
          <li
            key={i}
            className={clsName}
            onClick={() => dispatch(setNumberOfClick(i))}
          >
            {i}
            {answeredPages.includes(i) ? (
              <div className="pagination__filled"></div>
            ) : null}
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
