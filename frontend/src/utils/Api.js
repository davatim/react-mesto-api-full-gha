class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  getUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._getResponseData(res));
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._getResponseData(res));
  }

  setUserInfo(userInfo) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about,
      }),
    }).then((res) => this._getResponseData(res));
  }

  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._getResponseData(res));
  }

  changeLikeCardStatus(id, isLiked) {
    return isLiked
      ? fetch(`${this._baseUrl}/cards/${id}/likes`, {
          method: "PUT",
          credentials: "include",

          headers: this._headers,
        }).then((res) => this._getResponseData(res))
      : fetch(`${this._baseUrl}/cards/${id}/likes`, {
          method: "DELETE",
          credentials: "include",
          headers: this._headers,
        }).then((res) => this._getResponseData(res));
  }

  removeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      credentials: "include",

      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }
}

const api = new Api({
  // baseUrl: "https://api.davatim.nomoreparties.co",
  baseUrl: "http://localhost:3000",
  headers: {
    "content-type": "application/json",
  },
});

export default api;
