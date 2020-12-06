
import {Card} from './components/Card.js';
import {FormValidator} from './components/FormValidator.js';
// import {Popup} from './components/Popup.js';
import {PopupWithForm} from './components/PopupWithForm.js';
import {PopupWithImage} from './components/PopupWithImage.js';
import {Section} from './components/Section.js';
import {UserInfo} from './components/UserInfo.js';
import {Api} from './components/Api.js';
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
const userNameSelector = '.profile__info-name';
const userJobSelector = '.profile__info-title';
const userAvatarSelector = '.profile__avatar';

const userInfo = new UserInfo({userNameSelector,userJobSelector,userAvatarSelector})

//Создадим объект для работы с апи
const yandex_api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
  headers: {
    authorization: 'a3f1f5fe-630d-4fb3-8d0f-9700ef1ed1ff',
    'Content-Type': 'application/json'
  }
});

//Выведем на страницу имя и профессию с сервера
yandex_api.getUserInfo()
.then((data)=>{
  userInfo.setUserInfo(data);
})

// Процесс создания одной карточки (как в случае, когда мы проходим циклом 
//   по начальным карточкам, так и в случае создания новой карточки) можно 
//   вынести в отдельную функцию (создать можно внутри коллбека then после 
//     ответа сервера, если необходим доступ к полученному ответу оттуда) 
//     и использовать в двух местах - в цикле и в handleFormSubmit попапа
const createNewCard = (data) =>{
  const card = new Card(element,       
    '#element-template',
    {handleCardClick: (element) => {
       //console.log(element)
       const imagePopup = new PopupWithImage(popupImageSelector);
       imagePopup.open(element);
   }
     });
}



















//Вызовем метод этого объекта который загружает имеющиеся карты в список

yandex_api.getInitialCards()
  .then((data) => {
// Заполним первоначальные карточки
// будем грузить их с сервера
//console.log(data);
  const cardList = new Section({
    items: data,
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
// Отрисуем список
  cardList.renderCards()
  })
  .catch((err) => {
    console.log(err);
  })

 //Попап Добавим карточку
  const addCardPopup = new PopupWithForm('.popup__add-card', {
    submitForm: (element) => {
      yandex_api.addCard(element)
      .then((res)=>{
       
        const cardElement = card.generateCard();
        cardsList.addItem(cardElement, 'prepend');
      })




    }
  })
 // console.log(openPopupProfile)

 //Попап с формой редактирования инфы о пользователе
 const popupProfile = new PopupWithForm('.popup__profile', {
    submitForm: (element) => {
      // console.log(element)
        yandex_api.setUserInfo(element)
        .then((res) => {return res.json()})
        .then((res) => {
          userInfo.setUserInfo(res);
        })
    }
 });





// Добавим слушатели на кнопки
  buttonOpenProfilePopup.addEventListener("click", () => {
    // const userInfo = new UserInfo({userNameSelector,userJobSelector})
    // const userData = userInfo.getUserInfo();

    // yandex_api.setUserInfo()
    // .then((data)=>{
    //   nameInput.value = data.name;
    //   jobInput.value = data.about;
    // });
    // //openPopupProfile.open();
    popupProfile.open();
  });
 
  buttonOpenImagePopup.addEventListener("click", ()=> addCardPopup.open());
     // создадим валидаторы для всех форм
     const forms = Array.from(document.querySelectorAll(configs.formSelector));
     forms.forEach(form =>{
         const validator = new FormValidator(configs, form);
         validator.enableValidation ();
 
     })
