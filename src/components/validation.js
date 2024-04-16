// Функция для отключения кнопки отправки формы
const disableSubmitButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
};

// Функция для включения кнопки отправки формы
const enableSubmitButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
};

// Функция для проверки наличия невалидных полей ввода
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Функция для переключения состояния кнопки отправки формы
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  hasInvalidInput(inputList);
  return hasInvalidInput(inputList)
    ? disableSubmitButton(buttonElement, inactiveButtonClass)
    : enableSubmitButton(buttonElement, inactiveButtonClass);
};

// Функция для показа сообщения об ошибке в поле ввода
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
};

// Функция для скрытия сообщения об ошибке в поле ввода
const hideInputError = (formElement, inputElement, inputErrorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
};

// Функция для включения валидации формы
const enableValidation = (settingsObject) => {

  // Получение списка форм на странице
  const formList = Array.from(document.querySelectorAll(settingsObject.formSelector));
  formList.forEach((formElement) => {

    // Объявление функции, которая устанавливает слушатели событий для каждой формы
    const setEventListeners = (formElement) => {

      // Получение списка полей ввода в текущей форме
      const inputList = Array.from(
        formElement.querySelectorAll(settingsObject.inputSelector)
      );

      // Получение элемента кнопки отправки формы в текущей форме
      const buttonElement = formElement.querySelector(
        settingsObject.submitButtonSelector
      );
      inputList.forEach((inputElement) => {

        // Установка слушателя события ввода для каждого поля ввода
        inputElement.addEventListener("input", () => {

          // Проверка валидности текущего поля ввода и установка соответствующего сообщения об ошибке или его отсутствие
          const isValid = (formElement, inputElement) => {
            inputElement.validity.patternMismatch ? inputElement.setCustomValidity(inputElement.dataset.errorMessage)
              : inputElement.setCustomValidity("");

              // Проверка, если текущее поле ввода невалидно
            if (!inputElement.validity.valid) {
              showInputError(formElement, inputElement, inputElement.validationMessage, settingsObject.inputErrorClass);
              toggleButtonState(inputList, buttonElement, settingsObject.inactiveButtonClass);

              // Если текущее поле ввода валидно
            } else {
              hideInputError(formElement, inputElement, settingsObject.inputErrorClass);

              // Изменение состояния кнопки отправки формы на активное
              toggleButtonState(inputList, buttonElement, settingsObject.inactiveButtonClass);
            }
          };
          isValid(formElement, inputElement);
        });
      });
    };
    setEventListeners(formElement);
  });
};


// Функция для очистки валидации формы
const clearValidation = (form, settingsObject) => {
  const inputList = Array.from(form.querySelectorAll(settingsObject.inputSelector));
  const buttonElement = form.querySelector(settingsObject.submitButtonSelector);
  inputList.forEach((formInput) => {
    hideInputError(form, formInput, settingsObject.inputErrorClass);
    formInput.setCustomValidity("");
  });
  toggleButtonState(inputList, buttonElement, settingsObject.inactiveButtonClass);
};

export { enableValidation, clearValidation };