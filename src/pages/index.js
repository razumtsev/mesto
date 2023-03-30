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
  inputName,
  inputDescription,
} from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

/* -= Инстанцирование классов =- */

const makeCard = item => {
  const card = new Card(item, configCard, '#card-template', handleImageClick);
  return card.createCard();
}

const info = new UserInfo({
  userName: profileName,
  userInfo: profileDescription,
});

const profileEditPopup = new PopupWithForm({
  handleFormSubmit: (obj) => {
    info.setUserInfo({
      name: obj['profile-name'],
      info: obj['profile-description'],
    });
    profileEditPopup.close();
  }
},'.popup_type_edit-profile');
profileEditPopup.setEventListeners();

const cardAddPopup = new PopupWithForm({
  handleFormSubmit: (obj) => {
    const item = {
      name: obj['card-name'],
      link: obj['card-link'],
    };
    const cardElement = makeCard(item);
    cardList.addItemsPrepend(cardElement);
    cardAddPopup.close();
  }
},'.popup_type_add-card');
cardAddPopup.setEventListeners();

const bigPicPopup = new PopupWithImage('.popup_type_big-pic');
bigPicPopup.setEventListeners();

/* -= Подключение валидации форм =- */

formsList.forEach(item => {
  const form = new FormValidator(configValidation, item);
  form.enableValidation();
});

/* -= Обработчики событий =- */

const handleEditProfileButtonClick = () => {
  const thisUserInfo = info.getUserInfo();
  inputName.value = thisUserInfo.name;
  inputDescription.value = thisUserInfo.info;
  profileEditPopup.open();
}
const handleAddCardButtonClick = () => cardAddPopup.open();

const handleImageClick = data => bigPicPopup.open(data);

/* -= Слушатели событий =- */

buttonEditProfile.addEventListener('click', handleEditProfileButtonClick);
buttonAddCard.addEventListener('click', handleAddCardButtonClick);

/* -= Первичное заполнение страницы карточками =- */

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = makeCard(item);
    cardList.addItemsAppend(cardElement);
  }
}, '.elements__grid');

cardList.renderItems();
