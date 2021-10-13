import './FilterCheckbox.css';

function FilterCheckbox(props) {
  return (
    <label className={props.labelClass}>{props.labelText}
      <input type="checkbox" name={props.checkboxName}
        className="filter-checkbox"
        checked={props.isChecked}
        onChange={props.onCheckboxChange}
      />
    </label>
  );
}

export default FilterCheckbox;