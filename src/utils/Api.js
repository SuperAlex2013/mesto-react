class Api {
  constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
      this._getResponseData = this._getResponseData.bind(this); // Bind the method to the class instance
  }
  
  _getOptions(method, body = null) {
      const options = {
          method: method,
          headers: this._headers,
      };
      
      if (body) {
          options.body = JSON.stringify(body);
      }
      
      return options;
  }
  
  _getUrl(path) {
      return `${this._baseUrl}${path}`;
  }

  _request(url, options) {
      return fetch(url, options).then(this._getResponseData);
  };

  _getResponseData(res) {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
  }

  getInitialCards() {
      return this._request(this._getUrl('/cards'), this._getOptions('GET'));
  }

  getDataUser() {
      return this._request(this._getUrl('/users/me'), this._getOptions('GET'));
  }

  saveDataInfo(profileInfo) {
      return this._request(this._getUrl('/users/me'), this._getOptions('PATCH', {
          name: profileInfo.userName,
          about: profileInfo.about
      }));
  }

  saveCardInfo(cardInfo) {
      return this._request(this._getUrl('/cards'), this._getOptions('POST', {
          name: cardInfo.name,
          link: cardInfo.link
      }));
  }

  deleteCard(cardId) {
      return this._request(this._getUrl(`/cards/${cardId}`), this._getOptions('DELETE'));
  }

  changeLikeCardStatus(cardId, isLiked) {
      const method = isLiked ? "PUT" : "DELETE";
      return this._request(this._getUrl(`/cards/${cardId}/likes`), this._getOptions(method));
  }

  saveDataProfile(profileAvatar) {
      return this._request(this._getUrl('/users/me/avatar'), this._getOptions('PATCH', {
          avatar: profileAvatar.avatar
      }));
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-69",
  headers: {
      authorization: "03cd57ef-0b0a-4590-a0df-4c34d12cd341",
      "Content-Type": "application/json; character=UTF-8",
  },
});

export default api;
