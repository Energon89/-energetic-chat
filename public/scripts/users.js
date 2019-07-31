import { UsersService } from "./modules.js";

let _usersService;
let _htmlElements;

class Users {
  constructor() {
    _usersService = new UsersService();
    this.initDomElements();
  }

  initDomElements() {
    _htmlElements = {
      inputUserName: document.querySelector(
        "form.signup-form > div:nth-child(3) > input[type=text]"
      ),
      inputPassword: document.querySelector(
        "form.signup-form > div:nth-child(4) > input[type=password]"
      ),
      inputConfirmPassword: document.querySelector(
        "form.signup-form > div:nth-child(5) > input[type=password]"
      ),
      signUpForm: document.querySelector("form.signup-form"),
      divUserName: document.querySelector(
        "form.signup-form > div:nth-child(3)"
      ),
      divPassword: document.querySelector(
        "form.signup-form > div:nth-child(4)"
      ),
      divConfirmPassword: document.querySelector(
        "form.signup-form > div:nth-child(5)"
      )
    };

    //_htmlElements.signUpForm.addEventListener("submit", createNewAccaunt);
  }

  createNewAccount(event) {
    event.preventDefault();
    _htmlElements.divUserName.classList.remove("invalid");
    _htmlElements.divPassword.classList.remove("invalid");
    _htmlElements.divConfirmPassword.classList.remove("invalid");
    const name = _htmlElements.inputUserName.value;
    const password = _htmlElements.inputPassword.value;
    const confirmPassword = _htmlElements.inputConfirmPassword.value;

    _usersService
      .checkUser(name)
      .then(value => {
        if (value === true) {
          return Promise.reject("User with the same name already exists.");
        }
      })
      .then(() => {
        if (checkPasswordValid() === true) {
          const newUser = {
            name: name,
            password: password
          };
          _usersService.addUser(newUser);
          _htmlElements.inputUserName.value = "";
          _htmlElements.inputPassword.value = "";
          _htmlElements.signUpForm.classList.add("hidden");
          alert("Account created successfully!");
        }
      })
      .catch(reject => {
        alert(reject);
        _htmlElements.divUserName.classList.add("invalid");
      });

    const checkPasswordValid = () => {
      const RegexPass = new RegExp(
        "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
      );
      if (!RegexPass.test(password)) {
        alert("Create a stronger password.");
        _htmlElements.divPassword.classList.add("invalid");
        return false;
      }
      if (password !== confirmPassword) {
        _htmlElements.divPassword.classList.add("invalid");
        _htmlElements.divConfirmPassword.classList.add("invalid");
        return false;
      }
      return true;
    };
  }
}

export { Users };
