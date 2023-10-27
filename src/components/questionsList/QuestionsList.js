import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTests } from "./QuestionsListSlice";
import Question from "../question/Question";
import Carousel from "../../components/carousel/Carousel";
import Pagination from "../pagination/Pagination";
import "./questionsList.scss";

const QuestionsList = () => {
  const dispatch = useDispatch();

  const countQuestions = useSelector((state) => {
    return state.questionsList;
  });

  useEffect(() => {
    dispatch(fetchTests());
  }, []);

  const renderList = (list) => {
    let masItem = [];
    if (list.questions.length > 0) {
      const count = list.questions[0].QuestionsAnswers.length;
      for (let i = 1; i <= count; i++) {
        masItem.push(<Question key={i} text={i} />);
      }
    }
    return masItem;
  };

  const render = renderList(countQuestions);

  return (
    <div className="questionList">
      <div className="questionList__time fontAtkinson">10:00</div>
      <Carousel>{render}</Carousel>
      <Pagination count={countQuestions} />
    </div>
  );
};

export default QuestionsList;
