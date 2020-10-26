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
const popupFullimage = document.querySelector(".popup__fullimage")
// // Зададим переменные для попапа полноразмерного изображения
const imagePopup = document.querySelector(".image-popup");
const imagePopupTitle = document.querySelector(".popup__image-title");
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

// Разово загрузим 6 карточек из InitialCards
initialCards.forEach(addCard);

// Создадим функцию которая добавляет карточку по темплейту
function addCard (newCard){
    elements.prepend(createCard (newCard));    
}
//логику создания карточки нужно выделить в отдельную функция createCard. 
// Она будет создавать карточку, навешивать обработчики и возвращать ее через return. 
// А в addCard уже эта карточка будет добавляться в DOM
function createCard (item){
    const elementTemplate = document.querySelector('#element-template').content;
    const element = elementTemplate.cloneNode(true);
    const elementImage = element.querySelector('.element__image');
    element.querySelector('.element__name').textContent = item.name;
    elementImage.src = item.link;
    elementImage.alt = item.name;
    //Добавим листнер клика по сердечку который меняет цвет
    element.querySelector('.element__icon').addEventListener('click', function (evt) {
        toggleIcon(evt); 
        });
    //Добавим листнер клика по корзине которая удалит картинку
    element.querySelector('.element__trash').addEventListener('click', function (evt) {
        evt.target.closest('.element').remove(); 
        });
    //Добавим листнер клика по картинке, которая откроет наш попап
    elementImage.addEventListener('click', function (evt) {
        openPopupFullImage(evt)
        });

    return element;    
}

//Функция открывает попап профиля и загружает в него данные с страницы
function openPopupProfile(){    
    
    // Вставим значения с основной страницы в поля формы
    nameInput.value = profileName.textContent;
    jobInput.value = profileTitle.textContent;
    //Вызовем универсальную функцию открытия попапа
    openPopup (popupProfile);
}
// Функция открывает попап с большой картинкой, принимает на вход объект
function openPopupFullImage(image){
    // Присваиваем попапу адрес исходного изображения
    imagePopup.src = image.toElement.src;
    // И подпись из карточки    
    imagePopupTitle.textContent = image.target.offsetParent.innerText;
    //Вызываем универсальную функцию открытия попапа    
    openPopup(popupFullimage);
}

//Функция открывает попап картинки с местом, но ничего не загружает со страницы
function openPopupPlace(){
    openPopup(addCardPopup);
}

//Функция переключает вид лайка сердечка
function toggleIcon(evt) {
    evt.target.classList.toggle('element__icon_active'); 
    }
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
    addCard (newCard)
    closePopup(addCardPopup);

}
// Функция которая закрывает любой попап при нажатии ескейп
function closePopupByEscapePress(evt){
  //  console.log(evt);
    const openedPopup = document.querySelector(".popup_opened")
    if (evt.key === 'Escape') {
    closePopup(openedPopup); 
    }
}

function closePopupByMouseClick(evt){
    const openedPopup = document.querySelector(".popup_opened")
    if (evt.target.classList.contains('popup')) {
    closePopup(openedPopup); }
}

// Закрываем попап. Удаляем все слушатели
function closePopup(popup){
    popup.classList.remove("popup_opened");
    // удалим листнеры 
    document.removeEventListener('keydown',closePopupByEscapePress);
    popup.removeEventListener('click',closePopupByMouseClick);
//    removeMouseClickPopup(popup);     
}

//Открывем попап, устанавливаем нужные слушатели
function openPopup(popup){
    popup.classList.add("popup_opened");
    // передадим ссылку на функции в листнер
    document.addEventListener('keydown',closePopupByEscapePress);
    popup.addEventListener('click',closePopupByMouseClick);
//    addMouseClickPopup(popup)
}

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