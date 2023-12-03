import petrImg from "../../assets/img/Petr.png";
import "./testItem.scss";
const TestItem = ({ name, description, onClickTest }) => {
  return (
    <div className="testItem" onClick={() => onClickTest()}>
      <div className="testItem__content">
        <div className="testItem__name">
          <div className="testItem__name-img">
            <img src={petrImg} alt="" />
          </div>
          <div className="testItem__name-text">{name}</div>
        </div>
        <div className="testItem__description">{description}</div>
      </div>
    </div>
  );
};

export default TestItem;
