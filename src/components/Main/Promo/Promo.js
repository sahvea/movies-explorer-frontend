import './Promo.css';
import AnchorLink from 'react-anchor-link-smooth-scroll'
import WebLogo from './WebLogo/WebLogo';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container main__section">
        <div className="promo__intro-text">
          <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
          <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        </div>
        <WebLogo />
        <AnchorLink href="#about" className="app__link promo__more-btn">Узнать больше</AnchorLink>
      </div>
    </section>
  )
}

export default Promo;