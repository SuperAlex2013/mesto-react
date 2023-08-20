class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
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
        return this._request( this._baseUrl + '/cards', {
            method: 'GET',
            headers: this._headers,});
    }


    getDataUser() {
        return this._request( this._baseUrl + '/users/me', {
            method: 'GET',
            headers: this._headers,});
    }

    saveDataInfo(profileInfo) {
        return this._request( this._baseUrl + '/users/me', {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: profileInfo.name,
                about: profileInfo.about
            })
        })
    }

    saveCardInfo(cardInfo) {
        return this._request( this._baseUrl + '/cards', {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                name: cardInfo.name,
                link: cardInfo.link
            })
        })
    }

    deleteCard(cardId) {
        return this._request( this._baseUrl + `/cards/${cardId}`,  {
            headers: this._headers,
            method: 'DELETE',
        })
    }


    changeLikeCardStatus(cardId, isLiked) {
        const method = isLiked ? "PUT" : "DELETE";
        return this._request( this._baseUrl + `/cards/${cardId}/likes`, {
            headers: this._headers,
            method: method,
        })
    }


    saveDataProfile(profileAvatar) {
        return this._request( this._baseUrl + `/users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({ avatar: profileAvatar.avatar })
        })
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