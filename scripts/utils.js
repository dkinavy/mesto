// Функция которая закрывает любой попап при нажатии ескейп
// const imagePopup = document.querySelector(".image-popup");
// const imagePopupTitle = document.querySelector(".popup__image-title");
export const popupFullimage = document.querySelector(".popup__fullimage")
export const imagePopup = document.querySelector(".image-popup");
export const imagePopupTitle = document.querySelector(".popup__image-title");
export function closePopupByEscapePress(evt){
    //  console.log(evt);
      const openedPopup = document.querySelector(".popup_opened")
      if (evt.key === 'Escape') {
      closePopup(openedPopup); 
      }
  }
  
  export function closePopupByMouseClick(evt){
      const openedPopup = document.querySelector(".popup_opened")
      if (evt.target.classList.contains('popup')) {
      closePopup(openedPopup); }
  }

// // Функция открывает попап с большой картинкой, принимает на вход объект
// export function openPopupFullImage(image){
//     // Присваиваем попапу адрес исходного изображения
//     console.log(image);
//     imagePopup.src = image.toElement.src;
//     // И подпись из карточки    
//     imagePopupTitle.textContent = image.target.offsetParent.innerText;
//     //Вызываем универсальную функцию открытия попапа    
//     openPopup(popupFullimage);
// }

//Открывем попап, устанавливаем нужные слушатели
export function openPopup(popup){
    popup.classList.add("popup_opened");
    // передадим ссылку на функции в листнер
    document.addEventListener('keydown',closePopupByEscapePress);
    popup.addEventListener('click',closePopupByMouseClick);
//    addMouseClickPopup(popup)
}

// Закрываем попап. Удаляем все слушатели
export function closePopup(popup){
    popup.classList.remove("popup_opened");
    // удалим листнеры 
    document.removeEventListener('keydown',closePopupByEscapePress);
    popup.removeEventListener('click',closePopupByMouseClick);
//    removeMouseClickPopup(popup);     
}

// //Функция переключает вид лайка сердечка
// export function toggleIcon(evt) {
//     evt.target.classList.toggle('element__icon_active'); 
//     }