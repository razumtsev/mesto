export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupIsOpenClass = 'popup_is-open';
  }

  _handleEscClose() {
    document.addEventListener('keydown', evt => {
      if (evt.key === 'Escape') this.close();
    });
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', evt => {
      const targetClassList = evt.target.classList;
      if(targetClassList.contains('popup') || targetClassList.contains('button_type_close')) this.close();
    });
    this._handleEscClose();
  }

  open() {
    this._popup.classList.add(this._popupIsOpenClass);
  }

  close() {
    this._popup.classList.remove(this._popupIsOpenClass);
  }
}
