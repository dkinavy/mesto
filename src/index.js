
import {Card, initialCards} from './components/Card.js';
import {FormValidator} from './components/FormValidator.js';
import {Popup} from './components/Popup.js';
import {PopupWithForm} from './components/PopupWithForm.js';
import {PopupWithImage} from './components/PopupWithImage.js';
import {Section} from './components/Section.js';
import {UserInfo} from './components/UserInfo.js';
import './pages/index.css';
const configs = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible' 
  }); 
// Сделаем селекторы для основного окна и для контейнера с карточками
const container = document.querySelector('.content');
// const elements = container.querySelector('.elements');
// const popupSelector = '.popup';
const popupImageSelector = '.popup__fullimage';
// Зададим переменные для попапа профиля
const buttonOpenProfilePopup = document.querySelector(".profile__edit-button")
// const buttonCloseProfilePopup = document.querySelector(".popup__close-type-profile")
//const popupProfile = document.querySelector(".popup__profile")
// Зададим переменные для нового попапа добавления карточки
const buttonOpenImagePopup = document.querySelector(".profile__add-button")
// const buttonCloseImagePopup = document.querySelector(".popup__close-type-image")
//const addCardPopup = document.querySelector(".popup__add-card")
// // Зададим переменные для попапа полноразмерного изображения
// const popupFullimage = document.querySelector(".popup__fullimage")
// const popupClosedFullImage = document.querySelector(".popup__close-type-fullimage");


// Находим форму в DOM
// const formProfileElement = document.querySelector(".popup__form_type_profile");
// const formImageElement = document.querySelector(".popup__form_type_image");// Воспользуйтесь методом querySelector()
// const formsList = Array.from(document.forms);

// Находим поля формы в DOM 
// const profileName = document.querySelector(".profile__info-name");
// const profileTitle = document.querySelector(".profile__info-title");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
// Поля карточки с картинкой
// const imagePlace = document.querySelector(".popup__input_type_place");
// const imageLink = document.querySelector(".popup__input_type_link");

//

// const data = { 
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'};

//  const first = new Card({data},       
//  '#element-template',{handleCardClick: (data) => {
//     photoPopup.open(data);}
//   })
//   console.log(first)


//Заполним первоначальные 6 карточек
  const cardList = new Section({
    items: initialCards,
    renderer: (element) => {
        const card = new Card(element,       
             '#element-template',
             {handleCardClick: (element) => {
                //console.log(element)
                const imagePopup = new PopupWithImage(popupImageSelector);
                imagePopup.open(element);
            }
              });
    
    const cardElement = card.generateCard();
    
    cardList.addItem(cardElement);
    }
  }, '.elements');

  cardList.renderCards()
  
//Обрабатываем клики

  const addCardPopup = new PopupWithForm('.popup__add-card', {
    submitForm: (element) => {
        const card = new Card(element,       
            '#element-template',
            {handleCardClick: (element) => {
               //console.log(element)
               const imagePopup = new PopupWithImage(popupImageSelector);
               imagePopup.open(element);
           }
             });
      const cardElement = card.generateCard();
      cardList.addItem(cardElement, 'prepend');
    }
  })
 // console.log(openPopupProfile)
const userNameSelector = '.profile__info-name';
const userJobSelector = '.profile__info-title';
 
 const popupProfile = new PopupWithForm('.popup__profile', {
    submitForm: (element) => {
        const userInfo = new UserInfo ({userNameSelector,userJobSelector})
        userInfo.setUserInfo(element);

    }
 });



// Добавим слушатели на кнопки
  buttonOpenProfilePopup.addEventListener("click", () => {
    const userInfo = new UserInfo({userNameSelector,userJobSelector})
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.job;
    //openPopupProfile.open();
    popupProfile.open();
  });
 
  buttonOpenImagePopup.addEventListener("click", ()=> addCardPopup.open());
     // создадим валидаторы для всех форм
     const forms = Array.from(document.querySelectorAll(configs.formSelector));
     forms.forEach(form =>{
         const validator = new FormValidator(configs, form);
         validator.enableValidation ();
 
     })
//      }

// const forms = Array.from(document.querySelectorAll(configs.formSelector));

//     forms.forEach(form =>{
//         const validator = new FormValidator(configs, form);
//         validator.enableValidation ();
 
//     })

// //Функция открывает попап профиля и загружает в него данные с страницы
// function openPopupProfile(){    
    
//     // Вставим значения с основной страницы в поля формы
//     nameInput.value = profileName.textContent;
//     jobInput.value = profileTitle.textContent;
//     //Вызовем универсальную функцию открытия попапа
//     openPopup (popupProfile);
// }

// // //Функция открывает попап картинки с местом, но ничего не загружает со страницы
// // function openPopupPlace(){
// //     openPopup(addCardPopup);
// // }

// // Обработчик «отправки» формы, хотя пока
// // она никуда отправляться не будет
// function submitFormHandler (evt) {
//     evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
//     // Вставьте новые значения с помощью textContent
//     profileName.textContent = nameInput.value;
//     profileTitle.textContent = jobInput.value;
//     closePopup(popupProfile);
// }

// function submitFormImage (evt) {
//     evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
//     const newCard = {
//         name: imagePlace.value,
//         link: imageLink.value
//     };
//     // Вставим новую карточку
//     const card = new Card(newCard, '#element-template');
//     const cardElement = card.generateCard();
//     formImageElement.reset();

//     addCard(cardElement);
//     closePopup(addCardPopup);
// }

// function addCard(cardElement){
//     elements.prepend(cardElement);
// }

// Создадим класс карточки

// initialCards.forEach((item) => {
//     const card = new Card(item, '#element-template');
//     const cardElement = card.generateCard();
    
//     addCard(cardElement);
//     });

// // Прикрепляем обработчик к форме:
// // он будет следить за событием “submit” - «отправка»
// formProfileElement.addEventListener('submit', submitFormHandler);
// formImageElement.addEventListener('submit', submitFormImage); 
// //Обрабатываем клики
// buttonOpenProfilePopup.addEventListener("click", openPopupProfile);
// buttonCloseProfilePopup.addEventListener("click", () => closePopup(popupProfile));
// buttonOpenImagePopup.addEventListener("click", ()=>openPopup(addCardPopup));
// buttonCloseImagePopup.addEventListener("click", () => closePopup(addCardPopup));
// popupClosedFullImage.addEventListener("click", () => closePopup(popupFullimage));