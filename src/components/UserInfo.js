// UserInfo отвечает за управление отображением информации о пользователе на странице.
export class UserInfo {
  // Принимает в конструктор объект с
  // селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
  constructor({ userNameSelector, userJobSelector, userAvatarSelector }) {
    this._userNameSelector = userNameSelector;
    this._userJobSelector = userJobSelector;
    this._userAvatarSelector = userAvatarSelector;
    this._name = document.querySelector(this._userNameSelector);
    this._job = document.querySelector(this._userJobSelector);
    this._avatar = document.querySelector(this._userAvatarSelector);
  }
  // Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
  // Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      job: this._job.textContent,
    };

    return userData;
  }

  setUserAvatar(info) {
    this._avatar.src = info.avatar;
  }
  // Содержит публичный метод setUserInfo, который принимает новые данные пользователя
  // и добавляет их на страницу.
  setUserInfo(info) {
    console.log(info);
    this._name.textContent = info.name;
    this._job.textContent = info.about;
    this.setUserAvatar(info)
  }
}
