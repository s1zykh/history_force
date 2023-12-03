import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { useEffect } from "react";
import {
  fetchTests,
  addCurrentQuestion,
} from "../questionsList/QuestionsListSlice";
import TestItem from "../testItem/TestItem";

import "./testList.scss";

const TestsList = () => {
  const { questions } = useSelector((state) => state.questionsList);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTests());
  }, []);

  const onClickTest = (data) => {
    dispatch(addCurrentQuestion(data));
    navigate("/testView");
  };

  const renderItemTest = (arr) => {
    if (arr.length > 0) {
      return arr.map((item) => (
        <TestItem
          key={item.id}
          name={item.name}
          description={item.description}
          onClickTest={() => onClickTest(questions[item.id - 1])}
        />
      ));
    }
  };

  return (
    <div className="testList">
      <div className="container">
        <div className="testList__content">{renderItemTest(questions)}</div>
      </div>
    </div>
  );
};

export default TestsList;
