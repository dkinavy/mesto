

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
// const popupFullimage = document.querySelector(".popup__fullimage")
// // Зададим переменные для попапа полноразмерного изображения
// const imagePopup = document.querySelector(".image-popup");
// const imagePopupTitle = document.querySelector(".popup__image-title");
let popupOpened = document.querySelector(".popup_opened");
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
   // console.log(forms)
    forms.forEach(form =>{
        const validator = new FormValidator(configs, form);
        validator.enableValidation ();
      //  console.log(form)
    })



//Функция открывает попап профиля и загружает в него данные с страницы
function openPopupProfile(){    
    
    // Вставим значения с основной страницы в поля формы
    nameInput.value = profileName.textContent;
    jobInput.value = profileTitle.textContent;
    //Вызовем универсальную функцию открытия попапа
    openPopup (popupProfile);
}
// // Функция открывает попап с большой картинкой, принимает на вход объект
// function openPopupFullImage(image){
//     // Присваиваем попапу адрес исходного изображения
//     console.log(image);
//     imagePopup.src = image.toElement.src;
//     // И подпись из карточки    
//     imagePopupTitle.textContent = image.target.offsetParent.innerText;
//     //Вызываем универсальную функцию открытия попапа    
//     openPopup(popupFullimage);
// }

//Функция открывает попап картинки с местом, но ничего не загружает со страницы
function openPopupPlace(){
    openPopup(addCardPopup);
}

// //Функция переключает вид лайка сердечка
// function toggleIcon(evt) {
//     evt.target.classList.toggle('element__icon_active'); 
//     }
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
  
    elements.prepend(cardElement);
    closePopup(addCardPopup);

}
// Функция которая закрывает любой попап при нажатии ескейп
// function closePopupByEscapePress(evt){
//     //  console.log(evt);
//       const openedPopup = document.querySelector(".popup_opened")
//       if (evt.key === 'Escape') {
//       closePopup(openedPopup); 
//       }
//   }
  
// function closePopupByMouseClick(evt){
//       const openedPopup = document.querySelector(".popup_opened")
//       if (evt.target.classList.contains('popup')) {
//       closePopup(openedPopup); }
//   }

// // Закрываем попап. Удаляем все слушатели
// function closePopup(popup){
//     popup.classList.remove("popup_opened");
//     // удалим листнеры 
//     document.removeEventListener('keydown',closePopupByEscapePress);
//     popup.removeEventListener('click',closePopupByMouseClick);
// //    removeMouseClickPopup(popup);     
// }

// //Открывем попап, устанавливаем нужные слушатели
// function openPopup(popup){
//     popup.classList.add("popup_opened");
//     // передадим ссылку на функции в листнер
//     document.addEventListener('keydown',closePopupByEscapePress);
//     popup.addEventListener('click',closePopupByMouseClick);
// //    addMouseClickPopup(popup)
// }


// Разово загрузим 6 карточек из InitialCards
//initialCards.forEach(addCard);

// Создадим класс карточки

initialCards.forEach((item) => {
    const card = new Card(item, '#element-template');
    const cardElement = card.generateCard();
    
    elements.prepend(cardElement);
    });


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfileElement.addEventListener('submit', submitFormHandler);
formImageElement.addEventListener('submit', submitFormImage); 
//Обрабатываем клики
buttonOpenProfilePopup.addEventListener("click", openPopupProfile);
buttonCloseProfilePopup.addEventListener("click", () => closePopup(popupProfile));
buttonOpenImagePopup.addEventListener("click", openPopupPlace);
buttonCloseImagePopup.addEventListener("click", () => closePopup(addCardPopup));
popupClosedFullImage.addEventListener("click", () => closePopup(popupFullimage));