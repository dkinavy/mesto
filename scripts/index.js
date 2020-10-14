const buttonOpenPopup = document.querySelector(".profile__edit-button")
const buttonClosePopup = document.querySelector(".popup__close")
const popup = document.querySelector(".popup")
// Находим форму в DOM
let formElement = document.querySelector(".popup__form");// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM 
let profileName = document.querySelector(".profile__info-name");
let profileTitle = document.querySelector(".profile__info-title");
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_job");

function popupOpen(){
    popup.classList.remove("popup_is-closed")
    popup.classList.add("popup_is-opened")

    // Вставим значения с основной страницы в поля формы
    nameInput.value = profileName.textContent;
    jobInput.value = profileTitle.textContent;

}
function popupClose(){
    popup.classList.remove("popup_is-opened")
    popup.classList.add("popup_is-closed")   
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileTitle.textContent = jobInput.value;
    popupClose();

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 
buttonOpenPopup.addEventListener("click", popupOpen);
buttonClosePopup.addEventListener("click", popupClose);