import iconHistory from "../../assets/icons/history.svg";
import "./header.scss";
const Header = () => {
  return (
    <header className="header">
      <div className="header__mainIcon">
        <img src={iconHistory} alt="mainIcon" />
      </div>
      <div className="header__text">history-force</div>
    </header>
  );
};

export default Header;
