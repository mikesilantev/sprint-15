import { apiConfig } from "./utils.js";
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._cohortId = options.cohordId;
    this._token = options.token;
    this._categoryUser = options.categoryUser;
    this._categoryCards = options.categoryCards;
    this._categoryAbout = options.categoryAbout;
    this._categoryAvatar = options.categoryAvatar;
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
  getStartUserInfo() {
    return fetch(`${this._baseUrl}${this._cohortId}${this._categoryUser}`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResult);
  }

  // 2. Загрузка карточек с сервера
  getCards() {
    return fetch(`${this._baseUrl}${this._cohortId}${this._categoryCards}`, {
      headers: {
        authorization: this._token,
        "Content-type": this._contentType,
      },
    }).then(this._checkResult);
  }

  // 3. Редактирование профиля
  setUserInfo(data) {
    return fetch(`${this._baseUrl}${this._cohortId}${this._categoryUser}`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResult);
  }

  // 4. Добавление новой карточки
  sendCardData(data) {
    return fetch(`${this._baseUrl}${this._cohortId}${this._categoryCards}`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-type": this._contentType,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResult);
  }

  deleteCardData(cardID) {
    return fetch(
      `${this._baseUrl}${this._cohortId}${this._categoryCards}/${cardID}`,
      {
        method: "DELETE",
        headers: {
          authorization: this._token,
          "Content-type": this._contentType,
        },
      }
    ).then(this._checkResult);
  }

  changeLikesCardStatus(card, cardLikeState) {
    return fetch(
      `${this._baseUrl}${this._cohortId}${this._categoryCards}/likes/${card}`,
      {
        method: cardLikeState ? "PUT" : "DELETE",
        headers: {
          authorization: this._token,
        },
      }
    ).then(this._checkResult);
  }

  deleteLikes(cardID) {
    return fetch(
      `${this._baseUrl}${this._cohortId}${this._categoryCards}/likes/${cardID}`,
      {
        method: "DELETE",
        headers: {
          authorization: this._token,
        },
      }
    ).then(this._checkResult);
  }

  // 9. Обновление аватара пользователя
  setUserAvatar(data) {
    return fetch(
      `${this._baseUrl}${this._cohortId}${this._categoryUser}${this._categoryAvatar}`,
      {
        method: "PATCH",
        headers: {
          authorization: this._token,
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
