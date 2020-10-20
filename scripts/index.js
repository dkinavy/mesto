// Сделаем селекторы для основного окна и для контейнера с карточками
const container = document.querySelector('.content');
const elements = container.querySelector('.elements');

// Зададим переменные для попапа профиля
const buttonOpenProfilePopup = document.querySelector(".profile__edit-button")
const buttonCloseProfilePopup = document.querySelector(".popup__close-type-profile")
const popup__profile = document.querySelector(".popup__profile")
// Зададим переменные для нового попапа добавления карточки
const buttonOpenImagePopup = document.querySelector(".profile__add-button")
const buttonCloseImagePopup = document.querySelector(".popup__close-type-image")
const popup__image = document.querySelector(".popup__image")
const popup__fullimage = document.querySelector(".popup__fullimage")
// // Зададим переменные для попапа полноразмерного изображения
// const buttonOpenFullImagePopup = document.querySelector(".profile__add-button")
// const buttonCloseFullImagePopup = document.querySelector(".popup__close-type-image")



// Находим форму в DOM
let formElement = document.querySelector(".popup__form_type_profile");
let formImageElement = document.querySelector(".popup__form_type_image");// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM 
let profileName = document.querySelector(".profile__info-name");
let profileTitle = document.querySelector(".profile__info-title");
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_job");
// Поля карточки с картинкой
let imagePlace = document.querySelector(".popup__input_type_place");
let imageLink = document.querySelector(".popup__input_type_link");

// Шесть карточек из коробки
const initialCards = [
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

// Разово загрузим 6 карточек из InitialCards
initialCards.forEach(add_song);

// Создадим функцию которая добавляет карточку по темплейту
function add_song (item){
    const elementTemplate = document.querySelector('#element-template').content;
    const element = elementTemplate.cloneNode(true);
//    console.log(item.name);
    element.querySelector('.element__name').textContent = item.name;
    element.querySelector('.element__image').src = item.link;
    //Добавим листнер клика по сердечку который меняет цвет
    element.querySelector('.element__icon').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__icon_active'); 
    });
    //Добавим листнер клика по корзине которая удалит картинку
    element.querySelector('.element__trash').addEventListener('click', function (evt) {
        evt.target.closest('.element').remove(); 
        });
    //Добавим листнер клика по картинке, которая откроит наш попап
    element.querySelector('.element__image').addEventListener('click', function (evt) {
        popupFullImageOpen(evt)
        });

    elements.prepend(element);
    
}

//Функция открывает попап профиля и загружает в него данные с страницы
function popupProfileOpen(){
    popup__profile.classList.toggle("popup_opened")

    // Вставим значения с основной страницы в поля формы
    nameInput.value = profileName.textContent;
    jobInput.value = profileTitle.textContent;
}
// Функция открывает попап с большой картинкой, принимает на вход объект
function popupFullImageOpen(image){
    document.querySelector(".popup__fullimage").classList.toggle("popup_opened");
//    Присваиваем попапу адрес исходного изображения
    document.querySelector(".image-popup").src = image.toElement.src;
// И подпись из карточки    
    document.querySelector(".popup__image-title").textContent = image.target.offsetParent.innerText;
    console.log(image);
}

//Функция открывает попап картинки с местом, но ничего не загружает со страницы
function popupImageOpen(){
    popup__image.classList.toggle("popup_opened")
}

//Функция закрывает любой попап
function popupClose(popup){
    popup.classList.toggle("popup_opened") 
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileTitle.textContent = jobInput.value;
    popupClose(popup__profile);

}

function formSubmitImage (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    let newCard = {
        name: imagePlace.value,
        link: imageLink.value
    };
    // Вставим новую карточку
    add_song (newCard)
    popupClose(popup__image);

}




// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
formImageElement.addEventListener('submit', formSubmitImage); 
buttonOpenProfilePopup.addEventListener("click", popupProfileOpen);
buttonCloseProfilePopup.addEventListener("click", () => popupClose(popup__profile));
buttonOpenImagePopup.addEventListener("click", popupImageOpen);
buttonCloseImagePopup.addEventListener("click", () => popupClose(popup__image));
document.querySelector(".popup__close-type-fullimage").addEventListener("click", () => popupClose(popup__fullimage));