import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  toggleTestIsComplered,
  setDataUser,
} from "../questionsList/QuestionsListSlice";
import { clearActivePage } from "../pagination/paginationSlice";
import { clearAnswers } from "../question/QuestionSlice";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import "./button.scss";
import { useEffect } from "react";

const Button = ({ text, to, type, data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    if (to === "/test" && data !== " " && data !== "") {
      dispatch(setDataUser(data));
      navigate(to);
    } else if (to === "/result") {
      dispatch(toggleTestIsComplered(true));
      navigate(to);
    } else {
      navigate(to);
      dispatch(clearActivePage());
      dispatch(clearAnswers());
      dispatch(toggleTestIsComplered(false));
    }
  };

  return (
    <button className={type} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
