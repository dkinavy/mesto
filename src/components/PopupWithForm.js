// класс PopupWithForm, который наследует от Popup
import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
   
    //Кроме селектора попапа принимает в конструктор колбэк сабмита формы
    constructor(popupSelector, {submitForm}) {
        super(popupSelector);  //Вызываем метод родителя this._popupSelector = popupSelector;
        this._submitForm = submitForm;
        this._form = this._popupElement.querySelector('.popup__form');
        this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
        this._listener = (evt)=>{
            evt.preventDefault();
            this._submitForm(this._getInputValues());
            this.close();
        };
    }
    // Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
    
    
    _getInputValues(){
        

        const inputsData = {};
      //  console.log(this._inputs);
        this._inputs.forEach(input => {
            // console.log(input.id);
            // console.log(input.value);
            inputsData[input.id] = input.value;

            
        });
        //console.log(inputsData);
        return inputsData;

    }
    // Перезаписывает родительский метод setEventListeners. Метод setEventListeners 
    // класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, 
    // но и добавлять обработчик сабмита формы.
    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit',this._listener ) 
    }
    //Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
    close() {
        this._form.removeEventListener('submit',this._listener ) 
        this._form.reset();
        super.close();
      }
}

