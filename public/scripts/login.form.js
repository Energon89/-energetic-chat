import { Form } from "./form.js";

let onSubmitExternal;

function onFormSubmit({ title, values }) {
  console.clear();
  console.log(`%c Form '${title}' is VALID`, "color: green");
  console.log("form values:", values);
  onSubmitExternal();
}

function onFormReject({ title }) {
  console.clear();
  console.log(
    `%c Form '${title}' is NOT VALID, check form values and try again...`,
    "color: blue"
  );
}

const FORM_SELECTOR = "login-form";

export class LoginForm {
  init(onSubmit) {
    onSubmitExternal = onSubmit;
    new Form(FORM_SELECTOR).init(onFormSubmit, onFormReject);
  }
}
