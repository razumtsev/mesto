import { Card } from './Card.js';
import { initialCards } from './initial-cards.js';
import { FormValidator } from './FormValidator.js';

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
const inputCardLink = formAddCard.querySelector('.form__input_type_card-link')
// глобальные переменные для модального окна увеличенного изображения
const popupBigPic = page.querySelector('.popup_type_big-pic');
const bigPicImage = popupBigPic.querySelector('.big-pic__image');
const bigPicCaption = popupBigPic.querySelector('.big-pic__caption');
// глобальная переменная - место для монтажа карточек
const elementsGrid = page.querySelector('.elements__grid');
// глобальная переменная - список форм
const formsList = page.querySelectorAll('.form');
// глобальная переменная - форма редактирования профиля
const formEditProifle = page.querySelector('.form_type_edit-profile');
// глобальная переменная - список попапов
const popupList = page.querySelectorAll('.popup');
// конфиг для класса Card
const configCard = {
  cardSelector: '.card',
  imageSelector: '.card__image',
  captionSelector: '.card__caption',
  likeSelector: '.card__like',
  removeSelector: '.card__remove',
  activeLikeClass: 'card__like_is-active',
}
// конфиг для класса FormValidator
const configValidation = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_is-inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_is-active',
}

// -= Добавление карточки на страницу =-

const addCardPrepend = card => elementsGrid.prepend(card);
const addCardAppend = card => elementsGrid.append(card);

// создание новой карточки

const makeNewCard = (dataObject, configCard, cardTemplate, handleImageClick) => {
  const cardElement = new Card(dataObject, configCard, cardTemplate, handleImageClick);
  return cardElement.createCard();
}

// закрытие модальных окон
const closePopup = popup => {
  popup.classList.remove('popup_is-open');
  document.removeEventListener('keydown', handleEscEvent);
}

// обработчик кликов по оверлею и по кнопке закрытия попапа

popupList.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    const targetClassList = evt.target.classList;
    if(targetClassList.contains('popup') || targetClassList.contains('button_type_close')) closePopup(popup);
  })
});

// обработчик клика по клавише 'Escape'
const handleEscEvent = evt => {
  if (evt.key === 'Escape') closePopup(page.querySelector('.popup_is-open'));
}

// открытие модальных окон
const openPopup = popup => {
  document.addEventListener('keydown', handleEscEvent);
  popup.classList.add('popup_is-open');
};

// -= Обработчики событий =-

const handleEditProfileButton = () => {
  const form = new FormValidator(configValidation, formEditProifle);
  form.resetFormErrors();
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupEditProfile);
}

const handleEditProfileSubmit = () => {
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupEditProfile);
  formEditProfile.reset();
}

const handleAddCardButton = () => openPopup(popupAddCard);

const handleAddCardSubmit = () => {
  const dataObject = {
    name: inputCardName.value,
    link: inputCardLink.value,
  };
  addCardPrepend(makeNewCard(dataObject, configCard, '#card-template', handleImageClick));
  closePopup(popupAddCard);
  formAddCard.reset();
}

const handleImageClick = (image, caption) => {
  bigPicImage.src = image;
  bigPicImage.alt = caption;
  bigPicCaption.textContent = caption;

  openPopup(popupBigPic);
}

// -= Слушатели событий =-

buttonEditProfile.addEventListener('click', handleEditProfileButton);
formEditProfile.addEventListener('submit', handleEditProfileSubmit);
buttonAddCard.addEventListener('click', handleAddCardButton);
formAddCard.addEventListener('submit', handleAddCardSubmit);

// обход массива initialCards для первоначальной загрузки страницы

initialCards.forEach(dataObject => {
  addCardAppend(makeNewCard(dataObject, configCard, '#card-template', handleImageClick));
});

// обход коллекции formsList с внедрением валидации FormValidator.js в каждую форму

formsList.forEach(item => {
  const form = new FormValidator(configValidation, item);
  form.enableValidation();
})
