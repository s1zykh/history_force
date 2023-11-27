import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { addAnswer } from "../question/QuestionSlice";

import classNames from "classnames";
const QuestionComparison = ({
  data,
  index,
  answers = { answer: data.answerOptions.left.split(",").map(() => "") },
  page,
}) => {
  const [ans, setAns] = useState(answers.answer);
  const [isCorrectAns, setIsCorrectAns] = useState(
    data.answerOptions.left.split(",").map(() => false)
  );

  const dispatch = useDispatch();
  // prettier-ignore
  const russianAlphabet = [
      'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М',
      'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы',
      'Ь', 'Э', 'Ю', 'Я'
    ];

  useEffect(() => {
    if (
      ans.length === data.answerOptions.left.split(",").length &&
      ans[0] &&
      page === "default"
    ) {
      dispatch(
        addAnswer({ answer: ans, indexPage: index, indexAns: 1, isCorrectAns })
      );
    }
  }, [ans, isCorrectAns, page]);

  const hanldeClick = (val, i) => {
    setAns((prevAns) => {
      const updatedAns = [...prevAns];
      updatedAns[i] = val;
      return updatedAns;
    });
    setIsCorrectAns((prevAns) => {
      const updatedAns = [...prevAns];
      updatedAns[i] = data.correctAnswer.split("")[i] === val;
      return updatedAns;
    });
  };

  return (
    <>
      <div className="question__comparison">
        <div className="question__list">
          <ul className="question__list-block fontAtkinson">
            {data.answerOptions.left.split(",").map((item, i) => (
              <li key={i}>
                {russianAlphabet[i]}) {item}
              </li>
            ))}
          </ul>
          <ul className="question__list-block fontAtkinson">
            {data.answerOptions.right.split(",").map((item, i) => (
              <li key={i}>
                {i + 1}) {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="questions__table">
          <table className="table">
            <thead>
              <tr>
                {data.answerOptions.left.split(",").map((_, i) => (
                  <th key={i} className="table__column">
                    {russianAlphabet[i]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {data.answerOptions.left.split(",").map((item, i) => {
                  const clsName = classNames({
                    "correct correct__input":
                      data.correctAnswer.split("")[i] === ans[i] &&
                      page === "result",
                    "wrong wrong__input":
                      data.correctAnswer.split("")[i] !== ans[i] &&
                      page === "result",
                  });

                  return (
                    <td key={i} className="table__rows">
                      <input
                        type="text"
                        value={ans[i]}
                        className={clsName}
                        onChange={(e) => hanldeClick(e.target.value, i)}
                      />
                      {!isCorrectAns[i] && page !== "default" ? (
                        <div className="correct">
                          {data.correctAnswer.split("")[i]}
                        </div>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default QuestionComparison;
