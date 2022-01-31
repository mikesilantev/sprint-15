import { authConfig } from "./utils";

class Auth {
  constructor(options) {
    this._url = options.baseUrl;
  }
  
  _checkResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  register({email, password}) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        "password": password,
        "email": email,
      }),
    }).then(this._checkResult);
  }

  authorize({email, password}) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        "password": password,
        "email": email
      }),
    }).then(this._checkResult);
  }

  async checkUserToken(token) {
    const res = await fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    return this._checkResult(res);
  }
}

const auth = new Auth(authConfig);
export default auth;