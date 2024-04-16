import { deleteCard, getLikeCard, deleteLikeCard } from "./api.js";

function createCard(item, userId, removeCard, getOrRemovelike, openPopupTypeImage) {

    // Находим шаблон карточки в HTML
  const cardTemplate = document.querySelector("#card-template").content;

    // Клонируем содержимое шаблона карточки
  const cardContent = cardTemplate.cloneNode(true);

    // Заполняем данные карточки из объекта item
  cardContent.querySelector(".card__image").src = item.link;
  cardContent.querySelector(".card__image").alt = item.name;
  cardContent.querySelector(".card__title").textContent = item.name;
  cardContent.querySelector(".card__like-counter").textContent = item.likes.length;

    // Управление кнопкой удаления в зависимости от владельца карточки
  const deleteButton = cardContent.querySelector(".card__delete-button");
  if (item.owner._id !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", function (evt) {
      removeCard(evt, item._id);
    });
  }

    // Управление кнопкой лайка в зависимости от наличия лайка пользователя
  const likeButton = cardContent.querySelector(".card__like-button");
  const likeCounter = cardContent.querySelector(".card__like-counter");
  if (item.likes.some((item) => item._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeButton.addEventListener("click", function (evt) {
    getOrRemovelike(evt, item._id, likeCounter);
  });

    // Обработчик открытия попапа с изображением при клике на изображение карточки
  const cardImage = cardContent.querySelector(".card__image");
  cardImage.addEventListener("click", openPopupTypeImage);
  return cardContent;
}


// Функция удаления карточки
function removeCard(event, cardId) {
  deleteCard(cardId)
    .then(() => event.target.closest(".card").remove())
    .catch((err) => console.log(err));
}

// Функция добавления или удаления лайка
function getOrRemovelike(event, cardId, likeCounter) {

  // Определяем метод добавления или удаления лайка в зависимости от наличия активного класса

  const likeMethod = event.target.classList.contains("card__like-button_is-active") ? deleteLikeCard : getLikeCard;

  // Вызываем соответствующий метод и обновляем отображение количества лайков
  likeMethod(cardId)
    .then((res) => {
      event.target.classList.toggle("card__like-button_is-active");
      likeCounter.textContent = res.likes.length;
    })
    .catch((err) => console.log(err));
}

export { createCard, removeCard, getOrRemovelike };