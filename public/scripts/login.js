import { UsersService } from "./usersService.js";

const usersService = new UsersService();

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
  divUserName: document.querySelector("form.login-form > div:nth-child(3)"),
  inputPassword: document.querySelector(
    "form.login-form > div:nth-child(4) > input[type=password]"
  ),
  divPassword: document.querySelector("form.login-form > div:nth-child(4)"),
  inputNewUserName: document.querySelector(
    "form.signup-form > div:nth-child(3) > input[type=text]"
  ),
  inputNewPassword: document.querySelector(
    "form.signup-form > div:nth-child(4) > input[type=password]"
  ),
  inputConfirmNewPassword: document.querySelector(
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
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  htmlElements.logoutButton.classList.add("hidden");
  htmlElements.loginButton.classList.remove("hidden");
  htmlElements.messageOutput.classList.add("hidden");
  htmlElements.authorDisplayName.innerText = "";
};

function logIn(event) {
  event.preventDefault();
  const name = htmlElements.inputUserName.value;
  const password = htmlElements.inputPassword.value;
  usersService.getUserInfo(name, password).then(function(data) {
    if (data.userId === null) {
      htmlElements.divUserName.classList.add("invalid");
      htmlElements.divPassword.classList.add("invalid");
      alert("Invalid username or password");
    } else {
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("userName", data.name);
      const evt = new Event("loginSuccess");
      document.dispatchEvent(evt);
      htmlElements.logoutButton.classList.remove("hidden");
      htmlElements.loginButton.classList.add("hidden");
      htmlElements.divUserName.classList.remove("invalid");
      htmlElements.divPassword.classList.remove("invalid");
      closeButtonClick();
    }
  });
}

function signUpClick() {
  htmlElements.loginForm.classList.add("hidden");
  htmlElements.signupForm.classList.remove("hidden");
}

function closeButtonClick() {
  htmlElements.inputUserName.value = "";
  htmlElements.inputPassword.value = "";
  htmlElements.loginForm.classList.add("hidden");
  htmlElements.signupForm.classList.add("hidden");
}

export { Login };
