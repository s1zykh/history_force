import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toggleTestIsComplered } from "../questionsList/QuestionsListSlice";

import "./timer.scss";

const Timer = ({ min }) => {
  const [time, setTime] = useState(min);
  const [heartAnimation, setHeartAnimation] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
        if (time === 10) {
          setHeartAnimation(true);
        }
      } else {
        setHeartAnimation(false);
        clearInterval(timer);
        dispatch(toggleTestIsComplered(true));
        navigate("/result");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const timerClass = `timer fontAtkinson ${heartAnimation ? "heartBeat" : ""}`;

  return (
    <div className={timerClass}>
      {`${minutes < 10 ? "0" : ""}${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}`}
    </div>
  );
};

export default Timer;
