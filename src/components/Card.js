export default class Card {
  constructor({ data, configCard, cardTemplate, handleImageClick, handleRemoveButtonClick, userID }) {
    this._data = data;
    this._userID = userID;
    this._image = data.link;
    this._caption = data.name;
    this._cardSelector = configCard.cardSelector;
    this._imageSelector = configCard.imageSelector;
    this._captionSelector = configCard.captionSelector;
    this._likeSelector = configCard.likeSelector;
    this._likeCountSelector = configCard.likeCountSelector;
    this._removeSelector = configCard.removeSelector;
    this._hiddenButtonClass = configCard.hiddenButtonClass;
    this._activeLikeClass = configCard.activeLikeClass;
    this._cardTemplate = cardTemplate;
    this._handleImageClick = handleImageClick;
    this._handleRemoveButtonClick = handleRemoveButtonClick;
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

  _setEventListeners() {
    this._cardLike.addEventListener('click', () => this._handleLikeClick());
    this._cardRemove.addEventListener('click', () => this._handleRemoveButtonClick(this));
    this._cardImage.addEventListener('click', () => this._handleImageClick(this._data));
  }

  _hideRemoveButton() {
    if(this._data.owner._id !== this._userID) {
      this._card.querySelector(this._removeSelector).classList.add(this._hiddenButtonClass);
    }
  }

  removeCard() {
    this._card.remove();
  }

  createCard() {
    this._card = this._getTemplate();
    this._cardLike = this._card.querySelector(this._likeSelector);
    this._cardRemove = this._card.querySelector(this._removeSelector);
    this._cardImage = this._card.querySelector(this._imageSelector);
    this._likeCount = this._card.querySelector(this._likeCountSelector);
    this._setEventListeners();
    this._hideRemoveButton();
    console.log(this);

    const image = this._card.querySelector(this._imageSelector);
    const caption = this._card.querySelector(this._captionSelector);

    image.src = this._image;
    image.alt = this._caption;
    caption.textContent = this._caption;

    this._likeCount.textContent = this._data.likes.length;

    return this._card;
  }
}
