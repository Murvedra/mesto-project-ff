// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


function createCard(cardData, deleteCallback) {
    const cardTemplate = document.getElementById('card-template');
    const cardElement = cardTemplate.content.firstElementChild.cloneNode(true);
    
    const imageElement = cardElement.querySelector('.card__image');
    imageElement.src = cardData.link;
    imageElement.alt = cardData.name;
    
    const titleElement = cardElement.querySelector('.card__title');
    titleElement.textContent = cardData.name;
    
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        deleteCallback(cardElement);
        cardElement.remove();
    });
    
    return cardElement;
}

const placesList = document.querySelector('.places__list');

const deleteCard = (card) => {
    const index = initialCards.findIndex(item => item === card);
    if (index !== -1) {
        initialCards.splice(index, 1);
    }
};

const cardElements = initialCards.map(card => createCard(card, deleteCard));

cardElements.forEach(cardElement => {
    placesList.appendChild(cardElement);
});