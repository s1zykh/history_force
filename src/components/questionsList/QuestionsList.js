import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Timer from "../timer/Timer";
import Question from "../question/Question";
import Carousel from "../../components/carousel/Carousel";
import Pagination from "../pagination/Pagination";
import Button from "../button/Button";

import "./questionsList.scss";

const QuestionsList = () => {
  const dispatch = useDispatch();

  const countQuestions = useSelector((state) => {
    return state.questionsList;
  });

  const { testIsComplered } = useSelector((state) => state.questionsList);

  const renderList = (list) => {
    let masItem = [];
    if (list.currentQuestion.id) {
      const questionData = list.currentQuestion.QuestionsAnswers;
      for (let i = 1; i <= questionData.length; i++) {
        masItem.push(
          <Question
            key={i}
            index={i}
            dataQuestion={questionData[i - 1]}
            page={"default"}
          />
        );
      }
    }
    return masItem;
  };

  const render = renderList(countQuestions);

  return (
    <div className="container">
      <div className="questionList">
        {testIsComplered ? null : (
          <div className="questionList__time fontAtkinson">
            <Timer min={2000} />
          </div>
        )}
        {testIsComplered ? render : <Carousel>{render}</Carousel>}
        {testIsComplered ? null : <Pagination count={countQuestions} />}

        <Button
          text={"Завершить"}
          to={"/result"}
          type={"button button__list"}
        />
      </div>
    </div>
  );
};

export default QuestionsList;
