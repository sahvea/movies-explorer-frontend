import './AboutProject.css';

function AboutProject() {
  return (
    <section id="about" className="about app__section">
      <h2 className="app__section-title">О проекте</h2>
      <ul className="about__desc-list">
        <li className="about__desc-lis-item">
          <h3 className="about__desc-title">Дипломный проект включал 5 этапов</h3>
          <p className="app__paragraph about__desc-paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="about__desc-lis-item">
          <h3 className="about__desc-title">На выполнение диплома ушло 5 недель</h3>
          <p className="app__paragraph about__desc-paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <table className="about__table">
        <thead>
          <tr>
            <th className="about__table-header">1 неделя</th>
            <th className="about__table-header">4 недели</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="about__table-cell">Back-end</td>
            <td className="about__table-cell">Front-end</td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}

export default AboutProject;