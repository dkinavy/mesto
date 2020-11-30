// класс Popup, который отвечает за открытие и закрытие попапа.
export class Popup {
    
    // Принимает в конструктор единственный параметр — селектор попапа
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popupElement = document.querySelector(this._popupSelector);
        //console.log (this._popupElement)

    }
    
    
    // Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
    open() {
        this.setEventListeners();
        this._popupElement.classList.add('popup_opened');
      }
    
    close() {
        
        this._popupElement.classList.remove('popup_opened');
        this.removeEventListeners();
      }
    //   Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
    _handleEscClose(evt){
        if (evt.key === 'Escape') {
            
            this.close();
          }        
    }
    
    //   Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа
    setEventListeners(){
        document.addEventListener('keydown', this._handleEscClose.bind(this));

        this._popupElement.addEventListener('click', (evt)=>{
            if (evt.target.classList.contains('popup__close')) {
                this.close();           
            }
        });
        
    }
    removeEventListeners(){
        this._popupElement.removeEventListener('click', (evt)=>{
            if (evt.target.classList.contains('popup__close')) {
                this.close();
            }
        });
    }

}