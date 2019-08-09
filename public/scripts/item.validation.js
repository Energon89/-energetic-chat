export class ItemValidation {
  _validationElement;
  _validationType;
  _validationForElementsArray = [];

  constructor(validationElement) {
    this._validationElement = validationElement;
    this._validationType = validationElement.dataset.validationType;
    this._validationForElementsArray = this._validationElement.dataset.validationFor
      .split(",")
      .map(validationForItem => {
        return this._validationElement
          .closest("form")
          .querySelector(`[name=${validationForItem}]`);
      });
    this.initEventHandler();
    document.addEventListener("sameNameSuccess", () => {
      this.validate();
    });
    document.addEventListener("loginNotSuccess", () => {
      this.validate();
    });
  }

  initEventHandler() {
    this._validationForElementsArray.forEach(element => {
      element.addEventListener("blur", () => {
        this.validate();
      });
    });
  }

  validate() {
    let isValid = true;
    switch (this._validationType) {
      case "required":
        isValid =
          this._validationForElementsArray[0] &&
          this._validationForElementsArray[0].value.length > 0;
        break;
      case "invalid":
        isValid = !localStorage.getItem("isLogin");
        break;
      case "password":
        isValid =
          !this._validationForElementsArray[0].value ||
          !this._validationForElementsArray[1].value ||
          this._validationForElementsArray[0].value ===
            this._validationForElementsArray[1].value;
        break;
      case "stronger":
        const RegexPass = new RegExp(
          "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
        );
        if (!RegexPass.test(this._validationForElementsArray[0].value)) {
          isValid = false;
        }
        break;
      case "samename":
        if (
          this._validationForElementsArray[0].value ===
          localStorage.getItem("sameName")
        ) {
          isValid = false;
        }
        break;
      default:
        throw new Error("validation type is not recognized");
    }

    if (isValid) {
      this.hideErrorMessage();
    } else {
      this.showErrorMessage();
    }

    return isValid;
  }

  showErrorMessage() {
    this._validationElement.classList.remove("hidden");
  }

  hideErrorMessage() {
    this._validationElement.classList.add("hidden");
  }
}
