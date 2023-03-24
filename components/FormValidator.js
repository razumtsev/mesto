export default class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputList = this._form.querySelectorAll(this._inputSelector);
  }

  _hasInvalidInput = inputList => {
    return Array.from(inputList).some(inputElement => !inputElement.validity.valid);
  }

  _disableSubmitButton = () => {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.setAttribute('disabled', true);
  }

  _enableSubmitButton = () => {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.removeAttribute('disabled');
  }

  _toggleButtonState = inputList => {
    if (this._hasInvalidInput(inputList)) this._disableSubmitButton();
    else this._enableSubmitButton();
  }

  _showInputError = inputElement => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError = inputElement => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  _checkInputValidity = inputElement => {
    if (!inputElement.validity.valid) this._showInputError(inputElement);
    else this._hideInputError(inputElement);
  }

  _setEventListeners = () => {
    this._toggleButtonState(this._inputList);

    this._form.addEventListener('reset', () => this._disableSubmitButton());

    this._inputList.forEach(inputElement => inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState(this._inputList);
    }))
  }

  resetFormErrors = () => {
    this._inputList.forEach(inputElement => this._hideInputError(inputElement));
  }

  enableValidation = () => {
    this._form.addEventListener('submit', evt => evt.preventDefault());
    this._setEventListeners();
  }
}
