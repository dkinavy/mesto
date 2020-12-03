
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

const popupImageSelector = '.popup__fullimage';
// Зададим переменные для попапа профиля
const buttonOpenProfilePopup = document.querySelector(".profile__edit-button")

// Зададим переменные для нового попапа добавления карточки
const buttonOpenImagePopup = document.querySelector(".profile__add-button")

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");


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
