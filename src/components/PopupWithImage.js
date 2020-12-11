// Создайте класс PopupWithImage, который наследует от Popup
import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector); //Вызываем метод родителя this._popupSelector = popupSelector;

    // console.log(this._popupImage);
  }

  //типа крутим спинер
  loading_on(){
    super._submitButton.textContent = 'Сохранение...'
  }
  loading_off(){
    super._submitButton.textContent = 'Создать'
  }
  
  // Этот класс должен перезаписывать родительский метод open
  open(image) {
    // В методе open нужно вставлять в попап картинку и атрибут src изображения и подпись к картинке.
    const imagePopup = this._popupElement.querySelector(".image-popup");
    imagePopup.src = image.link;
    imagePopup.alt = image.place;
    this._popupElement.querySelector(".popup__image-title").textContent =
      image.place;
    super.open();
  }
}
