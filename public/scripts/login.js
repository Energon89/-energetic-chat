import { Users, RegisterForm, LoginForm } from "./modules.js";

//Initialize DOM elements
const htmlElements = {
  messageOutput: document.querySelector("ul.messages"),
  authorDisplayName: document.querySelector(".chat-header__author"),
  logoutButton: document.querySelector(".chat-header__btns .btn-red"),
  loginButton: document.querySelector(".chat-header__btns .btn-green"),
  loginForm: document.querySelector("form.login-form"),
  signupForm: document.querySelector("form.signup-form"),
  closeButtons: document.querySelectorAll(".close"),
  signUp: document.querySelector("form.login-form > div.buttom-text > a"),
  inputUserName: document.querySelector(
    "form.login-form > div:nth-child(3) > input[type=text]"
  ),
  inputPassword: document.querySelector(
    "form.login-form > div:nth-child(4) > input[type=password]"
  ),
  inputUserNameSign: document.querySelector(
    "form.signup-form > div:nth-child(3) > input[type=text]"
  ),
  inputPasswordSign: document.querySelector(
    "form.signup-form > div:nth-child(4) > input[type=password]"
  ),
  inputConfirmPassword: document.querySelector(
    "form.signup-form > div:nth-child(5) > input[type=password]"
  )
};

htmlElements.signUp.addEventListener("click", signUpClick);
htmlElements.closeButtons.forEach(function(button) {
  button.addEventListener("click", hideForms);
});
htmlElements.logoutButton.classList.add("hidden");
document.addEventListener("loginSuccess", loginSuccess);

function Login() {
  new RegisterForm().init(this.OnRegisterSubmitHandler);
  new LoginForm().init(this.OnLoginSubmitHandler);
}

Login.prototype.OnRegisterSubmitHandler = function() {
  const _users = new Users();
  _users.createNewAccount();
};

Login.prototype.OnLoginSubmitHandler = function() {
  const _users = new Users();
  _users.logIn();
};

Login.prototype.loginClick = function() {
  htmlElements.signupForm.classList.add("hidden");
  htmlElements.loginForm.classList.remove("hidden");
};

Login.prototype.logoutClick = function() {
  localStorage.clear();
  htmlElements.logoutButton.classList.add("hidden");
  htmlElements.loginButton.classList.remove("hidden");
  htmlElements.messageOutput.classList.add("hidden");
  htmlElements.authorDisplayName.innerText = "";
  hideForms();
};

function loginSuccess() {
  htmlElements.logoutButton.classList.remove("hidden");
  htmlElements.loginButton.classList.add("hidden");
  hideForms();
}

function signUpClick() {
  htmlElements.loginForm.classList.add("hidden");
  htmlElements.signupForm.classList.remove("hidden");
}

//function responsible for hide forms to clicking on the close button
function hideForms() {
  htmlElements.inputUserName.value = "";
  htmlElements.inputPassword.value = "";
  htmlElements.inputUserNameSign.value = "";
  htmlElements.inputPasswordSign.value = "";
  htmlElements.inputConfirmPassword.value = "";
  htmlElements.loginForm.classList.add("hidden");
  htmlElements.signupForm.classList.add("hidden");
  htmlElements.loginForm.querySelectorAll(".error").forEach(element => {
    element.classList.add("hidden");
  });
  htmlElements.signupForm.querySelectorAll(".error").forEach(element => {
    element.classList.add("hidden");
  });
  localStorage.removeItem("isLogin");
}

export { Login };
