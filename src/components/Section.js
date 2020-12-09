//класс Section, который отвечает за отрисовку элементов на странице
export class Section{
// Уберем передачу списка карточек в момент создания списка карточек. Иначе 
// потом непонятно как к нему обращаться и как пробрасывать это список
    constructor({renderer}, containerSelector){
       
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    
    //Публичный метод, который отвечает за отрисовку всех элементов. 
    //Отрисовка каждого отдельного элемента должна осуществляться функцией renderer
    renderCards(items){
            items.reverse().forEach(item => {
           // console.log(item)
            this._renderer(item)
        })
    }
    // Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
    addItem(domElement){
        this._container.prepend(domElement);
    }
}