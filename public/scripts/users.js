import { UsersService } from "./modules.js";

let _usersService;
let _htmlElements;

export class Users {
  constructor() {
    _usersService = new UsersService();
    this.initDomElements();
    _htmlElements.loginForm.addEventListener("submit", this.logIn);
  }

  initDomElements() {
    _htmlElements = {
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
      ),
      signUpForm: document.querySelector("form.signup-form"),
      loginForm: document.querySelector("form.login-form")
    };
  }

  //check the logs and password in the database
  //if they pass the check we save in the localStorage
  logIn() {
    const name = _htmlElements.inputUserName.value;
    const password = _htmlElements.inputPassword.value;

    _usersService.getUserInfo(name, password).then(function(data) {
      if (!data.userId) {
        localStorage.setItem("isLogin", false);
        console.log(`%c Invalid 'user name' or 'password'!`, "color: blue");
        const evt = new Event("loginNotSuccess");
        document.dispatchEvent(evt);
      } else {
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userName", data.name);
        const evt = new Event("loginSuccess");
        document.dispatchEvent(evt);
      }
    });
  }

  //validation on a same name and creation of a new account
  createNewAccount() {
    const name = _htmlElements.inputUserNameSign.value;
    const password = _htmlElements.inputPasswordSign.value;

    _usersService
      .checkUser(name)
      .then(data => {
        if (data.value === true) {
          localStorage.setItem("sameName", data.name);
          return Promise.reject("User with the same name already exists.");
        }
      })
      .then(() => {
        const newUser = {
          name: name,
          password: password
        };
        _usersService.addUser(newUser);
        _htmlElements.inputUserName.value = "";
        _htmlElements.inputPassword.value = "";
        _htmlElements.inputConfirmPassword.value = "";
        _htmlElements.signUpForm.classList.add("hidden");
        _htmlElements.loginForm.classList.remove("hidden");
        console.clear();
        console.log(`%c Account created successfully!`, "color: green");
      })
      .catch(reject => {
        console.clear();
        console.log(`%c ${reject}`, "color: blue");
        const evt = new Event("sameNameSuccess");
        document.dispatchEvent(evt);
      });
  }
}
