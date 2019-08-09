import { Form } from "./form.js";

function onFormSubmit({ title, values }) {
  console.clear();
  console.log(`%c Form '${title}' is VALID`, "color: green");
  console.log("form values:", values);
}

function onFormReject({ title }) {
  console.clear();
  console.log(
    `%c Form '${title}' is NOT VALID, check form values and try again...`,
    "color: blue"
  );
}

const FORM_SELECTOR = "signup-form";

export class RegisterForm {
  init() {
    new Form(FORM_SELECTOR).init(onFormSubmit, onFormReject);
  }
}
