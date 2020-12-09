export const configs = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export class FormValidator {
  // В конструкторе присвоим классу внутренние поля из конфига
  constructor(configs, form) {
    this._formSelector = configs.formSelector;
    this._form = form;
    this._inputSelector = configs.inputSelector;
    this._submitButtonSelector = configs.submitButtonSelector;
    this._inactiveButtonClass = configs.inactiveButtonClass;
    this._inputErrorClass = configs.inputErrorClass;
    this._errorClass = configs.errorClass;
    this._button = this._form.querySelector(this._submitButtonSelector);
  }
  //enableValidation теперь будет проще, так как вызывается только для одного объекта
  enableValidation() {
    // this._disableButton();
    this._toggleButtonState();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._disableButton();
    });
    // В установку слушателей тоже не нужно больше пробрасывать переменные, они все есть в объекте
    this._setEventListeners();
  }

  _setEventListeners() {
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._button = this._form.querySelector(this._submitButtonSelector);
    // console.log(this._inputs)
    this._isAllValid = this._form.checkValidity();
    this._toggleButtonState();
    this._inputs.forEach((input) => {
      input.addEventListener("input", (evt) => {
        //проверяем на валидность
        this._checkInputValidity(input);
        //      console.log(input)
        // меняем состояние кнопки отправки в зависимости от валидности всех инпутов
        this._isAllValid = this._form.checkValidity();
        this._toggleButtonState();
      });
    });
  }

  // Проверяем инпут на валидность, не включаем кастомные тексты ошибок
  _checkInputValidity(input) {
    if (input.checkValidity()) {
      //       console.log(input)
      this._hideError(input);
    } else {
      this._showError(input);
      //   console.log(input)
    }
  }

  _showError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    // console.log(errorElement)
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._inputErrorClass);
  }
  // Убираем текст ошибки если все хорошо
  _hideError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    errorElement.textContent = "";
    errorElement.classList.remove(this._inputErrorClass);
  }
  // Меняем состояние кнопки
  _toggleButtonState() {
    if (this._isAllValid) {
      this._button.disabled = false;
      this._button.classList.remove(this._inactiveButtonClass);
    } else {
      this._disableButton();
    }
  }
  _disableButton() {
    this._button.disabled = true;
    this._button.classList.add(this._inactiveButtonClass);
  }
}
