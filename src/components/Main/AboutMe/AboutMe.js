import './AboutMe.css';
import student from '../../../images/avatar-example.jpg';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
  return (
    <section className="about-me main__section">
      <h2 className="main__section-title">Студент</h2>
      <div className="about-me__info-wrap">
        <div className="about-me__info">
          <h3 className="about-me__name">Виталий</h3>
          <p className="about-me__activity">Фронтенд-разработчик, 30 лет</p>
          <p className="main__paragraph about-me__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
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