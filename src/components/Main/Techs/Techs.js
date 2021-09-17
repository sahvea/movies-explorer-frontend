import './Techs.css';

function Techs() {
  return (
    <section className="techs">
      <div className="techs__container page__section">
        <h2 className="page__section-title techs__section-title">Технологии</h2>
        <h3 className="techs__title">7 технологий</h3>
        <p className="paragraph techs__paragraph">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__list">
          <li>
            <p className="techs__skill">HTML</p>
          </li>
          <li>
            <p className="techs__skill">CSS</p>
          </li>
          <li>
            <p className="techs__skill">JS</p>
          </li>
          <li>
            <p className="techs__skill">React</p>
          </li>
          <li>
            <p className="techs__skill">Git</p>
          </li>
          <li>
            <p className="techs__skill">Express.js</p>
          </li>
          <li>
            <p className="techs__skill">mongoDB</p>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Techs;