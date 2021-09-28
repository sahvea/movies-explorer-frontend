import './FilterCheckbox.css';

function FilterCheckbox(props) {
  return (
    <label className={props.labelClass}> Короткометражки
      <input type="checkbox" className="filter-checkbox" name="short" defaultChecked />
    </label>
  );
}

export default FilterCheckbox;