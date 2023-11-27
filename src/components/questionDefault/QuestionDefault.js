import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";

import { addAnswer } from "../question/QuestionSlice";
import Petr from "../../assets/img/Petr.png";

const QuestionDefault = ({
  data,
  index,
  activeI = { indexAns: null },
  page,
}) => {
  const [activeIndex, setActiveIndex] = useState(activeI.indexAns);
  const [isCorrectAns, setIsCorrectAns] = useState(false);
  const [dataAns, setDataAns] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeIndex !== undefined && activeIndex !== null) {
      data.answerOptions.split(",")[activeIndex].trim() ===
      data.correctAnswer.trim()
        ? setIsCorrectAns(true)
        : setIsCorrectAns(false);
      dispatch(addAnswer({ ...dataAns, isCorrectAns }));
    }
  }, [activeIndex, isCorrectAns, dataAns]);

  const handleClick = (i, answer) => {
    if (page === "result") {
      console.log("tet");
      return;
    }
    setActiveIndex(i);
    setDataAns(answer);
  };
  return (
    <>
      <div className="question__content-questionAndAnswer">
        <ul className="question__content-questionAndAnswer-answer fontAtkinson">
          {data.answerOptions.split(",").map((item, i) => {
            const clsName = classNames({
              active: activeIndex === i && page === "default",
              correct:
                item.trim() === data.correctAnswer.trim() && activeI.answer,
              wrong:
                activeI.answer &&
                activeI.answer.trim() !== data.correctAnswer.trim() &&
                activeI.indexAns === i,
              hover: page === "default",
            });
            return (
              <li
                key={i}
                className={clsName}
                onClick={() =>
                  handleClick(i, {
                    answer: item,
                    indexPage: index,
                    indexAns: i,
                  })
                }
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="question__img">
        <img src={Petr} alt="Petr" />
      </div>
    </>
  );
};

export default QuestionDefault;
