const hasInvalidInput = inputList => {
  return Array.from(inputList).some(input => !input.validity.valid);
}

const toggleButtonState = (config, inputList, submitButton) => {
  const {inactiveButtonClass} = config;
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.setAttribute('disabled', true);
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.removeAttribute('disabled');
  }
}

const showInputError = (config, form, input) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(config.errorClass);
}

const hideInputError = (config, form, input) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
}

const checkInputValidity = (config, form, input) => {
  if (!input.validity.valid) showInputError(config, form, input);
  else hideInputError(config, form, input);
}

const setEventListeners = (config, form) => {
  const inputList = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);
  toggleButtonState(config, inputList, submitButton);

  // слушатель события 'reset' формы, с помощью метода setTimeout запускающий переключатель состояния кнопки сабмита
  form.addEventListener('reset', () => {
    setTimeout(() => {
      toggleButtonState(config, inputList, submitButton);
    }, 0);
  });

  inputList.forEach(input => input.addEventListener('input', () => {
    checkInputValidity(config, form, input);
    toggleButtonState(config, inputList, submitButton);
  }));

}

const enableValidation = config => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach(form => {
    form.addEventListener('submit', evt => evt.preventDefault());
    setEventListeners(config, form);
  })
}

const configValidation = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_is-inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_is-active',
}

enableValidation(configValidation);
