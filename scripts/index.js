import { Card } from './Card.js'
import { initialCards } from './initial-cards.js';

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
// глобальная переменная - список кнопок закрытия модальных окон
const buttonClosePopupList = page.querySelectorAll('.button_type_close');
// глобальная переменная - место для монтажа карточек
const elementsGrid = page.querySelector('.elements__grid');

// -= Добавление карточки на страницу =-

const addCardPrepend = card => elementsGrid.prepend(card);
const addCardAppend = card => elementsGrid.append(card);

// закрытие модальных окон
const closePopup = popup => {
  popup.classList.remove('popup_is-open');
  popup.removeEventListener('mousedown', handleOverlayClick);
  document.removeEventListener('keydown', handleEscEvent);
}

// обработчик клика по кнопке закрытия
buttonClosePopupList.forEach(button => {
  button.addEventListener('click', () => closePopup(button.closest('.popup')));
});

// обработчик клика по оверлею модального окна
const handleOverlayClick = evt => {
  if (evt.target.classList.contains('popup')) closePopup(evt.target);
}

// обработчик клика по клавише 'Escape'
const handleEscEvent = evt => {
  if (evt.key === 'Escape') closePopup(page.querySelector('.popup_is-open'));
}

// открытие модальных окон
const openPopup = popup => {
  popup.addEventListener('mousedown', handleOverlayClick);
  document.addEventListener('keydown', handleEscEvent);
  popup.classList.add('popup_is-open');
};

// -= Обработчики событий =-

const handleEditProfileButton = () => {
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

const handleAddCardButton = () => {
  openPopup(popupAddCard)
}

const handleAddCardSubmit = () => {
  const dataObject = {
    name: inputCardName.value,
    link: inputCardLink.value,
  };
  const card = new Card(dataObject, '#card-template');
  addCardPrepend(card.createCard());
  closePopup(popupAddCard);
  formAddCard.reset();
}

// -= Слушатели событий =-

buttonEditProfile.addEventListener('click', handleEditProfileButton);
formEditProfile.addEventListener('submit', handleEditProfileSubmit);
buttonAddCard.addEventListener('click', handleAddCardButton);
formAddCard.addEventListener('submit', handleAddCardSubmit);

initialCards.forEach(dataObject => {
  const card = new Card(dataObject, '#card-template');
  addCardAppend(card.createCard());
});

export { openPopup }
