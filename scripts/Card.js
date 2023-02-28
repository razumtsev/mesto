import { openPopup } from "./index.js";

class Card {
  constructor(data, cardTemplate) {
    this._image = data.link;
    this._caption = data.name;
    this._cardTemplate = cardTemplate;
  }

  _getTemplate() {
    const cardSample = document
    .querySelector(this._cardTemplate)
    .content.querySelector('.card')
    .cloneNode(true);
    return cardSample;
  }

  _handleLikeClick() {
    this._card.querySelector('.card__like').classList.toggle('card__like_is-active');
  }

  _handleRemoveClick() {
    this._card.remove();
  }

  _handleImageClick() {
    const popupBigPic = document.querySelector('.popup_type_big-pic');
    const bigPicImage = popupBigPic.querySelector('.big-pic__image');
    const bigPicCaption = popupBigPic.querySelector('.big-pic__caption');

    bigPicImage.src = this._image;
    bigPicImage.alt = this._caption;
    bigPicCaption.textContent = this._caption;

    openPopup(popupBigPic);
  }

  _setEventListeners() {
    this._card.querySelector('.card__like').addEventListener('click', () => this._handleLikeClick());
    this._card.querySelector('.card__remove').addEventListener('click', () => this._handleRemoveClick());
    this._card.querySelector('.card__image').addEventListener('click', () => this._handleImageClick());
  }

  createCard() {
    this._card = this._getTemplate();
    this._setEventListeners();

    const image = this._card.querySelector('.card__image');
    const caption = this._card.querySelector('.card__caption');

    image.src = this._image;
    image.alt = this._caption;
    caption.textContent = this._caption;

    return this._card;
  }
}

export { Card }
