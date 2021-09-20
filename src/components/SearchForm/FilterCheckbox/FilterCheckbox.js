import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <label className="search__checkbox"> Короткометражки
      <input type="checkbox" className="filter-checkbox" name="short" defaultChecked />
    </label>
  );
}

export default FilterCheckbox;