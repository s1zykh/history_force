import Petr from "../../assets/img/Petr.png";
import "./Quetion.scss";
const Question = ({ q }) => {
  return (
    <div className="question">
      <div className="question__content">
        <div className="question__content-questionAndAnswer">
          <div className="question__content-questionAndAnswer-question fontAtkinson">
            Who was the first Tsar of Russia, also known as Ivan the Terrible?
          </div>
          <ul className="question__content-questionAndAnswer-answer fontAtkinson">
            <li>Petr I</li>
            <li>Ivan III</li>
            <li>Ivan IV</li>
            <li>Catherine the Great</li>
          </ul>
        </div>
        <div className="question__img">
          <img src={Petr} alt="Petr" />
        </div>
      </div>
    </div>
  );
};

export default Question;
