import { Login } from "./login.js";
import { Messages } from "./messages.js";

const login = new Login();
const messages = new Messages();

const htmlElements = {
  messageOutput: document.querySelector("ul.messages"),
  authorDisplayName: document.querySelector(".chat-header__author"),
  loginButton: document.querySelector(".chat-header__btns .btn-green"),
  logoutButton: document.querySelector(".chat-header__btns .btn-red"),
  loginButtonText: document.querySelector(
    "form.signup-form > div.buttom-text > a"
  ),
  sendButton: document.querySelector(".chat-footer .btn-green")
};

htmlElements.loginButton.addEventListener("click", login.loginClick);
htmlElements.loginButtonText.addEventListener("click", login.loginClick);
htmlElements.logoutButton.addEventListener("click", login.logoutClick);
htmlElements.messageOutput.classList.add("hidden");
htmlElements.sendButton.addEventListener("submit", init);

document.addEventListener("loginSuccess", init);

function init() {
  const userId = localStorage.getItem("userId");
  //console.log(userId);

  if (userId === null || userId === undefined) {
    login.loginClick();
  } else {
    messages.init();
    htmlElements.authorDisplayName.innerText = localStorage.getItem("userName");
    htmlElements.messageOutput.classList.remove("hidden");
    htmlElements.logoutButton.classList.remove("hidden");
    htmlElements.loginButton.classList.add("hidden");
  }
}
init();
