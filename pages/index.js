import { Card } from '../components/Card.js';
import { initialCards } from '../utils/initial-cards.js';
import { FormValidator } from '../components/FormValidator.js';

import {
  page,
  profileName,
  profileDescription,
  buttonEditProfile,
  popupEditProfile,
  formEditProfile,
  inputName,
  inputDescription,
  buttonAddCard,
  popupAddCard,
  formAddCard,
  inputCardName,
  inputCardLink,
  popupBigPic,
  bigPicImage,
  bigPicCaption,
  elementsGrid,
  formsList,
  formEditProifle,
  popupList,
  configCard,
  configValidation,
} from '../utils/constants.js';

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
