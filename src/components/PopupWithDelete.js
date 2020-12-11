import { Popup } from "./Popup.js";

export class PopupWithDelete extends Popup {
  //Кроме селектора попапа принимает в конструктор колбэк сабмита формы
  constructor(popupSelector, { submitForm }) {
    super(popupSelector); //Вызываем метод родителя this._popupSelector = popupSelector;
    this._submitForm = submitForm;
    this._form = this._popupElement.querySelector(".popup__form");

    this._listener = (evt) => {
      evt.preventDefault();
      this._submitForm(this._data);
     // this.close();
    };
  }

  // Перезаписывает родительский метод setEventListeners. Метод setEventListeners
  // класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия,
  // но и добавлять обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._listener);
  }
  // Перезаписывает метод орен так как мы в сабмит должны передать какую конкретную карточку нужно удалять
  open(data) {
    this._data = data;
    super.open();
  }
}
