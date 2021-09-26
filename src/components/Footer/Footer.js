import "./Footer.css";

function Footer(props) {
  return (
    <footer className={`footer app__section ${props.isLoading && window.innerWidth >= 1000 ? "footer_fixed" : ""}`}>
      <p className="footer__heading">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__wrap">
        <p className="footer__copyright">&copy; 2021</p>
        <ul className="footer__social-list">
          <li className="footer__social-list-item">
            <a className="app__link footer__social-link" href="https://praktikum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          </li>
          <li className="footer__social-list-item">
            <a className="app__link footer__social-link" href="https://github.com/sahvea" target="_blank" rel="noreferrer">Github</a>
          </li>
          <li className="footer__social-list-item">
            <a className="app__link footer__social-link" href="https://t.me/sahvea" target="_blank" rel="noreferrer">Telegram</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;