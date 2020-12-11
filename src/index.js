import {
  Card
} from "./components/Card.js";
import {
  FormValidator
} from "./components/FormValidator.js";
// import {Popup} from './components/Popup.js';
import {
  PopupWithForm
} from "./components/PopupWithForm.js";
import {
  PopupWithImage
} from "./components/PopupWithImage.js";
import {
  PopupWithDelete
} from "./components/PopupWithDelete.js";
import {
  Section
} from "./components/Section.js";
import {
  UserInfo
} from "./components/UserInfo.js";
import {
  Api
} from "./components/Api.js";
import "./pages/index.css";
const configs = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
// Сделаем селекторы для основного окна и для контейнера с карточками
const container = document.querySelector(".content");

const popupImageSelector = ".popup__fullimage";
const popupDeleteSelector = ".popup__delete";
// Зададим переменные для попапа профиля
const buttonOpenProfilePopup = document.querySelector(".profile__edit-button");

// Зададим переменные для нового попапа добавления карточки
const buttonOpenImagePopup = document.querySelector(".profile__add-button");

// Зададим переменные для нового попапа редактируем аватар
const buttonOpenAvatarEditPopup = document.querySelector(".profile__avatar-edit-button");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const userNameSelector = ".profile__info-name";
const userJobSelector = ".profile__info-title";
const userAvatarSelector = ".profile__avatar";

//Инстанцирование данного попапа следует вынести в global 
// scope, чтобы переменная не создавалась каждый раз при вызове данной функции
const imagePopup = new PopupWithImage(popupImageSelector);

const userInfo = new UserInfo({
  userNameSelector,
  userJobSelector,
  userAvatarSelector,
});
let ownerId = null;

//Создадим объект для работы с апи
const yandex_api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-18",
  headers: {
    authorization: "a3f1f5fe-630d-4fb3-8d0f-9700ef1ed1ff",
    "Content-Type": "application/json",
  },
});

//Выведем на страницу имя и профессию с сервера
yandex_api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo(data);
    ownerId = data._id;
  })
  .catch((error) => console.log(error));

// Процесс создания одной карточки (как в случае, когда мы проходим циклом
//   по начальным карточкам, так и в случае создания новой карточки) можно
//   вынести в отдельную функцию (создать можно внутри коллбека then после
//     ответа сервера, если необходим доступ к полученному ответу оттуда)
//     и использовать в двух местах - в цикле и в handleFormSubmit попапа
const createNewCard = (data) => {
  const card = new Card(data, "#element-template", ownerId, {
    handleCardClick: (element) => {
      //console.log(element)
      
      imagePopup.open(element);
    },
    handleDeleteCardClick: () => {
      //console.log(element)
      delitingCard = card;
      deleteCardPopup.open(data);
    },
    putLike: (data) => {
      yandex_api
        .putLike(data)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
         // console.log(res);
          card.setLikeCount(res.likes.length);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteLike: (data) => {
      yandex_api
        .deleteLike(data)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
        //  console.log(res);
          card.setLikeCount(res.likes.length);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return card;
};

const cardList = new Section({
    renderer: (element) => {
      const card = new createNewCard(element);

      const cardElement = card.generateCard();

      cardList.addItem(cardElement);
    },
  },
  ".elements"
);

//Вызовем метод этого объекта который загружает имеющиеся карты в список

yandex_api
  .getInitialCards()
  .then((data) => {
    // Заполним первоначальные карточки
    // будем грузить их с сервера
    //console.log(data);

    // Отрисуем список
    cardList.renderCards(data);
  })
  .catch((err) => {
    console.log(err);
  });

//Попап Добавим карточку
const addCardPopup = new PopupWithForm(".popup__add-card", {
  submitForm: (element) => {
    addCardPopup.loading_on();
    yandex_api
      .addCard(element)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
      //  console.log(res);
        const card = createNewCard(res);
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
        addCardPopup.close();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        addCardPopup.loading_off();
        
      })
  },
});
//Попап редактируем аватару
const updateAvatarPopup = new PopupWithForm(".popup__update-avatar", {
  submitForm: (element) => {

    updateAvatarPopup.loading_on();
    setTimeout(3000)
    //console.log(element)
    yandex_api.setUserAvatar(element)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        userInfo.setUserAvatar(res);
        updateAvatarPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        updateAvatarPopup.loading_off();

      })
  }
})


//Попап с формой удаления карточки
let delitingCard = null;
const deleteCardPopup = new PopupWithDelete(".popup__delete", {
  submitForm: (element) => {
    //К сожалению fetch не пробрасывает ошибку в случае 403
    //Пол дня убил пытаясь понять почему он не пишет в консоль при попытку удалить чужую картинку
    yandex_api
      .deleteCard(element)
      .then(() => delitingCard.deleteCard())
      .then(() => deleteCardPopup.close())
      .catch((er) => console.log(er));
  },
});

//Попап с формой редактирования инфы о пользователе
const popupProfile = new PopupWithForm(".popup__profile", {
  submitForm: (element) => {
    // console.log(element)
    popupProfile.loading_on();
    yandex_api
      .setUserInfo(element)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        userInfo.setUserInfo(res);
        popupProfile.close();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        popupProfile.loading_off();
        
      })
  },
});

// Добавим слушатели на кнопки
buttonOpenProfilePopup.addEventListener("click", () => {
  //необходимо устанавливать текущие значения имени и профессии пользователя
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  popupProfile.open();
 

});
buttonOpenAvatarEditPopup.addEventListener("click", () => {
  updateAvatarPopup.open();
});
buttonOpenImagePopup.addEventListener("click", () => addCardPopup.open());
// создадим валидаторы для всех форм
const forms = Array.from(document.querySelectorAll(configs.formSelector));
// Инстанцирование экземпляров класса FormValidator и активация валидации 
// для них должны осуществляться для каждой формы отдельно в global scope, 
// чтобы доступ к экземплярам класса был во всем файле, а не только в области 
// видимости данной функции.
// То есть для каждой формы должен существовать свой именованный экземпляр.

// Вот тут совсем непонятно было ) Зачем ? Как проверить что эта цель достигнута и ошибка исправлена ?
// Жаль что нет связи, пришлось спрашивать преподов
// Если я вызываю функцию которая определена на глобальном уровне - у меня же создаются глобальные 
// экземпляры ? Правда я все равно не очень понимаю как я смогу к ним обращаться 
//на глобальном уровне и отличать один от другого
const setFormValidator = (form) => {
  const formValidator = new FormValidator(configs, form);
  formValidator.enableValidation();
}

forms.forEach((form) => {
//  const validator = new FormValidator();
  setFormValidator(form)
 // validator.enableValidation();
});
