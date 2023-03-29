import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.big-pic__image');
    this._popupCaption = this._popup.querySelector('.big-pic__caption');
  }

  open({ name, link }) {
    super.open();
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupCaption.textContent = name;
  }

  close() {
    super.close();
    this._popupImage.src = '#';
    this._popupImage.alt = '';
    this._popupCaption.textContent = '';
  }
}
