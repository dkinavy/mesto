// UserInfo отвечает за управление отображением информации о пользователе на странице.
export class UserInfo {
    // Принимает в конструктор объект с 
    // селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
    constructor({userNameSelector,userJobSelector}){
        this._userNameSelector = userNameSelector;
        this._userJobSelector = userJobSelector;
        this._name = document.querySelector(this._userNameSelector);
        this._job = document.querySelector(this._userJobSelector);
    }
    // Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. 
    // Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    getUserInfo(){
        const userData = {
            name: this._name.textContent,
            job: this._job.textContent
        }
        
        return userData;
    }
    // Содержит публичный метод setUserInfo, который принимает новые данные пользователя 
    // и добавляет их на страницу.
    setUserInfo(info){
        this._name.textContent = info.name;
        this._job.textContent = info.job;
    }
}