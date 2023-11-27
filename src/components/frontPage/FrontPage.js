import { useRef, useEffect } from "react";
import { useInput } from "../../hooks/useInput";

import Button from "../button/Button";
import "./frontPage.scss";
import icon from "../../assets/icons/history.svg";

const FrontPage = () => {
  const firstName = useInput("", { isEmpty: true, isNumber: true });
  const lastName = useInput("", { isEmpty: true, isNumber: true });
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="frontPage">
      <div className="frontPage__content">
        <div className="frontPage__logo">
          <img src={icon} alt="icon" />
        </div>
        <div className="frontPage__header">Тест по истории России</div>
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
        {(lastName.isDirty && lastName.isEmpty) ||
        (firstName.isDirty && firstName.isEmpty) ? (
          <div className="error">Заполните все поля</div>
        ) : null}

        <Button
          text={"Начать"}
          to={"/test"}
          type={"button button__frontPage"}
          data={`${firstName.value} ${lastName.value}`}
        />
      </div>
    </div>
  );
};

export default FrontPage;
