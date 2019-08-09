import { ItemValidation } from "./item.validation.js";

class FormValidation {
  _validationItemsArray = [];

  constructor(formElement) {
    if (!formElement) {
      throw new Error("form element is not defined");
    }

    formElement.querySelectorAll("[data-validation]").forEach(element => {
      this._validationItemsArray.push(new ItemValidation(element));
    });
  }

  validate() {
    let isValid = true;
    this._validationItemsArray.forEach(item => {
      isValid = !item.validate() ? false : isValid;
    });
    return isValid;
  }
}

export { FormValidation };
