//класс Section, который отвечает за отрисовку элементов на странице
export class Section{
    // Первым параметром конструктора принимает объект с двумя свойствами: 
    // items и renderer. Свойство items — это массив данных, которые нужно добавить 
    // на страницу при инициализации класса. 
    // Свойство renderer — это функция, которая отвечает за создание и отрисовку данных 
    // на странице.
    // Второй параметр конструктора — селектор контейнера, в который нужно добавлять 
    // созданные элементы
    constructor({items,renderer}, containerSelector){
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    
    //Публичный метод, который отвечает за отрисовку всех элементов. 
    //Отрисовка каждого отдельного элемента должна осуществляться функцией renderer
    renderCards(){
        this._items.forEach(item => {
            console.log(item)
            this._renderer(item)
        })
    }
    // Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
    addItem(domElement){
        this._container.prepend(domElement);
    }
}