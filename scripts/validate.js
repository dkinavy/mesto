// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible' //не понятно для чего этот параметр в задании
  }); 
// Для задания используем стандартные браузерные тексты
  //   const errorMessages = {
    
//     nameError: 'в поле «Имя» должно быть от 2 до 40 символов',
//     jobError: 'в поле «О себе» должно быть от 2 до 200 символов',
//     placeError:'в поле «Название» должно быть от 2 до 30 символов',
//     linkError: 'Тут должна быть ссылка'
//     };

  function enableValidation({formSelector, inputSelector, submitButtonSelector,inactiveButtonClass,inputErrorClass}){
    //выберем все формы в массив
    const formElements = Array.from(document.querySelectorAll(formSelector));
    //и для каждой формы повесим слушатель на событие сабмит, и отменим отправку по умолчанию
    formElements.forEach(form => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
     // кнопка на форме
    const buttonElement = form.querySelector(submitButtonSelector);
    // Установка слушателей на кнопки и поля формы    
        setEventListeners(form, inputSelector, buttonElement,inactiveButtonClass,inputErrorClass);
    // Проверим валидность и выключим кнопку сразу при загрузке
       toggleButtonState(buttonElement, form.checkValidity(),inactiveButtonClass);
    });
  }

  //установим слушатели, для проброски передадим в функцию все нужные параметры
  function setEventListeners(formElement, inputSelector, buttonElement,inactiveButtonClass,inputErrorClass) {
    const inputs = Array.from(formElement.querySelectorAll(inputSelector));
    inputs.forEach(input => {
       input.addEventListener('input', (evt) => {

           checkInputValidity(formElement, evt.target,inputErrorClass);
           // меняем состояние кнопки отправки в зависимости от валидности всех инпутов
           const isAllValid = formElement.checkValidity();
           toggleButtonState(buttonElement, isAllValid,inactiveButtonClass);
       });

    });
    }

    // Меняем состояние кнопки
    function toggleButtonState(buttonElem, isActive,inactiveButtonClass) {
        if (isActive) {
            buttonElem.disabled = false;
            buttonElem.classList.remove(inactiveButtonClass);
        } else {
            buttonElem.disabled = true;
            buttonElem.classList.add(inactiveButtonClass);
        }
    }

    // Проверяем инпут на валидность, не включаем кастомные тексты ошибок
    function checkInputValidity(formElement, input,inputErrorClass) {
       // input.setCustomValidity('');
    
        if (input.checkValidity()) {
            hideError(formElement, input,inputErrorClass);
        } else {
            showError(formElement, input,inputErrorClass);
           // console.log(input)
        }
    }
// Показать все что скрыто, скандалы ошибки неправильные ссылки
    function showError(formElement, input,inputErrorClass) {
        const errorElement = formElement.querySelector(`#${input.id}-error`);
       // console.log(errorElement)
        errorElement.textContent = input.validationMessage;
        input.classList.add(inputErrorClass);
    }
// Убираем текст ошибки если все хорошо   
    function hideError(formElement, input,inputErrorClass) {
        const errorElement = formElement.querySelector(`#${input.id}-error`);
        errorElement.textContent = '';
        input.classList.remove(inputErrorClass);
    }


    // function setCustomErrorMessages(input) {
    //     if (input.validity.patternMismatch) {
    //         input.setCustomValidity(errorMessages.patternMismatch);
    //     }
    // }

    