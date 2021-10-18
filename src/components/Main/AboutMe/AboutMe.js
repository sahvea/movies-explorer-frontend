import './AboutMe.css';
import student from '../../../images/img_20211011.jpg';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
  return (
    <section className="about-me main__section">
      <h2 className="main__section-title">Студент</h2>
      <div className="about-me__info-wrap">
        <div className="about-me__info">
          <h3 className="about-me__name">София</h3>
          <p className="about-me__activity">Фронтенд-разработчик, 24 года</p>
          <p className="main__paragraph about-me__text">Живу в Калининграде, закончила факультет лингвистики в БФУ. С января 2021 прохожу курсы по веб-разработке, параллельно работаю на junior позиции. Берегу свои бездонные папки на КиноПоиске, однако зеленые квадратики активности на MyShows сменились аналогичными на GitHub, о чем ни капли не жалею.</p>
          <ul className="about-me__links-list">
            <li className="about-me__links-item">
              <a href="https://t.me/sahvea" target="_blank" className="app__link about-me__link" rel="noreferrer">Telegram</a>
            </li>
            <li className="about-me__links-item">
              <a href="https://github.com/sahvea" target="_blank" className="app__link about-me__link" rel="noreferrer">Github</a>
            </li>
          </ul>
        </div>
        <img className="about-me__image" src={student} alt="фото студента"/>
      </div>
      <Portfolio />
    </section>
  )
}

export default AboutMe;