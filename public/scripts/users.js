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
      loginForm: document.querySelector("form.login-form")
    };
  }

  createNewAccount(event) {
    event.preventDefault();
    const name = _htmlElements.inputUserName.value;
    const password = _htmlElements.inputPassword.value;
    const confirmPassword = _htmlElements.inputConfirmPassword.value;

    _usersService
      .checkUser(name)
      .then(data => {
        if (data.value === true) {
          localStorage.setItem("sameName", data.name);
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
          _htmlElements.inputConfirmPassword.value = "";
          _htmlElements.signUpForm.classList.add("hidden");
          _htmlElements.loginForm.classList.remove("hidden");
          //alert("Account created successfully!");
          console.clear();
          console.log(`%c Account created successfully!`, "color: green");
        }
      })
      .catch(reject => {
        console.clear();
        console.log(`%c ${reject}`, "color: blue");
        const evt = new Event("sameNameSuccess");
        document.dispatchEvent(evt);
      });

    const checkPasswordValid = () => {
      const RegexPass = new RegExp(
        "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
      );
      if (!RegexPass.test(password)) {
        return false;
      }
      if (password !== confirmPassword) {
        return false;
      }
      return true;
    };
  }
}

export { Users };
