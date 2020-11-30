// класс PopupWithForm, который наследует от Popup
import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
   
    //Кроме селектора попапа принимает в конструктор колбэк сабмита формы
    constructor(popupSelector, {submitForm}) {
        super(popupSelector);  //Вызываем метод родителя this._popupSelector = popupSelector;
        this._submitForm = submitForm;
        this._form = this._popupElement.querySelector('.popup__form');
    }
    // Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
    
    
    _getInputValues(){
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
    // Перезаписывает родительский метод setEventListeners. Метод setEventListeners 
    // класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, 
    // но и добавлять обработчик сабмита формы.
    setEventListeners(){
        this._popupElement.addEventListener('click', (evt)=>{
            if (evt.target.classList.contains('popup__close')) {
                this.close();
            }
        });
        this._form.addEventListener('submit', this._submit(this._getInputValues()));
    }
    //Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.

}

