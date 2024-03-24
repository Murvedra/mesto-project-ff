//Импорты из других файлов проекта

import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, toggleLike } from './card.js';
import { openPopup, closePopup, closePopUpByOverlay } from './modal.js';
import { validationSettings } from './validation.js';
import { enableValidation, clearValidation } from './validation.js';

const cardTemplate = document.querySelector('#card-template').content;

// Все используемые DOM узлы
const page = document.querySelector('.page');
const placesList = page.querySelector('.places__list');
const popups = page.querySelectorAll('.popup');
const popupTypeEdit = page.querySelector('.popup_type_edit');
const popupTypeNewCard = page.querySelector('.popup_type_new-card');
const popupTypeImage = page.querySelector('.popup_type_image');
const popupImage = page.querySelector('.popup__image');
const popupCaption = page.querySelector('.popup__caption');
const profileTitle = page.querySelector('.profile__title');
const popupInputTypeName = page.querySelector('.popup__input_type_name');
const profileDescription = page.querySelector('.profile__description');
const inputTypeDescription = page.querySelector('.popup__input_type_description');
const formAddCard = page.querySelector('.popup_type_new-card .popup__form');
const inputPlaceNameForm = formAddCard.querySelector('.popup__input_type_card-name');
const inputLinkImageForm = formAddCard.querySelector('.popup__input_type_url');
const formEditProfile = page.querySelector('.popup_type_edit .popup__form');
const profileEditButton = page.querySelector('.profile__edit-button');
const profileAddButton = page.querySelector('.profile__add-button');
const popupCloseButton = page.querySelectorAll('.popup__close');


initialCards.forEach((item) => {
  placesList.append(createCard(item, deleteCard, toggleLike, handleImageClick));
});

const openPopupProfileEdit = () => {
  popupInputTypeName.value = profileTitle.textContent;
  inputTypeDescription.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationSettings);
  openPopup(popupTypeEdit);
};

const openPopupAddCard = () => {
  formAddCard.reset();
  clearValidation(formAddCard, validationSettings);
  openPopup(popupTypeNewCard);
};

const handleImageClick = (evt) => {
  const card = evt.target.closest('.card');
  const cardTitle = card.querySelector('.card__title');

  if (evt.target.classList.contains('card__image')) {
    popupImage.src = evt.target.src;
    popupCaption.textContent = cardTitle.textContent;
    popupImage.alt = cardTitle.textContent;
    openPopup(popupTypeImage);
  }
};

const handleFormAddCardSubmit = (evt) => {
  evt.preventDefault();
  const cardObject = {};
  cardObject.name = inputPlaceNameForm.value;
  cardObject.alt = inputPlaceNameForm.value;
  cardObject.link = inputLinkImageForm.value;
  const newCard = createCard(cardObject, deleteCard, toggleLike, handleImageClick);
  placesList.prepend(newCard);
  closePopup(popupTypeNewCard);
  formAddCard.reset();
  clearValidation(formAddCard, validationSettings);
};

const closePopupByButton = (evt) => {
  closePopup(evt.target.closest('.popup'));
};

const handleFormEditProfileSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = popupInputTypeName.value;
  profileDescription.textContent = inputTypeDescription.value;
  closePopup(popupTypeEdit);
};

popupCloseButton.forEach((closeButton) => {
  closeButton.addEventListener('click', closePopupByButton);
});

popups.forEach((popup) => {
  popup.addEventListener('click', closePopUpByOverlay);
});

formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);
profileEditButton.addEventListener('click', openPopupProfileEdit);
profileAddButton.addEventListener('click', openPopupAddCard);
formAddCard.addEventListener('submit', handleFormAddCardSubmit);

enableValidation(validationSettings);

export { cardTemplate };