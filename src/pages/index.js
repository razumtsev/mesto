import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import { initialCards } from '../utils/initial-cards.js';
import {
  profileName,
  profileDescription,
  buttonEditProfile,
  buttonAddCard,
  formsList,
  configCard,
  configValidation,
} from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

/* -= Экземпляры наследников класса Popup =- */

const editProfilePopup = new PopupWithForm({
  handleFormSubmit: (obj) => {
    const newUserInfo = new UserInfo({
      name: obj['profile-name'],
      description: obj['profile-description'],
    });
    newUserInfo.setUserInfo();
    editProfilePopup.close();
  }
},'.popup_type_edit-profile');
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm({
  handleFormSubmit: (obj) => {
    const item = {
      name: obj['card-name'],
      link: obj['card-link'],
    };
    const card = new Card(item, configCard, '#card-template', handleImageClick);
    const cardElement = card.createCard();
    cardList.addItemsPrepend(cardElement);
    addCardPopup.close();
  }
},'.popup_type_add-card');
addCardPopup.setEventListeners();

/* -= Обработчики событий =- */

const handleEditProfileButtonClick = () => {
  const newUserInfo = new UserInfo({
    name: profileName.textContent,
    description: profileDescription.textContent,
  });
  newUserInfo.getUserInfo();
  const editProfileForm = new FormValidator(configValidation, document.forms['edit-profile']);
  editProfileForm.resetFormErrors();
  editProfilePopup.open();
}
const handleAddCardButtonClick = () => addCardPopup.open();

const handleImageClick = (image, caption) => {
  const bigPic = new PopupWithImage({image, caption}, '.popup_type_big-pic');
  bigPic.setEventListeners();
  bigPic.open();
}

/* -= Слушатели событий =- */

buttonEditProfile.addEventListener('click', handleEditProfileButtonClick);
buttonAddCard.addEventListener('click', handleAddCardButtonClick);

/* -= Подключение валидатора форм =- */

formsList.forEach(item => {
  const form = new FormValidator(configValidation, item);
  form.enableValidation();
});

/* -= Первичное заполнение страницы карточками =- */

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, configCard, '#card-template', handleImageClick);
    const cardElement = card.createCard();
    cardList.addItemsAppend(cardElement);
  }
}, '.elements__grid');

cardList.renderItems();
