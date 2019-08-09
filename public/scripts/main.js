import { Login, Messages, Users, RegisterForm, LoginForm } from "./modules.js";
import * as preloader from "./preloader.js";

const _login = new Login();
const _messages = new Messages();
const _users = new Users();
new RegisterForm().init();
new LoginForm().init();

const htmlElements = {
  messageOutput: document.querySelector("ul.messages"),
  authorDisplayName: document.querySelector(".chat-header__author"),
  loginButton: document.querySelector(".chat-header__btns .btn-green"),
  logoutButton: document.querySelector(".chat-header__btns .btn-red"),
  loginButtonText: document.querySelector(
    "form.signup-form > div.buttom-text > a"
  ),
  signUpForm: document.querySelector("form.signup-form")
};

htmlElements.loginButton.addEventListener("click", _login.loginClick);
htmlElements.loginButtonText.addEventListener("click", _login.loginClick);
htmlElements.logoutButton.addEventListener("click", _login.logoutClick);
htmlElements.signUpForm.addEventListener("submit", _users.createNewAccount);
htmlElements.messageOutput.classList.add("hidden");

document.addEventListener("loginSuccess", init);

//function initializing at page loading
function init() {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    _login.loginClick();
  } else {
    _messages.init();
    htmlElements.authorDisplayName.innerText = localStorage.getItem("userName");
    htmlElements.messageOutput.classList.remove("hidden");
    htmlElements.logoutButton.classList.remove("hidden");
    htmlElements.loginButton.classList.add("hidden");
  }
}
init();
