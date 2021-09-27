import { useLocation } from 'react-router-dom';
import './InfoPopup.css';

function InfoPopup(props) {
  const location = useLocation();

  const infoMessageText = props.onSuccess && location.pathname !== '/profile'
    ? "Вы успешно зарегистрировались!"
    : props.onSuccess && location.pathname === '/profile'
    ? "Данные успешно обновлены!"
    : "Что-то пошло не так! Попробуйте ещё раз."

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