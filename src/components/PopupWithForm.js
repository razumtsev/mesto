import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll('.form__input');
    this._form = this._popup.querySelector('.form');
    this._submitButton = this._popup.querySelector('.form__submit-button');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._form.addEventListener('submit', () => this._handleFormSubmit(this._getInputValues()));
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoadnig(message) {
    this._submitButton.textContent = message;
  }
}
