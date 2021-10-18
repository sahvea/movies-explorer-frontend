import './FilterCheckbox.css';

function FilterCheckbox(props) {
  const additionalClass = props.checkboxClass;
  const checkboxClassName = `filter-checkbox ${props.checkboxClass ? additionalClass : "" }`

  return (
    <label className={props.labelClass}>{props.labelText}
      <input type="checkbox" name={props.checkboxName}
        className={checkboxClassName}
        checked={props.isChecked}
        onChange={props.onCheckboxChange}
      />
    </label>
  );
}

export default FilterCheckbox;