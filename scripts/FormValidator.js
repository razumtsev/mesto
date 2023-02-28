class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }

  _hasInvalidInput(inputList) {
    return Array.from(inputList).some(input => !input.validity.valid);
  }

  _toggleButtonState(inputList, submitButton) {
    const {inactiveButtonClass} = this._config;
    if (this._hasInvalidInput(inputList)) {
      submitButton.classList.add(this._config.inactiveButtonClass);
      submitButton.setAttribute('disabled', true);
    } else {
      submitButton.classList.remove(this._config.inactiveButtonClass);
      submitButton.removeAttribute('disabled');
    }
  }

  _showInputError = (form, input) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.add(this._config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError = (form, input) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._config.errorClass);
  }

  _checkInputValidity(form, input) {
    if (!input.validity.valid) this._showInputError(form, input);
    else this._hideInputError(form, input);
  }

  _setEventListeners(form) {
    const inputList = form.querySelectorAll(this._config.inputSelector);
    const submitButton = form.querySelector(this._config.submitButtonSelector);
    this._toggleButtonState(inputList, submitButton);

    form.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState(inputList, submitButton);
      }, 0);
    });

    inputList.forEach(input => input.addEventListener('input', () => {
      this._checkInputValidity(form, input);
      this._toggleButtonState(inputList, submitButton);
    }))
  }

  enableValidation() {
    this._form.addEventListener('submit', evt => evt.preventDefault());
    this._setEventListeners(this._form);
  }
}

export { FormValidator }
