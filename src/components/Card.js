
const imagePopup = document.querySelector(".image-popup");
const imagePopupTitle = document.querySelector(".popup__image-title");



export class Card {
    constructor(data, cardSelector,ownerID,{handleCardClick,handleDeleteCardClick,putLike,deleteLike}) {
        console.log(data)

        this._data = data;
        this._text = data.name;
        this._image = data.link;
        this._owner = data.owner._id;
        this._likesCount = data.likes.length;
        this._likes = data.likes;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCardClick = handleDeleteCardClick;
        this._master = ownerID
        this._putLike = putLike;
        this._deleteLike = deleteLike;
    }

    _isOwnCard() {
        if (this._owner !== this._master) {
            this._element.querySelector('.element__trash').remove();
        }
      }

    deleteCard(){
        this._element.remove(); 
    }
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }


    _setEventListeners() {

       this._element.querySelector('.element__image').addEventListener('click', ()=> 
       this._handleCardClick(this._data));

        //Добавим листнер клика по корзине которая удалит картинку
        this._element.querySelector('.element__trash').addEventListener('click', ()=>
         {
            this._handleDeleteCardClick(this._data);
            //evt.target.closest('.element').remove();
        });
        
        
        
        // Добавим листнер клика по сердечку который меняет цвет
        this._element.querySelector('.element__icon').addEventListener('click', ()=>{
            if (this._likeButton.classList.contains('.element__icon_active')) {
                this._putLike(this._data);
                this._likeButton.classList.add('.element__icon_active');
              } else {
                this._deleteLike(this._data);
               
                this._likeButton.classList.remove('.element__icon_active');
              }

        })
          
        // document.addEventListener('keydown', closePopupByEscapePress);
        // this._element.querySelector('.element__image').addEventListener('click', closePopupByMouseClick);

    }





    _isLiked() {
        this._likes.forEach((likeOwner) => {
          if (likeOwner._id === this._master) {
            this._likeButton.classList.add('.element__icon_active');
 //           return true;
          }
 //         else return false;
        })
      }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._likeButton = this._element.querySelector('.element__icon');
        this._element.querySelector('.element__image').src = this._image;
        this._element.querySelector('.element__name').textContent = this._text;
        this._element.querySelector('.element__like-count').textContent = this._likesCount;
        this._isOwnCard();
        this._isLiked();
        return this._element;
    }
    //**Функции лайка, удаления картинки и превью необходимо реализовать в данном классе
    //Функция переключает вид лайка сердечка
    _toggleIcon(el) {
        el.target.classList.toggle('element__icon_active');
    }
    // Функция открывает попап с большой картинкой, принимает на вход объект
    _openPopupFullImage() {
        // Присваиваем попапу адрес исходного изображения

        imagePopup.src = this._image;
        // И подпись из карточки    
        imagePopupTitle.textContent = this._text;
        //Вызываем универсальную функцию открытия попапа    
        openPopup(popupFullimage);
    }
    // Удаление попапа также реализовано в этом классе

}
