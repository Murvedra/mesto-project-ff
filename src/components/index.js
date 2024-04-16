import "../pages/index.css";
import { openModal, closeModal } from "./modal.js";
import {
  getInitialCards,
  getUserInfo,
  updateUserInformation,
  updateNewCard,
  updateNewAvatar,
} from "./api.js";
import { createCard, removeCard, getOrRemovelike } from "./card.js";
import { enableValidation, clearValidation } from "./validation.js";

const placesList = document.querySelector(".places__list");
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditIcon = document.querySelector(".profile__edit-icon");
const profileImage = document.querySelector(".profile__image");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeAvatar = document.querySelector(".popup_type_avatar");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const editFormElement = popupTypeEdit.querySelector(".popup__form");
const avatarFormElement = popupTypeAvatar.querySelector(".popup__form");
const nameInput = editFormElement.querySelector(".popup__input_type_name");
const jobInput = editFormElement.querySelector(".popup__input_type_description");
const avatarInput = avatarFormElement.querySelector(".popup__input_type_avatar-url");
const newCardFormElement = popupTypeNewCard.querySelector(".popup__form");
const placeName = popupTypeNewCard.querySelector(".popup__input_type_card-name");
const placeUrl = popupTypeNewCard.querySelector(".popup__input_type_url");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupTypeEditForm = document.forms["edit-profile"];
const popypTypeAvatarForm = document.forms["avatar"];
const popupTypeNewPlaceForm = document.forms["new-place"];
const popups = document.querySelectorAll(".popup");
const settingsObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

  // Добавляем обработчик события клика на кнопку закрытия попапа
popups.forEach((popupType) => {
  popupType.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup__close")) {
      closeModal(popupType);
    }
  });
});

  // Обновляем текст кнопки в зависимости от состояния загрузки
function renderLoading(isLoading, popupType) {
  popupType.querySelector(".popup__button").textContent = isLoading
    ? "Сохранение..."
    : "Сохранить";
}

  // Открываем попап с изображением и заполняем его данными из карточки
function openPopupTypeImage(event) {
  openModal(popupTypeImage);
  popupImage.src = event.target.src;
  popupImage.alt = event.target.alt;
  popupCaption.textContent = event.target
    .closest(".card")
    .querySelector(".card__title").textContent;
}

  // Открываем попап редактирования профиля и заполняем поля данными профиля
profileEditButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(popupTypeEditForm, settingsObject);
  openModal(popupTypeEdit);
});

  // Открываем попап изменения аватара и сбрасываем форму
profileEditIcon.addEventListener("click", function () {
  popypTypeAvatarForm.reset();
  clearValidation(popypTypeAvatarForm, settingsObject);
  openModal(popupTypeAvatar);
});

  // Открываем попап добавления новой карточки и сбрасываем форму
profileAddButton.addEventListener("click", function () {
  popupTypeNewPlaceForm.reset();
  clearValidation(popupTypeNewPlaceForm, settingsObject);
  openModal(popupTypeNewCard);
});

  // Обработка отправки формы редактирования профиля
function handleFormSubmitEditProfile(evt) {
  evt.preventDefault();
  renderLoading(true, popupTypeEdit);
  updateUserInformation(nameInput.value, jobInput.value)
    .then((user) => {
      profileTitle.textContent = user.name;
      profileDescription.textContent = user.about;
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, popupTypeEdit));
  closeModal(popupTypeEdit);
}
editFormElement.addEventListener("submit", function (evt) {
  handleFormSubmitEditProfile(evt);
});

  // Обработка отправки формы изменения аватара
function handleFormSubmitAvatarForm(evt) {
  evt.preventDefault();
  renderLoading(true, popupTypeAvatar);
  updateNewAvatar(avatarInput.value)
    .then((user) => {
      profileImage.style.backgroundImage = `url(${user.avatar})`;
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, popupTypeAvatar));
  closeModal(popupTypeAvatar);
}

avatarFormElement.addEventListener("submit", function (evt) {
  handleFormSubmitAvatarForm(evt);
});

  // Обработка отправки формы добавления новой карточки
function addCard(evt) {
  evt.preventDefault();
  renderLoading(true, popupTypeNewCard);
  updateNewCard(placeName.value, placeUrl.value)
    .then((card) => {
      placesList.prepend(
        createCard(
          card,
          userId,
          removeCard,
          getOrRemovelike,
          openPopupTypeImage
        )
      );
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, popupTypeNewCard));
  placeName.value = "";
  placeUrl.value = "";
  closeModal(popupTypeNewCard);
}
newCardFormElement.addEventListener("submit", addCard);

let userId;

  // Получаем информацию о пользователе и список карточек, после чего обновляем профиль пользователя и добавляем карточки на страницу
Promise.all([getUserInfo(), getInitialCards()])
  .then(([user, cards]) => {
    userId = user._id;
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style.backgroundImage = `url(${user.avatar})`;
    cards.forEach((card) => {
      placesList.prepend(
        createCard(
          card,
          userId,
          removeCard,
          getOrRemovelike,
          openPopupTypeImage
        )
      );
    });
  })
  .catch((err) => console.log(err));

enableValidation(settingsObject);