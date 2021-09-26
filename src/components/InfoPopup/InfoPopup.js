import './InfoPopup.css';

function InfoPopup(props) {
  const infoMessageText = props.onSuccess
    ? "Вы успешно зарегистрировались!"
    : "Что-то пошло не так! Попробуйте ещё раз.";

  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="app__button popup__close-btn" type="button" aria-label="Закрыть" title="Закрыть" onClick={props.onClose}></button>
        <p className="popup__info-message">{infoMessageText}</p>
        {!props.onSuccess &&
          <p className="popup__error-message">
            <span className="popup__error-accent">Ошибка:</span>
            {props.errorMessage}
          </p>
        }
      </div>
    </div>
  );
}

export default InfoPopup;