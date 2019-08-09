import { UsersService } from "./modules.js";

//Create DOM elements
const htmlElements = {
  messageOutput: document.querySelector("ul.messages"),
  authorDisplayName: document.querySelector(".chat-header__author"),
  logoutButton: document.querySelector(".chat-header__btns .btn-red"),
  loginButton: document.querySelector(".chat-header__btns .btn-green"),
  loginForm: document.querySelector("form.login-form"),
  signupForm: document.querySelector("form.signup-form"),
  closeButtons: document.querySelectorAll(".close"),
  signUp: document.querySelector("form.login-form > div.buttom-text > a"),
  logInButton: document.querySelector("form.login-form > button"),
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
  button.addEventListener("click", closeButtonClick);
});
htmlElements.loginForm.addEventListener("submit", logIn);
htmlElements.logoutButton.classList.add("hidden");

function Login() {}

Login.prototype.loginClick = function() {
  htmlElements.signupForm.classList.add("hidden");
  htmlElements.loginForm.classList.remove("hidden");
};

Login.prototype.logoutClick = function() {
  // localStorage.removeItem("userId");
  // localStorage.removeItem("userName");
  localStorage.clear();
  htmlElements.logoutButton.classList.add("hidden");
  htmlElements.loginButton.classList.remove("hidden");
  htmlElements.messageOutput.classList.add("hidden");
  htmlElements.authorDisplayName.innerText = "";
  closeButtonClick();
};

//check the logs and password in the database
//if they pass the check we enter in the localStorage
function logIn(event) {
  event.preventDefault();
  const name = htmlElements.inputUserName.value;
  const password = htmlElements.inputPassword.value;
  const _usersService = new UsersService();
  if (!name || !password) {
    return false;
  }
  _usersService.getUserInfo(name, password).then(function(data) {
    if (!data.userId) {
      localStorage.setItem("userName", data.name);
      console.log(`%c Invalid 'user name' or 'password'!`, "color: blue");
      const evt = new Event("loginNotSuccess");
      document.dispatchEvent(evt);
    } else {
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("userName", data.name);
      const evt = new Event("loginSuccess");
      document.dispatchEvent(evt);
      htmlElements.logoutButton.classList.remove("hidden");
      htmlElements.loginButton.classList.add("hidden");
      closeButtonClick();
    }
  });
}

function signUpClick() {
  htmlElements.loginForm.classList.add("hidden");
  htmlElements.signupForm.classList.remove("hidden");
}

//function responsible for clicking on the close button
function closeButtonClick() {
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
  //localStorage.removeItem("userName");
}

export { Login };
