export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupIsOpenClass = 'popup_is-open';
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') this.close();
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', evt => {
      const targetClassList = evt.target.classList;
      if(targetClassList.contains('popup') || targetClassList.contains('button_type_close')) this.close();
    });
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add(this._popupIsOpenClass);
  }

  close() {
    this._popup.classList.remove(this._popupIsOpenClass);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
