import {toggleIcon, closePopupByEscapePress,closePopupByMouseClick,openPopupFullImage} from "../scripts/utils.js";

// Шесть карточек из коробки
export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]; 

export class Card {
    constructor(data, cardSelector) {
      this._text = data.name;
      this._image = data.link;
      this._cardSelector = cardSelector;
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
        this._element.querySelector('.element__image').addEventListener('click', function (evt) {
            openPopupFullImage(evt)
            });
        
        //Добавим листнер клика по корзине которая удалит картинку
        this._element.querySelector('.element__trash').addEventListener('click', function (evt) {
            evt.target.closest('.element').remove(); 
            });
            //Добавим листнер клика по сердечку который меняет цвет
        this._element.querySelector('.element__icon').addEventListener('click', function (evt) {
            toggleIcon(evt); 
            });
        document.addEventListener('keydown',closePopupByEscapePress);
        this._element.addEventListener('click',closePopupByMouseClick);
    
    } 

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
    
        this._element.querySelector('.element__image').src = this._image;
        this._element.querySelector('.element__name').textContent = this._text;
    
        return this._element;
      }

    }