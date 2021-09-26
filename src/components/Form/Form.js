import './Form.css';

function Form(props) {
  return (
    <form className={`form ${props.formClass}`} name={props.name} onSubmit={props.onSubmit} >
      {/* noValidate */}
      <fieldset className={`form__fieldset ${props.fieldsetClass}`}>
        {props.isLegend &&
          <legend className={`form__legend ${props.legendClass}`}>{props.title}</legend>
        }

        {props.children}
      </fieldset>
    </form>
  );
}

export default Form;