import { cardTemplate } from './index.js';

function createCard(cardData, deleteCard, toggleLike, handleImageClick) {
  const cardElement = cardTemplate.cloneNode(true);

  const imageElement = cardElement.querySelector('.card__image');
  const titleElement = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  
  
  imageElement.src = cardData.link;
  titleElement.textContent = cardData.name;
  imageElement.alt = cardData.alt;

  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', toggleLike);
  imageElement.addEventListener('click', handleImageClick);
  
  return cardElement;
}

function handleImageClick(evt) {
  addImageToPopup(evt);
  openPopupTypeImage();
} 

function deleteCard(evt) {
  const card = evt.target.closest('.card');
  card.remove();
}

function toggleLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, toggleLike, handleImageClick };