import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleTestIsComplered } from "../questionsList/QuestionsListSlice";
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
    } else {
      navigate(to);
      dispatch(clearActivePage());
      dispatch(clearAnswers());
      dispatch(toggleTestIsComplered(false));
    }
  };

  return (
    <button
      className={type}
      onClick={handleClick}
      type="button"
      disabled={valid ? true : false}
    >
      {text}
    </button>
  );
};

export default Button;
