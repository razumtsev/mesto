import Popup from './Popup.js';
import { bigPicImage, bigPicCaption } from '../utils/constants.js';
export default class PopupWithImage extends Popup {
  constructor({image, caption}, popupSelector) {
    super(popupSelector);
    this._image = image;
    this._caption = caption;
  }

  open() {
    bigPicImage.src = this._image;
    bigPicImage.alt = this._caption;
    bigPicCaption.textContent = this._caption;
    super.open();
  }

  close() {
    super.close();
    bigPicImage.src = '#';
    bigPicImage.alt = '';
    bigPicCaption.textContent = '';
  }
}
