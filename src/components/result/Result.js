import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Question from "../question/Question";
import Header from "../header/Header";
import Button from "../button/Button";

import "./result.scss";
const Result = () => {
  const { answers } = useSelector((state) => state.question);
  const questions = useSelector((state) => {
    return state.questionsList;
  });

  const renderList = (list, ans) => {
    let masItem = [];
    if (list.questions.length > 0) {
      const questionData = list.questions[0].QuestionsAnswers;
      for (let i = 1; i <= questionData.length; i++) {
        masItem.push(
          <div key={i}>
            <Question
              index={i}
              answers={ans[i - 1]}
              dataQuestion={questionData[i - 1]}
              page={"result"}
            />
            <div className="result__line"></div>
          </div>
        );
      }
    }
    return masItem;
  };

  const render = renderList(questions, answers);

  return (
    <>
      <Header />
      <div className="result">
        <div className="result__wrapper">
          <div className="result__wrapper-content">
            {render}
            <FinishPage />
            <Button text={"Пройти снова"} to={"/"} type={"button"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;

const FinishPage = () => {
  const { dataUser } = useSelector((state) => state.questionsList);
  const { answers } = useSelector((state) => state.question);
  const { maximumCountOfPoints } = useSelector((state) => state.questionsList);

  const [totalCorrect, setTotalCorrect] = useState(0);

  useEffect(() => {
    let correctCount = 0;

    answers.forEach((answer) => {
      const isCorrectAnsArray = Array.isArray(answer.isCorrectAns);

      if (
        (isCorrectAnsArray || typeof answer.isCorrectAns === "boolean") &&
        answer.indexPage !== null &&
        answer.indexPage !== undefined
      ) {
        const isCorrectArray = isCorrectAnsArray
          ? answer.isCorrectAns
          : [answer.isCorrectAns];

        isCorrectArray.forEach((isCorrect) => {
          if (isCorrect) {
            correctCount += 1;
          }
        });
      }
    });
    setTotalCorrect(correctCount);
  }, [answers]);

  return (
    <div className="result__user">
      <div className="result__frame">
        <div className="result__dataUser">
          <div className="result__dataUser-data">{dataUser.split(" ")[1]}</div>
          <div className="result__dataUser-data">{dataUser.split(" ")[0]}</div>
        </div>
        <div className="result__answers">
          Решили правильно:
          <div className="result__answers-resolved">
            <span>{totalCorrect}</span> / <span>{maximumCountOfPoints}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
