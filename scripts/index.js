const buttonOpenPopup = document.querySelector(".profile__edit-button")
const buttonClosePopup = document.querySelector(".popup__close")
const popup = document.querySelector(".popup")

function popupOpen(){
    popup.classList.remove("popup_is-closed")
    popup.classList.add("popup_is-opened")
}
function popupClose(){
    popup.classList.remove("popup_is-opened")
    popup.classList.add("popup_is-closed")   
}

buttonOpenPopup.addEventListener("click", popupOpen);
buttonClosePopup.addEventListener("click", popupClose);

// Находим форму в DOM
let formElement = document.querySelector(".popup__form");// Воспользуйтесь методом querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let nameInput = document.querySelector(".popup__name");// Воспользуйтесь инструментом .querySelector()
    let jobInput = document.querySelector(".popup__job");// Воспользуйтесь инструментом .querySelector()
    
    // Получите значение полей из свойства value
    //console.log(nameInput.value)
    // Выберите элементы, куда должны быть вставлены значения полей
    let profileName = document.querySelector(".profile__info-name");
    let profileTitle = document.querySelector(".profile__info-title");
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileTitle.textContent = jobInput.value;
    popupClose();

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 