import './Burger.css';

function Burger(props) {
  return (
    <button type="button" className="button burger" onClick={props.handleBurgerClick}>
      <span className={`burger__line ${props.mobMenu ? "burger__line_active" : ""}`}></span>
      <span className={`burger__line ${props.mobMenu ? "burger__line_active" : ""}`}></span>
      <span className={`burger__line ${props.mobMenu ? "burger__line_active" : ""}`}></span>
    </button>
  )
}

export default Burger;