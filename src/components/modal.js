  // Функция для открытия модального окна
function openModal(popupType) {
    popupType.classList.add("popup_is-opened");
    document.addEventListener("keydown", closeEscPopup);
    popupType.addEventListener("click", closePopupByOverlay);
  }
  
  // Функция для закрытия модального окна
  function closeModal(popupType) {
    popupType.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closeEscPopup);
    popupType.removeEventListener("click", closePopupByOverlay);
  }
  
  // Функция для закрытия модального окна при клике по оверлею
  function closePopupByOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      closeModal(evt.currentTarget);
    }
  }
  
  // Функция для закрытия модального окна при нажатии клавиши Esc
  function closeEscPopup(evt) {
    if (evt.key === "Escape") {
      const popup = document.querySelector(".popup_is-opened");
      closeModal(popup);
    }
  }
  
  export { openModal, closeModal };