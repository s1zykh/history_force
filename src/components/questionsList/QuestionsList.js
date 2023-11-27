import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTests } from "./QuestionsListSlice";

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

  const { isTimeEnded } = useSelector((state) => state.questionsList);

  const countAnswers = useSelector((state) => {
    if (countQuestions.questions.length > 0) {
      return (
        state.question.answers.length ===
        countQuestions.questions[0].QuestionsAnswers.length
      );
    } else {
      return false;
    }
  });

  const { testIsComplered } = useSelector((state) => state.questionsList);

  useEffect(() => {
    dispatch(fetchTests());
  }, []);

  const renderList = (list) => {
    let masItem = [];
    if (list.questions.length > 0) {
      const questionData = list.questions[0].QuestionsAnswers;
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
    <div className="questionList">
      {testIsComplered ? null : (
        <div className="questionList__time fontAtkinson">
          <Timer min={900} />
        </div>
      )}
      {testIsComplered ? render : <Carousel>{render}</Carousel>}
      {testIsComplered ? null : <Pagination count={countQuestions} />}

      <Button text={"Завершить"} to={"/result"} type={"button button__list"} />
    </div>
  );
};

export default QuestionsList;
