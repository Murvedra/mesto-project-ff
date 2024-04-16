//Токен: 722fcbf2-581e-45f6-9cae-4c0f2a5106ae
//Идентификатор группы: wff-cohort-11

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-11',
  headers: {
    authorization: '722fcbf2-581e-45f6-9cae-4c0f2a5106ae',
    'Content-Type': 'application/json',
  },
};

// Функция проверки ответа сервера
const handleResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};


// Функция получения карточек с сервера
const getInitialCards = async () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => handleResponse(res));
};

// Функция получения данных пользователя с сервера
const getUserInfo = async () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => handleResponse(res));
};


// Функция отправки измененных данных профиля пользователя на сервер - PATCH
const updateUserInformation = async (userName, userAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout,
    }),
  }).then((res) => handleResponse(res));
};


// Функция добавления карточки на сервер - POST
const updateNewCard = async (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  }).then((res) => handleResponse(res));
};


// Функция удаления карточки с сервера - DELETE
const deleteCard = async (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => handleResponse(res));
};


// Функция постановки лайка на сервере - PUT
const getLikeCard = async (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => handleResponse(res));
};


// Функция снятия лайка на сервере - DELETE
const deleteLikeCard = async (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => handleResponse(res));
};


// Функция смены аватара на сервере - PATCH
const updateNewAvatar = async (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then((res) => handleResponse(res));
};

export {getInitialCards, getUserInfo, updateUserInformation, updateNewCard, deleteCard, getLikeCard, deleteLikeCard, updateNewAvatar,};