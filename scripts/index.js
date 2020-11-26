// Импортируем наши модули
import {FormValidator} from "../scripts/formvalidator.js";
import {configs} from "../scripts/formvalidator.js";
import {Card,initialCards} from "../scripts/card.js";
import {popupFullimage,closePopup, openPopup, closePopupByEscapePress,closePopupByMouseClick} from "../scripts/utils.js";
// Сделаем селекторы для основного окна и для контейнера с карточками
const container = document.querySelector('.content');
const elements = container.querySelector('.elements');

// Зададим переменные для попапа профиля
const buttonOpenProfilePopup = document.querySelector(".profile__edit-button")
const buttonCloseProfilePopup = document.querySelector(".popup__close-type-profile")
const popupProfile = document.querySelector(".popup__profile")
// Зададим переменные для нового попапа добавления карточки
const buttonOpenImagePopup = document.querySelector(".profile__add-button")
const buttonCloseImagePopup = document.querySelector(".popup__close-type-image")
const addCardPopup = document.querySelector(".popup__add-card")
// // Зададим переменные для попапа полноразмерного изображения

const popupClosedFullImage = document.querySelector(".popup__close-type-fullimage");


// Находим форму в DOM
const formProfileElement = document.querySelector(".popup__form_type_profile");
const formImageElement = document.querySelector(".popup__form_type_image");// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM 
const profileName = document.querySelector(".profile__info-name");
const profileTitle = document.querySelector(".profile__info-title");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
// Поля карточки с картинкой
const imagePlace = document.querySelector(".popup__input_type_place");
const imageLink = document.querySelector(".popup__input_type_link");

    // создадим валидаторы для всех форм
    const forms = Array.from(document.querySelectorAll(configs.formSelector));

    forms.forEach(form =>{
        const validator = new FormValidator(configs, form);
        validator.enableValidation ();
 
    })

//Функция открывает попап профиля и загружает в него данные с страницы
function openPopupProfile(){    
    
    // Вставим значения с основной страницы в поля формы
    nameInput.value = profileName.textContent;
    jobInput.value = profileTitle.textContent;
    //Вызовем универсальную функцию открытия попапа
    openPopup (popupProfile);
}

// //Функция открывает попап картинки с местом, но ничего не загружает со страницы
// function openPopupPlace(){
//     openPopup(addCardPopup);
// }

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function submitFormHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileTitle.textContent = jobInput.value;
    closePopup(popupProfile);
}

function submitFormImage (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    const newCard = {
        name: imagePlace.value,
        link: imageLink.value
    };
    // Вставим новую карточку
    const card = new Card(newCard, '#element-template');
    const cardElement = card.generateCard();
  
    addCard(cardElement);
    closePopup(addCardPopup);
}

function addCard(cardElement){
    elements.prepend(cardElement);
}

// Создадим класс карточки

initialCards.forEach((item) => {
    const card = new Card(item, '#element-template');
    const cardElement = card.generateCard();
    
    addCard(cardElement);
    });

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfileElement.addEventListener('submit', submitFormHandler);
formImageElement.addEventListener('submit', submitFormImage); 
//Обрабатываем клики
buttonOpenProfilePopup.addEventListener("click", openPopupProfile);
buttonCloseProfilePopup.addEventListener("click", () => closePopup(popupProfile));
buttonOpenImagePopup.addEventListener("click", ()=>openPopup(addCardPopup));
buttonCloseImagePopup.addEventListener("click", () => closePopup(addCardPopup));
popupClosedFullImage.addEventListener("click", () => closePopup(popupFullimage));