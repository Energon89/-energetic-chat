import { Login, Messages } from "./modules.js";
import "./preloader.js";

const _login = new Login();
const _messages = new Messages();

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
htmlElements.messageOutput.classList.add("hidden");

document.addEventListener("loginSuccess", init);

//function initializing at page loading
function init() {
  const userId = localStorage.getItem("userId");
  localStorage.removeItem("isLogin");

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
