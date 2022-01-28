import { apiConfig } from "./utils.js";
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._contentType = options.contentType;
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  // 1. Загрузка информации о пользователе с сервера
  getStartUserInfo(token) {
    console.log('getStartUserInfo: ' + token);
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(this._checkResult);
  }

  // 2. Загрузка карточек с сервера
  getCards(token) {
    console.log('getCards: ' + token);
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-type": this._contentType,
        
      },
    }).then(this._checkResult);
  }

  // 3. Редактирование профиля
  setUserInfo(data, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-type": this._contentType,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResult);
  }

  // 4. Добавление новой карточки
  sendCardData(data, token) {
    console.log(data, token);
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-type": this._contentType,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResult);
  }

  deleteCardData(cardID, token) {
    return fetch(
      `${this._baseUrl}/cards/${cardID}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-type": this._contentType,
        },
      }
    ).then(this._checkResult);
  }

  changeLikesCardStatus(card, cardLikeState, token) {
    return fetch(
      `${this._baseUrl}/cards/${card}/likes`,
      {
        method: cardLikeState ? "PUT" : "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    ).then(this._checkResult);
  }

  deleteLikes(cardID, token) {
    return fetch(
      `${this._baseUrl}/cards/${cardID}/likes`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    ).then(this._checkResult);
  }

  // 9. Обновление аватара пользователя
  setUserAvatar(data, token) {
    return fetch(
      `${this._baseUrl}/users/me/avatar`,
      {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-type": this._contentType,
        },
        body: JSON.stringify({
          avatar: data,
        }),
      }
    ).then(this._checkResult);
  }
}

const api = new Api(apiConfig);

export default api;
