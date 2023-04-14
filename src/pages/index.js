import './index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import { initialCards } from '../utils/initial-cards.js';
import {
  profileAvatar,
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
import PopupWithConfirm from '../components/PopupWithConfirm';

const cardTemplate = '#card-template';
let cardList = null;
let userID = null;

/* -= Инстанцирование классов =- */

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '67643684-28d3-4968-8243-9bcc86cf5636',
    'Content-Type': 'application/json'
  }
});

const makeCard = data => {
  const card = new Card({
    data,
    configCard,
    cardTemplate,
    handleImageClick,
    handleRemoveButtonClick,
    userID,
  });
  return card.createCard();
}

const userInfo = new UserInfo({
  userName: profileName,
  userInfo: profileDescription,
  userAvatar: profileAvatar,
});

const profileEditPopup = new PopupWithForm({
  handleFormSubmit: (obj) => {
    api.setProfileInfo({
      name: obj['profile-name'],
      about: obj['profile-description'],
    })
    .then(profileInfo => {
      userInfo.setUserInfo(profileInfo);
    });
    profileEditPopup.close();
  }
}, '.popup_type_edit-profile');
profileEditPopup.setEventListeners();

const cardAddPopup = new PopupWithForm({
  handleFormSubmit: (obj) => {
    const item = {
      name: obj['card-name'],
      link: obj['card-link'],
    };
    api.setNewCard(item)
      .then(data => {
        const cardElement = makeCard(data);
        cardList.addItemsPrepend(cardElement);
      });
    cardAddPopup.close();
  }
}, '.popup_type_add-card');
cardAddPopup.setEventListeners();

const removeCardConfirm = new PopupWithConfirm('.popup_type_remove-card');
removeCardConfirm.setEventListeners();

const bigPicPopup = new PopupWithImage('.popup_type_big-pic');
bigPicPopup.setEventListeners();

/* -= Подключение валидации форм =- */

formsList.forEach(item => {
  const form = new FormValidator(configValidation, item);
  form.enableValidation();
});

/* -= Обработчики событий =- */

const handleEditProfileButtonClick = () => {
  const thisUserInfo = userInfo.getUserInfo();
  inputName.value = thisUserInfo.name;
  inputDescription.value = thisUserInfo.info;
  profileEditPopup.open();
}
const handleAddCardButtonClick = () => cardAddPopup.open();

const handleRemoveButtonClick = card => {
  removeCardConfirm.open();
  removeCardConfirm.setSubmitAction(() => {
    api.removeCard(card).then(() => {
      removeCardConfirm.close();
      card.removeCard();
    })
    .catch(err => console.log(err));
  });
}

const handleImageClick = data => bigPicPopup.open(data);

/* -= Слушатели событий =- */

buttonEditProfile.addEventListener('click', handleEditProfileButtonClick);
buttonAddCard.addEventListener('click', handleAddCardButtonClick);

/* -= Первичное заполнение страницы карточками =- */

const renderInitialCards = cards => {
  cardList = new Section({
    items: cards,
    renderer: (item) => {
      const cardElement = makeCard(item);
      cardList.addItemsAppend(cardElement);
    }
  }, '.elements__grid');
  cardList.renderItems();
}

/* -= Запросы к серверу =- */

Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([profile, cards]) => {
    userID = profile._id;
    userInfo.setUserInfo(profile);
    userInfo.setUserAvatar(profile);
    renderInitialCards(cards);
  })
  .catch(err => console.log(err));

