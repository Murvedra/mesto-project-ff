import { cardTemplate } from './index.js';

//Работа с карточками: добавление, удаление, лайки

function createCard(cardData, deleteCard, getLike, addImageToPopup, openPopupTypeImage) {
  const cardElement = cardTemplate.cloneNode(true);

  const imageElement = cardElement.querySelector('.card__image');
  const titleElement = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  
  imageElement.src = cardData.link;
  titleElement.textContent = cardData.name;
  imageElement.alt = cardData.alt;

  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', getLike);
  imageElement.addEventListener('click', addImageToPopup); 
  imageElement.addEventListener('click', openPopupTypeImage);
  return cardElement;
}

function deleteCard(evt) {
  const card = evt.target.closest('.card');
  card.remove();
}

function getLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, getLike };