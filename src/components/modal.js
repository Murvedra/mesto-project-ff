//События Поп апа

function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEsc);
}

function closePopUpByOverlay(evt) {
    if (evt.currentTarget === evt.target) {
        const popup = evt.currentTarget;
        closePopup(popup);
    }
}

function closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_is-opened');
        if (popupOpened) {
            closePopup(popupOpened);
        }
    }
}

export { openPopup, closePopup, closePopUpByOverlay };