// глобальные переменные глобального масштаба
const page = document.querySelector('.page');
const profile = page.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
// глобальные переменные для модального окна редактирования профиля
const buttonEditProfile = profile.querySelector('.button_type_edit-profile');
const popupEditProfile = page.querySelector('.popup_type_edit-profile');
const formEditProfile = page.querySelector('.form_type_edit-profile');
const inputName = formEditProfile.querySelector('.form__input_type_name');
const inputDescription = formEditProfile.querySelector('.form__input_type_description');
// глобальные переменные для модального окна добавления карточки
const buttonAddCard = profile.querySelector('.button_type_add-card');
const popupAddCard = page.querySelector('.popup_type_add-card');
const formAddCard = page.querySelector('.form_type_add-card');
const inputCardName = formAddCard.querySelector('.form__input_type_card-name');
const inputCardLink = formAddCard.querySelector('.form__input_type_card-link');
// глобальные переменные для модального окна увеличенной картинки
const popupBigPic = page.querySelector('.popup_type_big-pic');
const bigPicImage = popupBigPic.querySelector('.big-pic__image');
const bigPicCaption = popupBigPic.querySelector('.big-pic__caption');
// глобальные переменные для закрытия модальных окон
const buttonClosePopupList = page.querySelectorAll('.button_type_close');
// глобальные переменные темплейта карточки
const elementsGrid = page.querySelector('.elements__grid');
const cardSample = page.querySelector('#card-template').content.querySelector('.card');


// добавление карточки на страницу

const addCardPrepend = card => elementsGrid.prepend(card);
const addCardAppend = card => elementsGrid.append(card);

// закрытие модальных окон

const closePopup = popup => popup.classList.remove('popup_is-open');

// обработчик клика по кнопке закрытия

buttonClosePopupList.forEach(button => {
  button.addEventListener('click', () => closePopup(button.closest('.popup')));
});

// обработчик клика по оверлею

const handleOverlayClick = evt => {
  if (evt.target.classList.contains('popup')) closePopup(evt.target);
}

// открытие модальных окон

const openPopup = popup => {
  enableValidation(); //валидация форм в файле form-validation.js
  popup.addEventListener('click', handleOverlayClick);
  popup.classList.add('popup_is-open');
};

// обработчики кликов карточки

const handleLikeClick = evt => evt.target.classList.toggle('card__like_is-active');
const handleRemoveClick = evt => evt.target.closest('.card').remove();

const handleImageClick = evt => {
  const imageName = evt.target.alt;
  const imageSrc = evt.target.src;
  bigPicImage.src = imageSrc;
  bigPicImage.alt = imageName;
  bigPicCaption.textContent = imageName;
  openPopup(popupBigPic);
};

// создание карточки

const createCard = item => {
  const card = cardSample.cloneNode(true);
  const image = card.querySelector('.card__image');
  const name = card.querySelector('.card__caption');
  const like = card.querySelector('.card__like');
  const removeButton = card.querySelector('.card__remove');
  image.src = item.link;
  image.alt = item.name;
  name.textContent = item.name;
  image.addEventListener('click', handleImageClick);
  like.addEventListener('click', handleLikeClick);
  removeButton.addEventListener('click', handleRemoveClick);
  return card;
}

// обработчики событий

const handleEditProfileButton = () => {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupEditProfile);
}

const handleEditProfileSubmit = () => {
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupEditProfile);
}

const handleAddCardButton = () => {
  openPopup(popupAddCard)
}

const handleAddCardSubmit = () => {
  const cardEssence = {
    name: inputCardName.value,
    link: inputCardLink.value,
  };
  addCardPrepend(createCard(cardEssence));
  closePopup(popupAddCard);
  formAddCard.reset();
}

const handleEscEvent = evt => {
  if (evt.key === 'Escape') closePopup(page.querySelector('.popup_is-open'));
}

// слушатели событий

buttonEditProfile.addEventListener('click', handleEditProfileButton);
formEditProfile.addEventListener('submit', handleEditProfileSubmit);
buttonAddCard.addEventListener('click', handleAddCardButton);
formAddCard.addEventListener('submit', handleAddCardSubmit);
document.addEventListener('keydown', handleEscEvent);

// карточки для первоначальной загрузки страницы из массива initial-cards.js

initialCards.forEach(item => addCardAppend(createCard(item)));
