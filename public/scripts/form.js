import { FormValidation } from "./form.validation.js";

function getFormValues(formElement) {
  const elementsWithValue = Array.from(formElement.elements).filter(element =>
    Boolean(element.name)
  );
  const entries = elementsWithValue.map(element => [
    element.name,
    element.value
  ]);
  const objToReturn = Object.fromEntries(entries);
  return objToReturn;
}

class Form {
  _formElement;
  _formValidation;
  _formTitle;

  constructor(className) {
    this._formElement = document.querySelector(`.${className}`);
    this._formValidation = new FormValidation(this._formElement);
    this._formTitle = document.querySelector(
      `h1[data-title-for=${className}`
    ).textContent;
  }

  init(onSubmit, onReject) {
    this._formElement.addEventListener("submit", evt => {
      evt.preventDefault();

      const isValid = this._formValidation.validate();
      if (isValid) {
        onSubmit({
          title: this._formTitle,
          values: getFormValues(this._formElement)
        });
      } else {
        onReject({
          title: this._formTitle
        });
      }
    });
  }
}

export { Form };
