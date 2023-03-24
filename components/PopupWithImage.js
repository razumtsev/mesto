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
    bigPicCaption.textContent = this._caption;
    super.open();
  }
}
