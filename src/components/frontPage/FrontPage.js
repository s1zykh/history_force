import { useRef, useEffect, useState } from "react";
import { useInput } from "../../hooks/useInput";

import Button from "../button/Button";
import "./frontPage.scss";
import icon from "../../assets/icons/history.svg";

const FrontPage = () => {
  const firstName = useInput("", { isEmpty: true, isNumber: false });
  const lastName = useInput("", { isEmpty: true, isNumber: false });
  const inputRef = useRef();

  const [validationMessage, setValidationMessage] = useState(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (
      (lastName.isDirty && lastName.isEmpty) ||
      (firstName.isDirty && firstName.isEmpty)
    ) {
      setValidationMessage("Заполните все поля!");
    } else if (
      (firstName.isDirty && firstName.isNumber) ||
      (lastName.isDirty && lastName.isNumber)
    ) {
      setValidationMessage("Только буквы!");
    } else {
      setValidationMessage(null);
    }
  }, [
    lastName.isDirty,
    lastName.isEmpty,
    firstName.isDirty,
    firstName.isEmpty,
    firstName.isNumber,
    lastName.isNumber,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="frontPage">
        <div className="frontPage__content">
          <div className="frontPage__logo">
            <img src={icon} alt="icon" />
          </div>
          <div className="frontPage__header">Тест по истории России</div>
          <form onSubmit={handleSubmit} className="form">
            <div className="frontPage__data">
              <input
                ref={inputRef}
                type="text"
                placeholder="Фамилия"
                value={lastName.value}
                onChange={(e) => lastName.onChange(e)}
                onBlur={(e) => lastName.onBlur(e)}
              />
              <input
                type="text"
                placeholder="Имя"
                value={firstName.value}
                onChange={(e) => firstName.onChange(e)}
                onBlur={(e) => firstName.onBlur(e)}
              />
            </div>
            <div className="error">{validationMessage}</div>
            <Button
              text={"Начать"}
              to={"/test"}
              type={"button button__frontPage"}
              data={`${firstName.value} ${lastName.value}`}
              valid={validationMessage}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
