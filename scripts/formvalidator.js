export const configs = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible' 
  }); 

export class FormValidator{

// В конструкторе присвоим классу внутренние поля из конфига    
    constructor(configs, form){
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
    enableValidation(){
       // this._disableButton();
        this._toggleButtonState()
        this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
    
// Комментарий ревьюера - Согласно чек-листу:
// кнопка отправки формы неактивна, если хотя бы одно из полей не проходит валидацию;
// После добавления новой карточки и при повторном открытии модального окна, есть возможность 
// создать пустую карточку. Этого не должно происходить. При открытии модального окна, 
// если вы обнуляете значения полей ввода, необходимо делать кнопку сохранения неактивной и добавлять ей соответствующий класс.
// Подсказка: данный функционал реализован внутри функции _toggleButtonState. 
// Чтобы после добавления карточки кнопка  сохранения была задизейблена можно реализацию дизейбла
//  вынести в отдельную функцию и использовать в данной функции после evt.preventDefault();, а также в функции, _toggleButtonState
     
  this._disableButton();
// Сделал как в подсказке, но не совсем понял как воспроизвести описываемый сценарий. Если сразу вызывать _toggleButtonState то помоему эта строчка тут не нужна..

});
// В установку слушателей тоже не нужно больше пробрасывать переменные, они все есть в объекте
    this._setEventListeners() 
    }
    
    _setEventListeners() {
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._button = this._form.querySelector(this._submitButtonSelector);
    
    this._inputs.forEach(input => {
        input.addEventListener('input', (evt) => {
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
        errorElement.textContent = '';
        errorElement.classList.remove(this._inputErrorClass);
    }
  // Меняем состояние кнопки
    _toggleButtonState() {
        if (this._isAllValid) {
            this._button.disabled = false;
            this._button.classList.remove(this._inactiveButtonClass);
        } else {
            this._disableButton()
        }
    }
    _disableButton(){
        this._button.disabled = true;
        this._button.classList.add(this._inactiveButtonClass);
    }
}

