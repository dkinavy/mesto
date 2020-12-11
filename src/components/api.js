export class Api {
  constructor(options) {
    // тело конструктора
    this.options = options;
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }


  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
} 

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers,
    }).then((res) => {
      _getResponseData(res)
    });
  }

  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this._headers,
    }).then((res) => {
      _getResponseData(res)
    });
  }
  // другие методы работы с API
  setUserInfo(info) {
    // console.log(info)
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: info.name,
        about: info.job,
      }),
    }).then((res) => {
      _getResponseData(res)
    });
    
  }
  setUserAvatar(avatar) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar.link
      }),
    }).then((res) => {
      _getResponseData(res)
    });
  }


  addCard(data) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.place,
        link: data.link,
      }),
    }).then((res) => {
      _getResponseData(res)
    });
  }
  deleteCard(data) {
    return fetch(this._baseUrl + "/cards/" + data._id, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      _getResponseData(res)
    });
  }
  deleteLike(data) {
    return fetch(`${this._baseUrl}/cards/likes/${data._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      _getResponseData(res)
    });
  }

  putLike(data) {
    return fetch(`${this._baseUrl}/cards/likes/${data._id}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      _getResponseData(res)
    });
  }
}
