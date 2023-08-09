import True from "../images/True.svg";
import False from "../images/False.svg";

function InfoTooltip(props) {
  const titleOk = "Вы успешно зарегистрировались!";
  const titleWrong = "Что-то пошло не так! Попробуйте ещё раз";

  return (
    <div
      className={`popup ${props.name} ${props.isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        ></button>
        <div className="popup__info">
          <img
            className="popup__sign"
            src={props.status ? True : False}
            alt="Значок статуса"
          />
          <h3 className="popup__text">{props.status ? titleOk : titleWrong}</h3>
        </div>
      </div>
    </div>
  );
}
export default InfoTooltip;
