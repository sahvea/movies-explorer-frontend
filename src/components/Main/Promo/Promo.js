import './Promo.css';
import WebLogo from './WebLogo/WebLogo';

function Main() {
  return (
    <section className="promo">
      <div className="promo__container app__section">
        <div className="promo__intro-text">
          <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
          <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        </div>
        <WebLogo />

        {/* TODO: REF (https://reactjs.org/docs/refs-and-the-dom.html#creating-refs) */}
        <a href="#about" className="app__link promo__more-btn">Узнать больше</a>
      </div>
    </section>
  )
}

export default Main;