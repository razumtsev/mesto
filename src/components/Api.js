export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if(res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => this._checkResponse(res))
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => this._checkResponse(res))
  }

  setProfileInfo(profileInfo) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(profileInfo)
    })
      .then(res => this._checkResponse(res))
  }

  setNewAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar)
    })
      .then(res => this._checkResponse(res))
  }

  setNewCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(card)
    })
      .then(res => this._checkResponse(res))
  }

  removeCard(card) {
    return fetch(`${this._baseUrl}/cards/${card._data._id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._checkResponse(res))
  }

  setCardLike(card) {
    return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => this._checkResponse(res))
  }

  removeCardLike(card) {
    return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._checkResponse(res))
  }
}
