export default class Card {
  constructor(data, configCard, cardTemplate, handleImageClick) {
    this._data = data;
    this._image = data.link;
    this._caption = data.name;
    this._cardSelector = configCard.cardSelector;
    this._imageSelector = configCard.imageSelector;
    this._captionSelector = configCard.captionSelector;
    this._likeSelector = configCard.likeSelector;
    this._removeSelector = configCard.removeSelector;
    this._activeLikeClass = configCard.activeLikeClass;
    this._cardTemplate = cardTemplate;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    return document
    .querySelector(this._cardTemplate)
    .content
    .querySelector(this._cardSelector)
    .cloneNode(true);
  }

  _handleLikeClick() {
    this._cardLike.classList.toggle(this._activeLikeClass);
  }

  _handleRemoveClick() {
    this._card.remove();
  }

  _setEventListeners() {
    this._cardLike.addEventListener('click', () => this._handleLikeClick());
    this._cardRemove.addEventListener('click', () => this._handleRemoveClick());
    this._cardImage.addEventListener('click', () => this._handleImageClick(this._data));
  }

  createCard() {
    this._card = this._getTemplate();
    this._cardLike = this._card.querySelector(this._likeSelector);
    this._cardRemove = this._card.querySelector(this._removeSelector);
    this._cardImage = this._card.querySelector(this._imageSelector);
    this._setEventListeners();

    const image = this._card.querySelector(this._imageSelector);
    const caption = this._card.querySelector(this._captionSelector);

    image.src = this._image;
    image.alt = this._caption;
    caption.textContent = this._caption;

    return this._card;
  }
}
