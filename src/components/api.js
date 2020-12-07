export class Api {
    constructor(options) {
      // тело конструктора
      this.options = options;
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }
  
    getInitialCards() {
        return fetch(this._baseUrl+'/cards', {
          headers: this._headers
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            }     
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
          });
      } 
    
    
      getUserInfo(){
        return fetch(this._baseUrl+'/users/me', {
            headers: this._headers
        })
            .then(res => {
            if (res.ok) {
                return res.json();
            }     
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
    // другие методы работы с API
    setUserInfo(info){        
       // console.log(info)
        return fetch(this._baseUrl + '/users/me', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            name: info.name,
            about: info.job
        })
        }); 
    }
    addCard(data){
        return fetch(this._baseUrl + '/cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.place,
                link: data.link
            })
            }); 
    }
    deleteCard(data) {
      return fetch(this._baseUrl + '/cards/'+ data._id, {
        method: 'DELETE',
        headers: this._headers
      })
    }
    deleteLike(data) {
      return fetch(`${this._baseUrl}/cards/likes/${data._id}`, {
        method: 'DELETE',
        headers: this._headers,
      })
    }
  
    putLike(data) {
      return fetch(`${this._baseUrl}/cards/likes/${data._id}`, {
        method: 'PUT',
        headers: this._headers,
      })
    }

  }
  
