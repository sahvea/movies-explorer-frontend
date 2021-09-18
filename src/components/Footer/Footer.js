import "./Footer.css";

function Footer() {
  return (
    <footer className="footer page__section">
      <p className="footer__heading">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__wrap">
        <p className="footer__copyright">&copy; 2021</p>
        <ul className="footer__social-list">
          <li className="footer__social-list-item">
            <a className="link footer__social-link" href="https://praktikum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          </li>
          <li className="footer__social-list-item">
            <a className="link footer__social-link" href="https://github.com/sahvea" target="_blank" rel="noreferrer">Github</a>
          </li>
          <li className="footer__social-list-item">
            <a className="link footer__social-link" href="https://github.com/sahvea" target="_blank" rel="noreferrer">Facebook</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;