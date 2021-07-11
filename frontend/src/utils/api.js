const handleResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
};

class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: localStorage.getItem('token'),
        method: 'GET',
      },
    })
    .then(handleResponse);
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: localStorage.getItem('token'),
      },
    })
    .then(handleResponse);
  }

  sendUser({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
    .then(handleResponse);
  }

  addCard(newCard) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: { authorization: localStorage.getItem('token'), 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: newCard.title,
        link: newCard.link,
      }),
    })
    .then(handleResponse);
  }

  removeCard(idCard) {
    return fetch(`${this._baseUrl}/cards/${idCard}`, {
      method: 'DELETE',
      headers: {
        authorization: localStorage.getItem('token'),
      },
    })
    .then(handleResponse);
  }

  changeLikeCardStatus(idCard, isLiked) {
    return fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
      method: !isLiked ? 'PUT' : 'DELETE',
      headers: {
        authorization: localStorage.getItem('token'),
      },
    })
    .then(handleResponse);
  }

  updateAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    })
    .then(handleResponse);
  }
}

const api = new Api({
  baseUrl: 'https://api.kst.mesto.nomoredomains.club'
});

export default api;
