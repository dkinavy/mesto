
const imagePopup = document.querySelector(".image-popup");
const imagePopupTitle = document.querySelector(".popup__image-title");



export class Card {
    constructor(data, cardSelector,{handleCardClick}) {
      //  console.log(data.name)

        this._data = data;
        this._text = data.name;
        this._image = data.link;
        this._owner = data.owner;
        this._likes = data.likes;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }


    _setEventListeners() {



       this._element.querySelector('.element__image').addEventListener('click', ()=> this._handleCardClick(this._data));

        //Добавим листнер клика по корзине которая удалит картинку
        this._element.querySelector('.element__trash').addEventListener('click', function (evt) {
            evt.target.closest('.element').remove();
        });
        // Добавим листнер клика по сердечку который меняет цвет
        this._element.querySelector('.element__icon').addEventListener('click',
            this._toggleIcon);
        // document.addEventListener('keydown', closePopupByEscapePress);
        // this._element.querySelector('.element__image').addEventListener('click', closePopupByMouseClick);

    }
    
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__image').src = this._image;
        this._element.querySelector('.element__name').textContent = this._text;

        return this._element;
    }
    //**Функции лайка, удаления картинки и превью необходимо реализовать в данном классе
    //Функция переключает вид лайка сердечка
    _toggleIcon(el) {
        el.target.classList.toggle('element__icon_active');
    }
    // Функция открывает попап с большой картинкой, принимает на вход объект
    _openPopupFullImage() {
        // Присваиваем попапу адрес исходного изображения

        imagePopup.src = this._image;
        // И подпись из карточки    
        imagePopupTitle.textContent = this._text;
        //Вызываем универсальную функцию открытия попапа    
        openPopup(popupFullimage);
    }
    // Удаление попапа также реализовано в этом классе

}
