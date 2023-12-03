import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  toggleTestIsComplered,
  addCurrentQuestion,
} from "../questionsList/QuestionsListSlice";
import { clearActivePage } from "../pagination/paginationSlice";
import { clearAnswers } from "../question/QuestionSlice";
import useLocalStorage from "../../hooks/useLocalStorage";

import "./button.scss";

const Button = ({ text, to, type, data, valid }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useLocalStorage("dataUser", "");

  const handleClick = () => {
    if (to === "/test" && data !== " " && data !== "") {
      setValue(data);
      navigate(to);
    } else if (to === "/result") {
      dispatch(toggleTestIsComplered(true));
      navigate(to);
    } else if (to === "testView") {
      navigate(to);
      dispatch(clearActivePage());
      dispatch(clearAnswers());
      dispatch(toggleTestIsComplered(false));
    } else if (to === "/") {
      navigate(to);
      dispatch(addCurrentQuestion({}));
    }
  };

  return (
    <button
      className={type}
      onClick={handleClick}
      type={to !== "/" ? "button" : null}
      disabled={valid ? true : false}
    >
      {text}
    </button>
  );
};

export default Button;
