import './FilterCheckbox.css';

function FilterCheckbox(props) {
  return (
    <label className={props.labelClass}>{props.labelText}
      <input type="checkbox" name="short"
        className="filter-checkbox"
        checked={props.isChecked}
        onChange={props.onCheckboxChange}
      />
    </label>
  );
}

export default FilterCheckbox;