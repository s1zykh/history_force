import { useDispatch } from "react-redux";
import QuestionDefault from "../questionDefault/QuestionDefault";
import QuestionComparison from "../questionComparsion/QuestionСomparison";
import { addMaximumCountOfPoints } from "../questionsList/QuestionsListSlice";

import "./Quetion.scss";
import { useEffect } from "react";

const Question = ({ index, answers, dataQuestion, page }) => {
  const dispatch = useDispatch();
  const renderAnswers =
    dataQuestion.type === "comparison" ? (
      <QuestionComparison
        data={dataQuestion}
        index={index}
        answers={answers}
        page={page}
      />
    ) : (
      <QuestionDefault
        data={dataQuestion}
        index={index}
        activeI={answers}
        page={page}
      />
    );

  useEffect(() => {
    if (dataQuestion.type === "default" && page === "default") {
      dispatch(addMaximumCountOfPoints("default"));
    } else if (dataQuestion.type === "comparison" && page === "default") {
      dispatch(
        addMaximumCountOfPoints(
          dataQuestion.answerOptions.left.split(",").length
        )
      );
    }
  }, [dataQuestion.type, page]);

  return (
    <div className="question">
      <div className="question__topic fontAtkinson">
        {dataQuestion.questionText}
      </div>
      <div className="question__content">{renderAnswers}</div>
    </div>
  );
};

export default Question;
