// Создайте класс PopupWithImage, который наследует от Popup
import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    
    constructor(popupSelector) {
        super(popupSelector);  //Вызываем метод родителя this._popupSelector = popupSelector;
        this._popupImage = this._popupElement.querySelector('.popup__fullimage');
    }

    // Этот класс должен перезаписывать родительский метод open
    open(image) {
        // В методе open нужно вставлять в попап картинку и атрибут src изображения и подпись к картинке.
    this._popupImage.src = image.link
    this._popupImage.name = image.name;
    super.setEventListeners();
    super._popupElement.classList.add('popup_opened');
    }

}