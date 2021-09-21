import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__links-list">
        <li className="portfolio__links-item">
          <a className="app__link portfolio__link" href="https://sahvea.github.io/how-to-learn/" target="_blank" rel="noreferrer">Статичный сайт
            <span className="portfolio__link-arrow">&#8599;</span>
          </a>
        </li>
        <li className="portfolio__links-item">
          <a className="app__link portfolio__link" href="https://sahvea.github.io/russian-travel/" target="_blank" rel="noreferrer">Адаптивный сайт
          <span className="portfolio__link-arrow">&#8599;</span>
          </a>
        </li>
        <li className="portfolio__links-item">
          <a className="app__link portfolio__link" href="https://mesto.sophie.nomoredomains.club" target="_blank" rel="noreferrer">Одностраничное приложение
          <span className="portfolio__link-arrow">&#8599;</span>
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;