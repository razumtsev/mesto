// валидация полей ввода

const hasInvalidInput = inputList => {
  return Array.from(inputList).some((input) => !input.validity.valid);
}

const toggleButtonState = (inputList, submitButton) => {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add('form__submit-button_is-inactive');
    submitButton.setAttribute('disabled', true);
  } else {
    submitButton.classList.remove('form__submit-button_is-inactive');
    submitButton.removeAttribute('disabled');
  }
}

const showInputError = (form, input, message) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add('form__input_type_error');
  errorElement.textContent = message;
  errorElement.classList.add('form__input-error_is-active');
}

const hideInputError = (form, input) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove('form__input_type_error');
  errorElement.textContent = '';
  errorElement.classList.remove('form__input-error_is-active');
}

const checkInputValidity = (form, input) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
}

const setEventListeners = form => {
  const inputList = form.querySelectorAll('.form__input');
  const submitButton = form.querySelector('.form__submit-button');
  toggleButtonState(inputList, submitButton);
  inputList.forEach(input => input.addEventListener('input', () => {
    checkInputValidity(form, input);
    toggleButtonState(inputList, submitButton);
  }));
}

const enableValidation = () => {
  const formList = document.querySelectorAll('.form');
  formList.forEach(form => {
    form.addEventListener('submit', evt => evt.preventDefault());
    setEventListeners(form);
  })
}

enableValidation();
