import './Burger.css';

function Burger(props) {
  return (
    <button type="button" className="button burger" onClick={props.onBurgerClick}>
      <span className="burger__line"></span>
      <span className="burger__line"></span>
      <span className="burger__line"></span>
    </button>
  )
}

export default Burger;